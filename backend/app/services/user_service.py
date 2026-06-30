from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.users import User
from pwdlib import PasswordHash
from app.schemas.user import UserAuthentication

password_hash = PasswordHash.recommended()

def authenticate_user(db: Session, user_data: UserAuthentication) -> User | None:
    user = db.exec(select(User).where(User.email == user_data.email)).first()
    if not user:
        return None
    if not password_hash.verify(User.password, user_data.password):
        return None
    return user

def get_user_by_email(db: Session, user_data: str) -> User | None:
    return db.exec(select(User).where(User.email == user_data.email)).first()

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.exec(select(User).where(User.id == user_id)).first()

def create_user(db: Session, email: str, password: str) -> User:
    existing = db.exec(select(User).where(User.email == email)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )

    user = User(
        email=email,
        password=password_hash.hash(password),
    )
    user = User(email=email, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user_id: int, email: str, password: str) -> User:
    user = get_user_by_id(db, user_id)
    if not user:
        raise ValueError("User not found")
    user.email = email
    user.password = password
    db.commit()
    db.refresh(user)
    return user