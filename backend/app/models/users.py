# app/models/users.py

from datetime import datetime, timezone
from app.schemas.user import UserBase
from sqlmodel import Field

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    hashed_password = str
    
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