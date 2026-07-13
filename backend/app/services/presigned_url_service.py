
import boto3
from botocore.client import Config
from app.services.file_manager import generate_file_structure
import os


class R2StorageService:
    def __init__(self):
        self.client = boto3.client(
            "s3",
            endpoint_url=os.getenv("R2_ENDPOINT"),
            aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY"),
            region_name="auto",
            config=Config(signature_version="s3v4"),
        )

    def create_presigned_upload_url(
        self,
        filename: str,
        content_type: str,
        expires_in: int = 300,
    ) -> dict:
        extension = filename.split(".")[-1]
        object_key = generate_file_structure(extension)

        upload_url = self.client.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": os.getenv("R2_BUCKET_NAME"),
                "Key": object_key,
                "ContentType": content_type,
            },
            ExpiresIn=expires_in,
        )

        return {
            "upload_url": upload_url,
            "object_key": object_key,
        }