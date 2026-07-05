from fastapi import APIRouter, status, HTTPException
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from sqlmodel import Session
from app.schemas.user import UserCreate, DeleteAccountRequest, CurrentUser
from app.schemas.token import Token
from app.db.database import get_session
from app.services.user_service import create_user, delete_account, verify_password, get_user_by_email
from app.services.auth_service import login_for_access_token_service
from app.core.auth import get_current_user

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_session)]
user_dependency = Annotated[CurrentUser, Depends(get_current_user)]

# Register
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(db: db_dependency, user_data: UserCreate):
    return create_user(db, user_data)

# Log in
@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: db_dependency,
):
    return await login_for_access_token_service(db, form_data)

# Delete account
@router.delete("/users/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(body: DeleteAccountRequest, db: db_dependency, current_user: user_dependency):
    print("Current user: ", current_user)
    user = get_user_by_email(db, current_user.email)

    if not verify_password(user.hashed_password, body.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password.",
        )
    
    return delete_account(db, current_user.id)
