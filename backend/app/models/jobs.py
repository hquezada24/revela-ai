# app/models/jobs.py

from datetime import datetime, timezone
from enum import Enum

from sqlmodel import SQLModel, Field


class JobStatus(str, Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class Job(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")

    job_type: str = Field(max_length=100)

    status: JobStatus

    progress: int | None = None

    error_message: str | None = None

    started_at: datetime | None = None

    completed_at: datetime | None = None

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )