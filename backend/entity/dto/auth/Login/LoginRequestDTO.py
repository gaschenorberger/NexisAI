from pydantic import BaseModel, EmailStr, Field, field_validator

class LoginRequestDTO(BaseModel):
    email: EmailStr
    senha: str = Field(min_length=8)

    @field_validator("email", mode="before")
    @classmethod
    def cleanEmail(cls, email):
        return email.strip().lower() if isinstance(email, str) else email
