# app/models/stylist_conversations.py

from datetime import datetime, timezone

from sqlmodel import SQLModel, Field


class StylistConversation(SQLModel, table=True):
    __tablename__ = "stylistconversation"  # SQLModel usa el nombre de clase en minúsculas por defecto

    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")

    title: str | None = Field(default=None, max_length=255)

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )