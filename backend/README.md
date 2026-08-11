---
title: Portfolio Backend API
emoji: 🚀
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Ramsha Jawaid Portfolio Backend API

FastAPI backend for portfolio contact form with PostgreSQL database.

## Features

- Contact form submission endpoint
- PostgreSQL database integration (Neon)
- CORS configuration for frontend
- Health check endpoint

## Environment Variables

Configure these in Hugging Face Spaces settings:

- `DATABASE_URL`: PostgreSQL connection string
- `FRONTEND_ORIGIN`: Your Vercel frontend URL

## Endpoints

- `GET /health` - Health check
- `POST /contact` - Submit contact form
