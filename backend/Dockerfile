FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Increase pip timeout for slow networks
ENV PIP_DEFAULT_TIMEOUT=1200
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Use a faster mirror if PyPI is slow (uncomment if needed)
ENV PIP_INDEX_URL=https://mirrors.huaweicloud.com/repository/pypi/simple
ENV PIP_TRUSTED_HOST=mirrors.huaweicloud.com

# Install system dependencies for psycopg
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]