from sqlmodel import SQLModel, Field
from datetime import datetime
from enum import Enum

class PreferredLanguage(str, Enum):
    ES = "es"
    EN = "en"
    FR = "fr"
    DE = "de"
    JP = "jp"

# Base User model
class UserBase(SQLModel):
    email: str
    age: int | None = Field(default=None, index=True, ge=18, le=100)
    profile_photo_url: str | None = None
    preferred_language: PreferredLanguage = PreferredLanguage.EN

class UserRead(UserBase):
    id: int
    onboarding_completed: bool
    created_at: datetime

# Create User
class UserCreate(UserBase):
    password: str

# User Authentication
class UserAuthentication(SQLModel):
    username: str
    password: str

class CurrentUser(SQLModel):
    email: str
    id: int

# Delete account request body
class DeleteAccountRequest(SQLModel):
    password: str