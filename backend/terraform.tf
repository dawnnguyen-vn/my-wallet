terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  required_version = ">= 1.2"
}

provider "aws" {
  region  = var.region
  profile = var.aws_profile
}

# ---------------------------
# 1. API Gateway REST API
# ---------------------------
resource "aws_api_gateway_rest_api" "api_gateway" {
  name               = "${var.project}-api-gateway"
  description        = "Proxy all requests to Flask Lambda"
  binary_media_types = ["*/*"]
}


# -------- /{proxy+} METHOD + INTEGRATION --------
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy_any" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"

  request_parameters = {
    "method.request.path.proxy" = true
  }
}

resource "aws_api_gateway_integration" "proxy_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.proxy_any.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

resource "aws_lambda_permission" "api_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*"
}

# Deploy API Gateway
resource "aws_api_gateway_deployment" "api_gateway_deploy" {
  depends_on = [
    aws_api_gateway_integration.proxy_integration,
  ]
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.api_gateway.body))
  }

  lifecycle {
    create_before_destroy = true
  }

  rest_api_id = aws_api_gateway_rest_api.api_gateway.id

}

resource "aws_api_gateway_stage" "api_gateway_stage" {
  deployment_id = aws_api_gateway_deployment.api_gateway_deploy.id
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  stage_name    = "prod"
}

# ---------------------------
# 2. Lambda Function
# ---------------------------
resource "aws_lambda_function" "lambda" {
  function_name = "${var.project}-lambda"
  role          = aws_iam_role.lambda_role.arn
  package_type  = "Image"
  timeout       = 30
  memory_size   = 512
  image_uri     = "${aws_ecr_repository.ecr_repo.repository_url}:latest"
  environment {
    variables = {
      FLASK_ENV = "production"
    }
  }
}

resource "aws_ecr_repository" "ecr_repo" {
  name                 = "my-wallet-lambda-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "${var.project}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}


resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
}

resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name = "${var.project}-lambda-dynamodb-policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          aws_dynamodb_table.order_table.arn
        ]
      }
    ]
  })
}


# ---------------------------
# 3. Dynamo DB
# ---------------------------
resource "aws_dynamodb_table" "order_table" {
  name         = "${var.project}-order"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "order_id"
  range_key = "trade_date"

  attribute {
    name = "order_id"
    type = "S"
  }

  attribute {
    name = "trade_date"
    type = "S"
  }
}


resource "null_resource" "docker_build_push" {
  triggers = {
    always_run = timestamp() # always rebuild on `terraform apply`
  }

  # 1. Build + Push Image
  provisioner "local-exec" {
    command = <<EOT
aws ecr get-login-password --region ${var.region} --profile ${var.aws_profile} \
  | docker login --username AWS --password-stdin ${aws_ecr_repository.ecr_repo.repository_url}

docker build -t my-wallet-lambda .
docker tag my-wallet-lambda:latest ${aws_ecr_repository.ecr_repo.repository_url}:latest
docker push ${aws_ecr_repository.ecr_repo.repository_url}:latest
EOT
  }

  # 2. Update Lambda to use the latest image digest
  provisioner "local-exec" {
    command = <<EOT
aws lambda update-function-code \
  --region ${var.region} \
  --profile ${var.aws_profile} \
  --function-name ${aws_lambda_function.lambda.function_name} \
  --image-uri ${aws_ecr_repository.ecr_repo.repository_url}:latest
EOT
  }

  depends_on = [
    aws_ecr_repository.ecr_repo,
    aws_lambda_function.lambda
  ]
}


