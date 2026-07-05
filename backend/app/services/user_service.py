from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.users import User
from app.schemas.user import UserCreate
from pwdlib import PasswordHash
from app.schemas.user import UserAuthentication

password_hash = PasswordHash.recommended()

"""
Services
"""

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.exec(select(User).where(User.email == email)).first()

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.exec(select(User).where(User.id == user_id)).first()

def verify_password(hashed_password: str, password: str) -> bool:
    return password_hash.verify(password, hashed_password)

def authenticate_user(db: Session, user_data: UserAuthentication) -> User | None:
    user = db.exec(select(User).where(User.email == user_data.username)).first()
    if not user:
        return None
    if not verify_password(user.hashed_password, user_data.password):
        return None
    return user

def create_user(db: Session, user_data: UserCreate) -> User:
    existing = get_user_by_email(db, user_data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )

    user = User(
        email=user_data.email,
        hashed_password=password_hash.hash(user_data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user_id: int, email: str, password: str) -> User:
    user = get_user_by_id(db, user_id)
    if not user:
        raise ValueError("User not found")
    user.email = email
    user.hashed_password = password_hash.hash(password)
    db.commit()
    db.refresh(user)
    return user

def delete_account(db: Session, user_id: int) -> None:
    user = get_user_by_id(db, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    db.delete(user)
    db.commit()
