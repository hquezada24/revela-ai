# app/models/users.py

from datetime import datetime, timezone

from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str = Field(nullable=False)
    age: int | None = Field(default=None, index=True, min_length=18, max_length=100)
    email: str = Field(index=True, unique=True, nullable=False)
    profile_photo_url: str | None 
    preferred_language: str = Field(
        nullable=False,
        min_length=2, 
        max_length=2,
        default="en",
    )
    onboarding_completed: bool = Field(
        default=False,
    )
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    # photos = Field("Photo", back_populates="user")
    # subscriptions = Field("Subscription", back_populates="user")
    # jobs = Field("Job", back_populates="user")
    # conversations = Field(
    #     "StylistConversation",
    #     back_populates="user",
    # )
    # glow_up_plans = Field(
    #     "GlowUpPlan",
    #     back_populates="user",
    # )