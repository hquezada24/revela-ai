# app/api/v1/endpoints/auth.py

from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlmodel import Session

from app.core.security import create_access_token, COOKIE_NAME
from app.db.database import get_session
from app.schemas.user import UserCreate, UserAuthentication
from app.services.user_service import (
    authenticate_user,
    create_user,
)
from app.schemas.user import CurrentUser, DeleteAccountRequest
from app.core.auth import get_current_user

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_session)]
user_dependency = Annotated[CurrentUser, Depends(get_current_user)]

ACCESS_TOKEN_EXPIRE_MINUTES = 30


def _set_auth_cookie(response: Response, token: str) -> None:
    """Attach the JWT as an HttpOnly, Secure, SameSite=lax cookie."""
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,   # Set to True in production (HTTPS only)
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


# ---------------------------------------------------------------------------
# POST /auth/register
# ---------------------------------------------------------------------------
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(response: Response, db: db_dependency, user_data: UserCreate):
    user = create_user(db, user_data)
    token = create_access_token(user.email, user.id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    _set_auth_cookie(response, token)
    return {"message": "Account created successfully."}


# ---------------------------------------------------------------------------
# POST /auth/login
# ---------------------------------------------------------------------------
@router.post("/login", status_code=status.HTTP_200_OK)
async def login(response: Response, db: db_dependency, user_data: UserAuthentication):
    user = authenticate_user(db, user_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )
    token = create_access_token(user.email, user.id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    _set_auth_cookie(response, token)
    return {"message": "Logged in successfully."}


# ---------------------------------------------------------------------------
# POST /auth/logout
# ---------------------------------------------------------------------------
@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME, httponly=True, samesite="lax")
    return {"message": "Logged out successfully."}

