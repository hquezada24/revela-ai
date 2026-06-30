# app/models/transformations.py

from datetime import datetime, timezone
from sqlmodel import Field
from app.schemas.transformations import Transformation

class Transformation(Transformation, table=True):
    id: int | None = Field(default=None, primary_key=True)

    # category: TransformationCategory

    # prompt: str

    # result_image_url: Optional[str] = None

    # settings: Optional[dict[str, Any]] = Field(
    #     default=None,
    #     sa_column=Column(JSON),
    # )

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
    )

    # Relationships (FKs)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    photo_id: int | None = Field(default=None, foreign_key="photo.id")
    job_id: int | None = Field(default=None, foreign_key="job.id")