from pydantic import BaseModel

from backend.entity.dto.auth.Register.RegisterResponseDTO import RegisterResponseDTO


class LoginResponseDTO(BaseModel):
    accessToken: str
    tokenType: str = "bearer"
    user: RegisterResponseDTO
