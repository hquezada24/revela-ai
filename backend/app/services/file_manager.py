import magic
from datetime import datetime
import uuid

def generate_file_structure (original_extension: str):

    now = datetime.now()
    date_path = now.strftime("%Y/%m/%d")
    
    file_id = str(uuid.uuid4())
    key = f"uploads/{date_path}/{file_id}.{original_extension}"
    
    return key

def validate_file_type(file_bytes: bytes):
    # 1. Validar el tipo de archivo real (MIME type)
    # python-magic analiza los bytes, no la extensión
    mime = magic.from_butidoffer(file_bytes, mime=True)
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    
    if mime not in allowed_types:
        raise ValueError(f"File type not allowed: {mime}")