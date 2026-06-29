from sqlmodel import SQLModel, Field
from typing import Literal

class UserAuthentication(SQLModel):
    email: str
    password: str

class UserCreate(UserAuthentication):
    age: int | None = Field(default=None, index=True, min_length=18, max_length=100)
    profile_photo_url: str | None 
    preferred_language: Literal["es", "en", "fr", "de", "jp"] = "en"