# app/models/subscriptions.py

from datetime import datetime, timezone

from sqlmodel import SQLModel, Field


class Subscription(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")

    plan: str = Field(max_length=50)

    status: str = Field(max_length=50)

    provider: str | None = Field(default=None, max_length=50)

    provider_subscription_id: str | None = Field(default=None, max_length=255)

    current_period_start: datetime | None = None

    current_period_end: datetime | None = None

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )