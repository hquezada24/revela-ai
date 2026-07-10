# app/models/jobs.py

from datetime import datetime, timezone
from sqlmodel import Field
from app.schemas.generation_jobs import JobBase

class Job(JobBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    updated_at: datetime