#!/bin/bash

# Deployment script for Hugging Face Spaces
# This script helps deploy the backend to Hugging Face Spaces

echo "🚀 Hugging Face Spaces Deployment Script"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "📝 Please provide the following information:"
echo ""
read -p "Enter your Hugging Face username: " HF_USERNAME
read -p "Enter your Space name (e.g., portfolio-backend-api): " SPACE_NAME

echo ""
echo "🔗 Your Space URL will be: https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME"
echo "🌐 Your API URL will be: https://$HF_USERNAME-$SPACE_NAME.hf.space"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo ""
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Portfolio Backend API"
else
    echo ""
    echo "📦 Git repository already initialized."
    echo "📝 Staging all changes..."
    git add .

    # Check if there are changes to commit
    if git diff-index --quiet HEAD --; then
        echo "✅ No changes to commit."
    else
        git commit -m "Update backend for Hugging Face deployment"
    fi
fi

# Add Hugging Face remote
echo ""
echo "🔗 Adding Hugging Face remote..."
HF_REMOTE="https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME"

# Remove existing hf remote if it exists
git remote remove hf 2>/dev/null

git remote add hf "$HF_REMOTE"

echo ""
echo "📤 Pushing to Hugging Face Spaces..."
echo "⚠️  You will be prompted for your Hugging Face credentials."
echo ""

# Push to Hugging Face
git push hf main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME/settings"
    echo "2. Add these environment variables:"
    echo "   - DATABASE_URL: postgresql://neondb_owner:npg_fd8DKBogF7AU@ep-withered-tree-ap63bgnn-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    echo "   - FRONTEND_ORIGIN: https://task1-beginner-profile-frontend-aedxqfb1e-roxyross-projects.vercel.app"
    echo ""
    echo "3. Wait for the Space to build (check the logs)"
    echo "4. Your API will be available at: https://$HF_USERNAME-$SPACE_NAME.hf.space"
    echo ""
    echo "5. Update your Vercel frontend environment variable:"
    echo "   NEXT_PUBLIC_API_BASE_URL=https://$HF_USERNAME-$SPACE_NAME.hf.space"
    echo ""
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
