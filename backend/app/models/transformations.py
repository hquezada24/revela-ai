import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from enum import Enum
from app.db.base import Base

class TransformationCategory(str, Enum):
    VIRTUAL_TRY_ON = "virtual_try_on"
    OUTFIT_RECOMMENDATION = "outfit_recommendation"
    COLOR_ANALYSIS = "color_analysis"
    HAIR_STUDIO = "hair_studio"
    MAKEUP_STUDIO = "makeup_studio"
    ACCESSORIES = "accessories"
    OUTFIT_COMPLETION = "outfit_completion"
    PROFESSIONAL_PHOTOS = "professional_photos"


class Transformation(Base):
    __tablename__ = "transformations"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
    )

    photo_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("photos.id", ondelete="SET NULL"),
    )

    job_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("jobs.id", ondelete="SET NULL"),
    )

    category: Mapped[TransformationCategory] = mapped_column(
        nullable=False,
    )

    prompt: Mapped[str | None] = mapped_column(
        Text,
    )

    result_image_url: Mapped[str | None]

    settings: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(datetime.timezone.utc),
    )

    user = relationship("User", back_populates="transformations")