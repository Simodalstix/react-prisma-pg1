#!/bin/bash
set -e

echo "--- Smoke Test Script ---"

# Environment variable checks
: "${CLOUDFRONT_DOMAIN:?Error: CLOUDFRONT_DOMAIN is not set.}"
: "${PI_HOST:?Error: PI_HOST is not set.}"
: "${BACKEND_PORT:=3001}" # Default to 3001 if not set

# --- Test Functions ---

# Function to test a URL and check for a 200 status code
test_url() {
  local url=$1
  local service_name=$2
  local attempts=3
  local timeout=10
  local attempt=1

  echo "Testing $service_name endpoint: $url"

  while [ $attempt -le $attempts ]; do
    echo "Attempt $attempt of $attempts..."
    local status_code
    status_code=$(curl -o /dev/null -s -w "%{http_code}" --max-time $timeout "$url")

    if [ "$status_code" -eq 200 ]; then
      echo "SUCCESS: $service_name is up. Received status 200."
      return 0
    else
      echo "FAILURE: $service_name returned status $status_code. Retrying in 5 seconds..."
      sleep 5
    fi
    attempt=$((attempt + 1))
  done

  echo "ERROR: $service_name did not return a 200 status after $attempts attempts."
  return 1
}

# --- Main Execution ---

# Test CloudFront URL
CLOUDFRONT_URL="https://${CLOUDFRONT_DOMAIN}"
if ! test_url "$CLOUDFRONT_URL" "CloudFront"; then
  exit 1
fi

# Test Backend Health Endpoint
BACKEND_URL="http://${PI_HOST}:${BACKEND_PORT}/api/health"
if ! test_url "$BACKEND_URL" "Backend Health"; then
  exit 1
fi

echo "--------------------------"
echo "All smoke tests passed successfully!"
exit 0