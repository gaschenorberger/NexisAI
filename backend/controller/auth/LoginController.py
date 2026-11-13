from fastapi import APIRouter, HTTPException

loginRouter = APIRouter(prefix="/auth", tags=["Login"])

@loginRouter.post("/login", status_code=201)
async def loginUser():
    print()