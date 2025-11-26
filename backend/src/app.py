import re
from flask import Flask, request, jsonify
from utils import parse_number, to_decimal
import pytesseract
from PIL import Image
import io
import boto3

app = Flask(__name__)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('my-wallet-order')


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"text": "release upload order"})


@app.route("/upload-order", methods=["POST"])
def dca_bill():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image_file = request.files["file"]
    img_bytes = image_file.read()

    img = Image.open(io.BytesIO(img_bytes))

    # Pre-process (optional)
    img = img.convert("L")  # grayscale

    text = pytesseract.image_to_string(img, lang="eng", config="--psm 6")
    order = extract_order_fields(text)
    item = dict_to_dynamo_item(order)
    try:
        table.put_item(Item=item)
        return jsonify({
            "status": "success",
            "data": item
        }), 200
    except Exception as e:
        return jsonify({
            "status": "fail",
            "error": str(e)
        }), 400


def extract_order_fields(text):

    clean = " ".join(text.split())

    order = {}

    # Order ID
    m = re.search(r"Order No\.\s*(\d+)", clean)
    order["order_id"] = m.group(1) if m else None

    # Type (Limit / Buy)
    m = re.search(r"(Limit\s*\/\s*(Buy|Sell))", clean)
    order["order_type"] = m.group(2).upper() if m else None

    # Symbol
    m = re.search(r"(BTC\/USDT|ETH\/USDT|BNB\/USDT|[\w]+\/[\w]+)", clean)
    order["symbol"] = m.group(1) if m else None

    # Total
    m = re.search(r"Total\s*([\d\.,]+)\s*USDT", clean)
    order["total"] = parse_number(m.group(1)) if m else None

    # Trade date
    m = re.search(r"Date\s*(\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}:\d{2})", clean)
    order["trade_date"] = m.group(1).replace(" ", "T") if m else None

    # Trade price
    m = re.search(r"Price\s*([\d\.,]+)", clean)
    order["trade_price"] = parse_number(m.group(1)) if m else None

    # Trade amount
    m = re.search(r"Amount\s*([\d\.,]+)", clean)
    order["trade_amount"] = parse_number(m.group(1)) if m else None

    # Trade fee
    m = re.search(r"Fee\s*([\d\.,]+)\s*(BTC|USDT)", clean)
    if m:
        order["trade_fee"] = parse_number(m.group(1))
        order["trade_fee_coin"] = m.group(2)

    return order

def dict_to_dynamo_item(order: dict):
    return {
    "order_id": order["order_id"],
    "trade_date": order["trade_date"],

    "order_type": order["order_type"],
    "symbol": order["symbol"],

    "total": to_decimal(order["total"]),
    "trade_amount": to_decimal(order["trade_amount"]),
    "trade_fee": to_decimal(order["trade_fee"]),
    "trade_fee_coin": order["trade_fee_coin"],
    "trade_price": to_decimal(order["trade_price"])
}