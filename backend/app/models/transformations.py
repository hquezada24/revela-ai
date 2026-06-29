# app/models/transformations.py

from datetime import datetime, timezone
from typing import Any, Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship, JSON, Column
from enum import Enum


class TransformationCategory(str, Enum):
    VIRTUAL_TRY_ON = "virtual_try_on"
    OUTFIT_RECOMMENDATION = "outfit_recommendation"
    COLOR_ANALYSIS = "color_analysis"
    HAIR_STUDIO = "hair_studio"
    MAKEUP_STUDIO = "makeup_studio"
    ACCESSORIES = "accessories"
    OUTFIT_COMPLETION = "outfit_completion"
    PROFESSIONAL_PHOTOS = "professional_photos"


class Transformation(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    category: TransformationCategory

    prompt: str

    result_image_url: Optional[str] = None

    settings: Optional[dict[str, Any]] = Field(
        default=None,
        sa_column=Column(JSON),
    )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
    )

    # Relationships (FKs)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    photo_id: int | None = Field(default=None, foreign_key="photo.id")
    job_id: int | None = Field(default=None, foreign_key="job.id")