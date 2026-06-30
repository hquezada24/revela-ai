from sqlmodel import SQLModel, Field, JSON, Column
from enum import Enum
from typing import Any, Optional


class TransformationCategory(str, Enum):
    VIRTUAL_TRY_ON = "virtual_try_on"
    OUTFIT_RECOMMENDATION = "outfit_recommendation"
    COLOR_ANALYSIS = "color_analysis"
    HAIR_STUDIO = "hair_studio"
    MAKEUP_STUDIO = "makeup_studio"
    ACCESSORIES = "accessories"
    OUTFIT_COMPLETION = "outfit_completion"
    PROFESSIONAL_PHOTOS = "professional_photos"

class TransformationBase(SQLModel):
    category: TransformationCategory

    prompt: str

    result_image_url: Optional[str] = None

    settings: Optional[dict[str, Any]] = Field(
        default=None,
        sa_column=Column(JSON),
    )