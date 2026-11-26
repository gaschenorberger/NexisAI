from typing import Annotated

from fastapi import APIRouter, Header, HTTPException

from backend.entity.dto.auth.Login.LoginRequestDTO import LoginRequestDTO
from backend.entity.dto.auth.Login.LoginResponseDTO import LoginResponseDTO
from backend.exceptions import (
    AuthConfigurationError,
    InactiveUserError,
    InvalidCredentialsError,
    InvalidTokenError,
)
from backend.entity.dto.auth.Register.RegisterResponseDTO import RegisterResponseDTO
from backend.service.auth.Login.LoginService import LoginService

loginRouter = APIRouter(prefix="/api/auth", tags=["Authentication"])


@loginRouter.post("/login", response_model=LoginResponseDTO)
def loginUser(credentials: LoginRequestDTO):
    try:
        return LoginService.login(credentials.email, credentials.senha)
    except InvalidCredentialsError:
        raise HTTPException(
            status_code=401,
            detail="E-mail ou senha inválidos.",
        ) from None
    except InactiveUserError:
        raise HTTPException(
            status_code=403,
            detail="Esta conta não está ativa.",
        ) from None
    except AuthConfigurationError:
        raise HTTPException(
            status_code=503,
            detail="A autenticação não está configurada no servidor.",
        ) from None


@loginRouter.get("/me", response_model=RegisterResponseDTO)
def getCurrentUser(authorization: Annotated[str | None, Header()] = None):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Sessão inválida ou expirada.")

    accessToken = authorization.removeprefix("Bearer ").strip()
    try:
        return LoginService.getCurrentUser(accessToken)
    except (InvalidTokenError, InactiveUserError):
        raise HTTPException(
            status_code=401,
            detail="Sessão inválida ou expirada.",
        ) from None
    except AuthConfigurationError:
        raise HTTPException(
            status_code=503,
            detail="A autenticação não está configurada no servidor.",
        ) from None
