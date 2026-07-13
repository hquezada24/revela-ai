from sqlmodel import SQLModel

class PresignedURL(SQLModel):
    upload_url: str
    object_key: str

class InputData(SQLModel):
    filename: str
    content_type: str