from fastapi import APIRouter, HTTPException

from backend.entity.dto.auth.Register.RegisterRequestDTO import RegisterRequestDTO
from backend.entity.dto.auth.Register.RegisterResponseDTO import RegisterResponseDTO
from backend.exceptions import UserAlreadyExistsError
from backend.service.auth.Register.RegisterService import RegisterService

registerRouter = APIRouter(tags=["Authentication"])

@registerRouter.post("/api/auth/register", response_model=RegisterResponseDTO, status_code=201)
@registerRouter.post(
    "/auth/registerUser",
    response_model=RegisterResponseDTO,
    status_code=201,
    include_in_schema=False,
)
def registerUser(user: RegisterRequestDTO):
    try:
        registeredUser = RegisterService.register(user.nome, user.email, user.senha)
        return RegisterResponseDTO(**registeredUser)
    except UserAlreadyExistsError:
        raise HTTPException(
            status_code=409,
            detail="Já existe uma conta com este e-mail.",
        ) from None
