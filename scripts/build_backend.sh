#!/bin/bash
set -e

echo "--- Backend Build Script ---"

# Check for required environment variables
if [ -z "$IMAGE_TAG" ]; then
  echo "Error: IMAGE_TAG environment variable is not set."
  exit 1
fi

# ECR related checks
if [ "$USE_ECR" = "true" ]; then
  if [ -z "$ECR_REPO_URL" ]; then
    echo "Error: USE_ECR is true but ECR_REPO_URL is not set."
    exit 1
  fi
  echo "ECR mode is enabled."
  FULL_IMAGE_NAME="${ECR_REPO_URL}:${IMAGE_TAG}"
else
  echo "ECR mode is disabled. Building image locally."
  FULL_IMAGE_NAME="portfolio-backend:${IMAGE_TAG}"
fi

echo "Image will be tagged as: $FULL_IMAGE_NAME"

# Navigate to the backend directory
echo "Changing to backend directory..."
cd backend

# Build the Docker image
if [ "$USE_ECR" = "true" ]; then
  echo "Building and pushing Docker image to ECR for linux/arm64/v8..."
  docker buildx build --platform linux/arm64/v8 -t "$FULL_IMAGE_NAME" --push .
else
  echo "Building Docker image locally..."
  docker build -t "$FULL_IMAGE_NAME" .
fi

echo "Backend build complete."
echo "--------------------------"

exit 0