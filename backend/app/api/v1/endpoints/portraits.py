from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Annotated
from app.db.database import get_session
from app.schemas.generation_jobs import JobCreate, JobRead
from app.schemas.user import CurrentUser
from app.services.portrait_service import create_portrait
from app.core.auth import get_current_user

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_session)]
user_dependency = Annotated[CurrentUser, Depends(get_current_user)]

@router.post("/", response_model=JobRead, status_code=201)
def create_portrait_endpoint(
    data: JobCreate,
    db: db_dependency,
    current_user: user_dependency,
):
    return create_portrait(db, current_user.id, data)