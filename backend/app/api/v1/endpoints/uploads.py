# app/api/v1/endpoints/users.py

from typing import Annotated
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.auth import get_current_user
from app.db.database import get_session
from app.schemas.user import CurrentUser
from app.services.user_service import get_user_by_id
from fastapi import HTTPException
from starlette import status
from app.services.presigned_url_service import R2StorageService
from app.schemas.presigned_url import PresignedURL, InputData

router = APIRouter()

def get_r2_service():
    return R2StorageService()

db_dependency = Annotated[Session, Depends(get_session)]
user_dependency = Annotated[CurrentUser, Depends(get_current_user)]
storage_dependency = Annotated[R2StorageService, Depends(get_r2_service)]


# ---------------------------------------------------------------------------
# GET /users/me
# ---------------------------------------------------------------------------
@router.post("/", response_model=PresignedURL, status_code=status.HTTP_200_OK)
def get_presigned_upload_url(current_user: user_dependency, db: db_dependency, r2: storage_dependency, file_info: InputData):
    """
    Returns a presign URL for client to upload input image
    """
    user = get_user_by_id(db, current_user.id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )
    
    url = r2.create_presigned_upload_url(filename=file_info.filename, content_type=file_info.content_type)

    return url