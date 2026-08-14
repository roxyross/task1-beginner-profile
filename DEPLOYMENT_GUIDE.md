# Deployment Guide: Backend to Hugging Face + Frontend on Vercel

## Overview
This guide will help you deploy your FastAPI backend to Hugging Face Spaces and connect it with your Vercel frontend.

## Prerequisites
- Hugging Face account (sign up at https://huggingface.co)
- Git installed on your system
- Your frontend already deployed on Vercel ✅

---

## Part 1: Deploy Backend to Hugging Face Spaces

### Option A: Using the Automated Script (Recommended)

1. **Open Git Bash** in the backend folder:
   ```bash
   cd backend
   bash deploy-to-huggingface.sh
   ```

2. **Follow the prompts**:
   - Enter your Hugging Face username
   - Enter a space name (e.g., `portfolio-backend-api`)
   - Confirm the URLs
   - Enter your Hugging Face credentials when prompted

### Option B: Manual Deployment

1. **Create a new Space on Hugging Face**:
   - Go to https://huggingface.co/spaces
   - Click "Create new Space"
   - Name: `portfolio-backend-api` (or your choice)
   - SDK: Select **Docker**
   - Visibility: Choose Public or Private
   - Click "Create Space"

2. **Push your backend code**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit: Portfolio Backend API"
   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   git push hf main
   ```

3. **Configure Environment Variables**:
   - Go to your Space settings: `https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME/settings`
   - Click on "Variables and secrets"
   - Add these secrets:
     - **Name**: `DATABASE_URL`
       **Value**: Use your private database connection string from your provider. Never commit it to this repository.
     
     - **Name**: `FRONTEND_ORIGIN`
       **Value**: `https://task1-beginner-profile-frontend-aedxqfb1e-roxyross-projects.vercel.app`

4. **Wait for Build**:
   - The Space will automatically build using the Dockerfile
   - Check the "Logs" tab to monitor progress
   - Build typically takes 2-5 minutes

5. **Verify Deployment**:
   - Once built, your API will be at: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`
   - Test the health endpoint: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/health`
   - You should see: `{"status": "ok"}`

---

## Part 2: Connect Frontend to Backend

### Update Vercel Environment Variable

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Select your project: `task1-beginner-profile-frontend`

2. **Update Environment Variable**:
   - Go to Settings → Environment Variables
   - Find `NEXT_PUBLIC_API_BASE_URL`
   - Update the value to: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`
   - Select all environments (Production, Preview, Development)
   - Click "Save"

3. **Redeploy Frontend**:
   - Go to Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"
   - Wait for deployment to complete

### Alternative: Using Vercel CLI

If you have Vercel CLI installed:

```bash
cd frontend
vercel env add NEXT_PUBLIC_API_BASE_URL production
# Paste your Hugging Face Space URL when prompted
vercel --prod
```

---

## Part 3: Testing the Connection

1. **Visit your frontend**: `https://task1-beginner-profile-frontend-aedxqfb1e-roxyross-projects.vercel.app`

2. **Test the contact form**:
   - Fill out the contact form
   - Submit it
   - Check if you get a success message

3. **Verify in database** (optional):
   - Check your Neon PostgreSQL dashboard
   - Look for new entries in the `contact_messages` table

---

## Troubleshooting

### Backend Issues

**Problem**: Space build fails
- Check the Logs tab in Hugging Face Space
- Verify all files are pushed correctly
- Ensure Dockerfile syntax is correct

**Problem**: Database connection fails
- Verify `DATABASE_URL` environment variable is set correctly
- Check Neon database is active and accessible
- Ensure connection string includes `sslmode=require`

**Problem**: CORS errors
- Verify `FRONTEND_ORIGIN` matches your exact Vercel URL
- Check for trailing slashes (should not have one)
- Restart the Space after updating environment variables

### Frontend Issues

**Problem**: API calls fail with 404
- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly in Vercel
- Ensure you redeployed after updating the environment variable
- Check the browser console for the actual URL being called

**Problem**: CORS errors in browser
- Backend `FRONTEND_ORIGIN` must match your Vercel URL exactly
- Update backend environment variable if frontend URL changed
- Restart Hugging Face Space after updating

---

## URLs Reference

After deployment, save these URLs:

- **Frontend**: `https://task1-beginner-profile-frontend-aedxqfb1e-roxyross-projects.vercel.app`
- **Backend**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space`
- **Backend Health**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/health`
- **Backend Contact**: `https://YOUR_USERNAME-YOUR_SPACE_NAME.hf.space/contact`
- **Database**: Neon PostgreSQL (already configured)

---

## Security Notes

⚠️ **Important**: The deployment script and this guide contain your database credentials. After deployment:
1. Consider rotating your database password
2. Delete or secure this guide if sharing the repository
3. Never commit `.env` files to public repositories

---

## Need Help?

- Hugging Face Spaces Docs: https://huggingface.co/docs/hub/spaces
- Vercel Docs: https://vercel.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com/

Good luck with your deployment! 🚀
