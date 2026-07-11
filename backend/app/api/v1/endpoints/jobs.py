from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Annotated
from app.db.database import get_session
from app.schemas.generation_jobs import JobRead
from app.models.generation_jobs import Job

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_session)]

@router.get("/{job_id}", response_model=JobRead, status_code=200)
def create_portrait_endpoint(
    job_id: int,
    db: db_dependency,
):
    job = db.get(Job, job_id)
    return job