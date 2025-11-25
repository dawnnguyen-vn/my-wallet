from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"text": "OK"})

@app.route("/upload-order", methods=["POST"])
def dca_bill():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    image_file = request.files["file"]
    img_bytes = image_file.read()

    img = Image.open(io.BytesIO(img_bytes))

    # Pre-process (optional)
    img = img.convert("L")  # grayscale

    text = pytesseract.image_to_string(img, lang="eng")

    return jsonify({"text": text})