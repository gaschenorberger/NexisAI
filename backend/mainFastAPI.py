"""
uvicorn backend.mainFastApi:app --reload --port 8001
"""

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health():
    return {"API": "Running"}

# app.include_router(auth_router)
