# app/core/auth.py

from datetime import timedelta, datetime, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel, EmailStr
from pwdlib import PasswordHash
from sqlmodel import Session, select
from starlette import status
import os
from dotenv import load_dotenv

from app.db.database import get_session
from app.models.users import User

load_dotenv()

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
password_hash = PasswordHash.recommended()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

# ---------------------------------------------------------------------------
# Schemas (Pydantic)
# ---------------------------------------------------------------------------

class CreateUserRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# ---------------------------------------------------------------------------
# Dependencias
# ---------------------------------------------------------------------------

db_dependency = Annotated[Session, Depends(get_session)]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    """Registra un nuevo usuario."""
    # Verificar que el email no esté en uso
    existing = db.exec(select(User).where(User.email == create_user_request.email)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    new_user = User(
        email=create_user_request.email,
        password=password_hash.hash(create_user_request.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
):
    """Obtiene un JWT usando email (username field) y contraseña."""
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas.",
        )

    token = create_access_token(user.email, user.id, timedelta(minutes=30))
    return {"access_token": token, "token_type": "bearer"}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def authenticate_user(email: str, password: str, db: Session) -> User | None:
    user = db.exec(select(User).where(User.email == email)).first()
    if not user:
        return None
    if not password_hash.verify(password, user.password):
        return None
    return user


def create_access_token(email: str, user_id: int, expires_delta: timedelta) -> str:
    payload = {"sub": email, "id": user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    payload.update({"exp": expires})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        user_id: int = payload.get("id")
        if email is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="No se pudo validar el usuario.",
            )
        return {"email": email, "id": user_id}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudo validar el usuario.",
        )
