# app/api/v1/endpoints/users.py

from typing import Annotated
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.auth import get_current_user
from app.db.database import get_session
from app.schemas.user import CurrentUser, UserRead
from app.services.user_service import get_user_by_id, get_user_by_email, verify_password
from fastapi import HTTPException
from starlette import status
from app.core.security import COOKIE_NAME
from app.db.database import get_session
from fastapi import Response
from app.schemas.user import CurrentUser, DeleteAccountRequest

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_session)]
user_dependency = Annotated[CurrentUser, Depends(get_current_user)]


# ---------------------------------------------------------------------------
# GET /users/me
# ---------------------------------------------------------------------------
@router.get("/me", response_model=UserRead, status_code=status.HTTP_200_OK)
def get_me(current_user: user_dependency, db: db_dependency):
    """
    Returns the full profile of the currently authenticated user.
    The JWT is read from the HttpOnly cookie by the `get_current_user` dependency.
    """
    user = get_user_by_id(db, current_user.id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
    return user

# ---------------------------------------------------------------------------
# DELETE /auth/users/me  (delete own account)
# ---------------------------------------------------------------------------
@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    response: Response,
    body: DeleteAccountRequest,
    db: db_dependency,
    current_user: user_dependency,
):
    user = get_user_by_email(db, current_user.email)
    if not verify_password(user.hashed_password, body.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password.",
        )
    from app.services.user_service import delete_account
    delete_account(db, current_user.id)
    response.delete_cookie(key=COOKIE_NAME, httponly=True, samesite="lax")
