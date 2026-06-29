# app/models/stylist_messages.py

from datetime import datetime, timezone

from sqlmodel import SQLModel, Field


class StylistMessage(SQLModel, table=True):
    __tablename__ = "stylistmessage"  # SQLModel usa el nombre de clase en minúsculas por defecto

    id: int | None = Field(default=None, primary_key=True)

    conversation_id: int = Field(foreign_key="stylistconversation.id")

    role: str = Field(max_length=20)

    content: str

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )