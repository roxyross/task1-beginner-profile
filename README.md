# Ramsha Jawaid Cyberpunk Portfolio

Futuristic personal portfolio for Ramsha Jawaid with a Next.js frontend and a FastAPI backend that stores contact form submissions in Neon PostgreSQL.

## Folder Structure

```text
task1-beginner-profile/
├─ frontend/
│  ├─ app/
│  │  ├─ components/
│  │  │  └─ portfolio-experience.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ public/
│  ├─ .env.example
│  ├─ package.json
│  └─ next.config.ts
├─ backend/
│  ├─ app/
│  │  ├─ config.py
│  │  ├─ database.py
│  │  ├─ main.py
│  │  ├─ models.py
│  │  └─ schemas.py
│  ├─ alembic/
│  │  ├─ versions/
│  │  │  └─ 20260512_0001_create_contact_messages.py
│  │  └─ env.py
│  ├─ .env.example
│  ├─ alembic.ini
│  └─ requirements.txt
└─ README.md
```

## Features

- Dark cosmic cyberpunk interface with animated particle background and central glowing sphere.
- Theme switcher for Cyberpunk, Volcanic, and Emerald palettes.
- Glassmorphic cards, neon hover states, Framer Motion entrance animations, and terminal typing hero.
- Fully responsive sections for Hero, About, Skills, Experience, Projects, Education, and Contact.
- `POST /contact` FastAPI endpoint with Pydantic validation, SQLAlchemy persistence, CORS, and error handling.

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Environment:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Update `backend/.env` with your Neon connection string:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require
FRONTEND_ORIGIN=http://localhost:3000
```

Run migrations and start the API:

```bash
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Health check: `http://localhost:8000/health`

Contact endpoint:

```http
POST /contact
Content-Type: application/json

{
  "name": "Client Name",
  "email": "client@example.com",
  "subject": "Project inquiry",
  "message": "I would like to discuss a portfolio project."
}
```

## Neon Setup

1. Create a Neon project at `https://console.neon.tech`.
2. Create or select a database.
3. Copy the pooled or direct PostgreSQL connection string.
4. Use the SQLAlchemy-compatible prefix `postgresql+psycopg://`.
5. Keep `sslmode=require` in the URL.
6. Paste it into `backend/.env` as `DATABASE_URL`.
7. Run `alembic upgrade head` from `backend/`.

## Deployment Guide

Frontend on Vercel:

1. Set the project root to `frontend`.
2. Add `NEXT_PUBLIC_API_BASE_URL` pointing to the deployed FastAPI URL.
3. Deploy with the default Next.js build command `npm run build`.

Backend on Render, Railway, Fly.io, or similar:

1. Set the service root to `backend`.
2. Install command: `pip install -r requirements.txt`.
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
4. Add `DATABASE_URL` and `FRONTEND_ORIGIN` environment variables.
5. Run `alembic upgrade head` during release or from the provider shell.

For production CORS, set `FRONTEND_ORIGIN` to the exact deployed frontend origin.
