import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import String, Numeric, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class GlowUpPlan(Base):
    __tablename__ = "glow_up_plans"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
    )

    goal: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    budget: Mapped[float | None] = mapped_column(
        Numeric(10, 2),
    )

    recommendations: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(datetime.timezone.utc),
    )

    user = relationship(
        "User",
        back_populates="glow_up_plans",
    )