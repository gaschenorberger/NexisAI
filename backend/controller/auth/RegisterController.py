from fastapi import APIRouter, HTTPException
from backend.entity.dto.auth.Register.RegisterRequestDTO import RegisterRequestDTO
from backend.entity.dto.auth.Register.RegisterResponseDTO import RegisterResponseDTO
from backend.service.auth.Register.RegisterService import RegisterService

registerRouter = APIRouter(prefix="/auth", tags=["Register"])

@registerRouter.post("/registerUser", response_model=RegisterResponseDTO, status_code=201)
async def registerUser(user: RegisterRequestDTO):
    try:
        user = RegisterService.register(user.nome, user.email, user.senha)
        return RegisterResponseDTO(**user)
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "Status": "error",
                "Mensagem": "Erro interno ao cadastrar usuario",
                "Detalhes do erro": str(e),
            },
        )