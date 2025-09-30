# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies required for building Python packages.
RUN apt-get update \
    && apt-get install --no-install-recommends -y build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files separately to leverage Docker layer caching.
COPY requirements.txt ./
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# Copy the remainder of the application source.
COPY . .

# Create a non-root user for running the service.
RUN useradd -m selfix && chown -R selfix:selfix /app
USER selfix

EXPOSE 8000

# Use gunicorn/uvicorn to serve the FastAPI application.
CMD ["uvicorn", "main_api:app", "--host", "0.0.0.0", "--port", "8000"]
