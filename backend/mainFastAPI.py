"""
python -m uvicorn backend.mainFastAPI:app --reload --port 8001
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.controller.auth.LoginController import loginRouter
from backend.controller.auth.RegisterController import registerRouter

app = FastAPI(title="Nexis AI API", version="0.1.0")

allowedOrigins = [
    origin.strip()
    for origin in os.getenv(
        "allowedOrigins",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowedOrigins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

@app.get("/")
@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "ok"}

app.include_router(registerRouter)
app.include_router(loginRouter)
