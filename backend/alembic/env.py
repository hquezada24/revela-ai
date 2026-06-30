from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from sqlmodel import SQLModel
from alembic import context
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración de Alembic
config = context.config
config.set_main_option("DATABASE_URL", os.getenv("DATABASE_URL"))

# Configurar logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config = context.config
# SQLModel.metadata contiene las definiciones de todas las tablas
target_metadata = SQLModel.metadata

def run_migrations_offline() -> None:
    """Ejecutar migraciones en modo 'offline' (sin conexión activa al DB)."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Ejecutar migraciones en modo 'online' (con conexión activa al DB)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
