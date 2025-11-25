variable "region" {
  description = "AWS region"
  default     = "ap-southeast-1"
}

variable "aws_profile" {
  description = "AWS CLI profile to use"
}

variable "project" {
  description = "Project name"
  default = "my-wallet"
}