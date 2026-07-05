# app/main.py

from typing import Annotated
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session
from starlette import status
from app.db.database import engine, get_session
from app.core.auth import router, get_current_user
from app.api.v1.endpoints import auth

app = FastAPI(title="Revela AI API")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    # CORSMiddleware,
    # allow_origins=origins,
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
    CORSMiddleware,
    allow_origins=["*"],      # Allows all origins
    allow_credentials=False,  # Must be False if allow_origins=["*"]
    allow_methods=["*"],      # Allows all methods
    allow_headers=["*"],      # Allows all headers
)

app.include_router(router)

# Crear todas las tablas si no existen (útil en desarrollo).
# En producción se usa Alembic para migraciones.
SQLModel.metadata.create_all(engine)

# ---------------------------------------------------------------------------
# Dependencias globales
# ---------------------------------------------------------------------------

db_dependency = Annotated[Session, Depends(get_session)]
user_dependency = Annotated[dict, Depends(get_current_user)]

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/", status_code=status.HTTP_200_OK)
async def root(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed!")
    return {"user": user}