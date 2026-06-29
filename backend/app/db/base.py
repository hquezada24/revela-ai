# app/db/base.py
# Con SQLModel no se necesita una Base separada de SQLAlchemy.
# SQLModel.metadata es el metadata global que Alembic y create_all() usan.
# Este archivo se mantiene por compatibilidad en caso de imports existentes.

from sqlmodel import SQLModel

# Re-exportar SQLModel para que alembic/env.py pueda importar desde aquí
__all__ = ["SQLModel"]