import uuid
from datetime import datetime

from sqlalchemy import (
    String,
    DateTime,
    Integer,
    BigInteger,
    Boolean,
    ForeignKey,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Photo(Base):
    __tablename__ = "photos"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    storage_key: Mapped[str] = mapped_column(
        nullable=False,
    )

    public_url: Mapped[str | None]

    width: Mapped[int | None] = mapped_column(Integer)

    height: Mapped[int | None] = mapped_column(Integer)

    mime_type: Mapped[str | None] = mapped_column(
        String(100),
    )

    file_size_bytes: Mapped[int | None] = mapped_column(
        BigInteger,
    )

    is_deleted: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now(datetime.timezone.utc),
    )

    user = relationship("User", back_populates="photos")