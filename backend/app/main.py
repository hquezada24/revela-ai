from fastapi import FastAPI

app = FastAPI()


@app.get("/api/v1/users/{user_id}")
async def root(user_id):
    return {"message": f"Hello World {user_id}"}