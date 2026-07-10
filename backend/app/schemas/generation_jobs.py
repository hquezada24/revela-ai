# app/models/jobs.py

from datetime import datetime
from enum import Enum
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import SQLModel, Field


class JobStatus(str, Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class Tool(str, Enum):
    PORTRAIT = "portrait"

class JobBase(SQLModel):
    status: JobStatus

    progress: int | None = None

    error_message: str | None = None

    output: dict | None = Field(
        default=None,
        sa_column=Column(JSONB)
    )
    
    tool: Tool

    started_at: datetime | None = None

    completed_at: datetime | None = None

class JobRead(JobBase):
    id: int

    user_id: int

    created_at: datetime 

    updated_at: datetime

class JobCreate(SQLModel):
    input_data: dict = Field(sa_column=Column(JSONB))
    tool: Tool