FROM public.ecr.aws/docker/library/python:3.13-rc-slim

# Install Tesseract
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    && apt-get clean

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /var/task

COPY src/requirements.txt .
RUN python -m pip install -r requirements.txt

COPY src/ .

CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
