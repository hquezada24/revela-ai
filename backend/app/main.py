# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from app.db.database import engine
from app.api.v1.endpoints import auth, users, portraits, jobs, uploads

app = FastAPI(title="Revela AI API")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Required for cookies to be forwarded
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(portraits.router, prefix="/api/v1/portraits", tags=["portraits"])
app.include_router(jobs.router, prefix="/api/v1/jobs", tags=["jobs"])
app.include_router(uploads.router, prefix="/api/v1/uploads/presign", tags=["uploads"])

# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------

# Creates all tables if they don't exist (useful in development).
# In production, use Alembic for migrations.
SQLModel.metadata.create_all(engine)