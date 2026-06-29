# app/models/glow_up_plans.py

from datetime import datetime, timezone
from typing import Any

from sqlmodel import SQLModel, Field, Column, JSON


class GlowUpPlan(SQLModel, table=True):
    __tablename__ = "glowupplan"  # SQLModel usa el nombre de clase en minúsculas por defecto

    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")

    goal: str = Field(max_length=100)

    budget: float | None = None

    recommendations: dict[str, Any] | None = Field(
        default=None,
        sa_column=Column(JSON),
    )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )