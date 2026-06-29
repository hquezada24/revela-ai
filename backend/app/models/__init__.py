# app/models/__init__.py
# Importar todos los modelos para que SQLModel los registre en su metadata.
# Esto es necesario para que SQLModel.metadata.create_all() y Alembic
# puedan detectar todas las tablas.

from app.models.users import User
from app.models.photos import Photo
from app.models.jobs import Job
from app.models.subscriptions import Subscription
from app.models.transformations import Transformation, TransformationCategory
from app.models.stylist_conversations import StylistConversation
from app.models.stylist_messages import StylistMessage
from app.models.glow_up_plans import GlowUpPlan

__all__ = [
    "User",
    "Photo",
    "Job",
    "Subscription",
    "Transformation",
    "TransformationCategory",
    "StylistConversation",
    "StylistMessage",
    "GlowUpPlan",
]
