from fastapi import status, HTTPException
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from sqlmodel import Session
from app.services.user_service import authenticate_user
from app.core.security import create_access_token
from datetime import timedelta

async def login_for_access_token_service(
    db: Session,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas.",
        )

    token = create_access_token(user.email, user.id, timedelta(minutes=30))
    return {"access_token": token, "token_type": "bearer"}