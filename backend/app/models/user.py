from backend.app.db.base import Base
import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    full_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    profile_photo_url: Mapped[str | None] = mapped_column(
        nullable=True,
    )

    gender_presentation: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    birth_year: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    preferred_language: Mapped[str] = mapped_column(
        String(2),
        default="en",
    )

    onboarding_completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(datetime.timezone.utc),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(datetime.timezone.utc),
        onupdate=datetime.now(datetime.timezone.utc),
        nullable=False,
    )

    photos = relationship("Photo", back_populates="user")
    subscriptions = relationship("Subscription", back_populates="user")
    jobs = relationship("Job", back_populates="user")
    transformations = relationship("Transformation", back_populates="user")
    conversations = relationship(
        "StylistConversation",
        back_populates="user",
    )
    glow_up_plans = relationship(
        "GlowUpPlan",
        back_populates="user",
    )