#!/bin/bash

echo "=== LocalStack Init Script: Creating DynamoDB table 'order' ==="

awslocal dynamodb create-table \
  --table-name my-wallet-order \
  --attribute-definitions \
      AttributeName=order_id,AttributeType=S \
      AttributeName=trade_date,AttributeType=S \
  --key-schema \
      AttributeName=order_id,KeyType=HASH \
      AttributeName=trade_date,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

echo "=== DynamoDB table 'order' created successfully ==="
