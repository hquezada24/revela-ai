import os
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta
from jose import jwt

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(email: str, user_id: int, expires_delta: timedelta) -> str:
    payload = {"sub": email, "id": user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    payload.update({"exp": expires})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)