from sqlmodel import SQLModel, Field
from typing import Literal
from datetime import datetime

# Base User model
class UserBase(SQLModel):
    email: str
    age: int | None = Field(default=None, index=True, ge=18, le=100)
    profile_photo_url: str | None = None
    preferred_language: Literal["es", "en", "fr", "de", "jp"] = "en"

class UserRead(UserBase):
    id: int
    onboarding_completed: bool
    created_at: datetime

class UserCreate(UserBase):
    password: str

# User Authentication
class UserAuthentication(SQLModel):
    email: str
    password: str