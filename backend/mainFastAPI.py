"""
uvicorn backend.mainFastApi:app --reload --port 8001
"""

from fastapi import FastAPI
from backend.controller.RegisterController import registerRouter

app = FastAPI()

@app.get("/")
def health():
    return {"API": "Running"}

app.include_router(registerRouter)
