import time

import dramatiq
from sqlmodel import Session
from app.db.database import engine
from app.models.generation_jobs import Job
from app.models.users import User

@dramatiq.actor
def generate_portrait_task(job_id: int):
    with Session(engine) as session:
        job = session.get(Job, job_id)

        if job is None:
            return

        job.status = "PROCESSING"
        session.add(job)
        session.commit()

        time.sleep(15)

        job.status = "COMPLETED"
        job.output = {
            "image_url": f"https://example.com/{job.id}.png"
        }

        session.add(job)
        session.commit()