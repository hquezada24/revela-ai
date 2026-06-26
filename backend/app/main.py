# main.py

from fastapi import FastAPI, Depends, HTTPException
from app.core.auth import router
from sqlalchemy.orm import Session
from starlette import status
from app.db.base import Base
from app.db.database import SessionLocal, engine
from typing import Annotated
from app.core.auth import get_current_user

app = FastAPI()
app.include_router(router)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@app.get("/", status_code=status.HTTP_200_OK)
async def root(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed!")
    return {"user": user}