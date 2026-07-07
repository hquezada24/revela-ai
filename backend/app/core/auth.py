# app/core/auth.py

from fastapi import Cookie, HTTPException
from jose import jwt, JWTError
from starlette import status
from app.schemas.user import CurrentUser
from app.core.security import SECRET_KEY, ALGORITHM, COOKIE_NAME


def get_current_user(access_token: str | None = Cookie(default=None)) -> CurrentUser:
    """
    Dependency: reads the JWT from the HttpOnly cookie and returns the
    authenticated user's basic identity. Raises 401 if the cookie is
    absent or the token is invalid / expired.
    """
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated.",
        )
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        user_id: int | None = payload.get("id")
        if email is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate user.",
            )
        return CurrentUser(email=email, id=user_id)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user.",
        )
