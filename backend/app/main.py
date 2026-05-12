from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactCreate, SuccessResponse

settings = get_settings()

app = FastAPI(
    title="Ramsha Jawaid Portfolio API",
    description="Contact form API backed by Neon PostgreSQL.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/contact", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)) -> SuccessResponse:
    contact = ContactMessage(**payload.model_dump())
    try:
        db.add(contact)
        db.commit()
        db.refresh(contact)
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save contact message. Please try again later.",
        ) from exc

    return SuccessResponse(message="Message received successfully.", data=contact)




# • Backend is running on port 8000.

#   URL: http://localhost:8000
#   Health check: http://localhost:8000/health


# › how to run the backend in new terminal


# • Run these from the project root:

#  cd backend
#  .venv\Scripts\activate
#  pip install -r requirements.txt
#  alembic upgrade head
#  uvicorn app.main:app --reload --port 8000