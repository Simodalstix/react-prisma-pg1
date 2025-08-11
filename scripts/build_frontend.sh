#!/bin/bash
set -e

echo "--- Frontend Build Script ---"

# Navigate to the frontend directory
echo "Changing to frontend directory..."
cd frontend

# Install dependencies using npm ci for clean installs
echo "Installing dependencies with npm ci..."
npm ci

# Build the React application
echo "Building the frontend application..."
npm run build

echo "Frontend build complete. Output is in frontend/dist"
echo "--------------------------"

exit 0