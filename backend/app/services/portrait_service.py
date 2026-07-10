from app.models.generation_jobs import Job
from app.schemas.generation_jobs import JobCreate
from app.tasks.portrait_tasks import generate_portrait_task
from sqlmodel import Session

def create_portrait(db: Session, user_id: int, data: JobCreate):
    job = Job(
        user_id=user_id,
        status="QUEUED",
        prompt=data.prompt,
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    generate_portrait_task.send(job.id)

    return job