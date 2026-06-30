from fastapi import APIRouter, status
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from sqlmodel import Session
from app.schemas.user import UserCreate
from app.schemas.token import Token
from app.db.database import get_session
from app.services.user_service import create_user
from app.services.auth_service import login_for_access_token_service

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_session)]

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(db: db_dependency, user_data: UserCreate):
    return await create_user(db, user_data)

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
):
    return await login_for_access_token_service(db, form_data)
