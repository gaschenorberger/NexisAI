from typing import Literal
from pydantic import BaseModel, EmailStr

class RegisterResponseDTO(BaseModel):
    id_usuario: int
    nome: str
    email: EmailStr
    perfil: Literal["admin", "gestor", "usuario"]
    status: Literal["ativo", "inativo", "bloqueado"]