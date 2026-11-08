from backend.security.security import Security
from backend.repository.auth.Register.RegisterRepository import RegisterRepository

class RegisterService:

    @staticmethod
    def register(nome, email, senha):
        senhaHash = Security.hash_password(senha)
        registerUser = RegisterRepository.setNewUser(nome, email, senhaHash)
        return registerUser
