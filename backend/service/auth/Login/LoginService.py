from backend.exceptions import InactiveUserError, InvalidCredentialsError, InvalidTokenError
from backend.repository.auth.Login.LoginRepository import LoginRepository
from backend.security.security import Security


class LoginService:

    @staticmethod
    def login(email, senha):
        user = LoginRepository.getUserByEmail(email)
        if user is None or not Security.verifyPassword(senha, user["senhaHash"]):
            raise InvalidCredentialsError

        if user["status"] != "ativo":
            raise InactiveUserError

        accessToken = Security.createAccessToken(user["idUsuario"])
        publicUser = {
            key: value
            for key, value in user.items()
            if key != "senhaHash"
        }
        return {
            "accessToken": accessToken,
            "tokenType": "bearer",
            "user": publicUser,
        }

    @staticmethod
    def getCurrentUser(accessToken):
        userId = Security.verifyAccessToken(accessToken)
        user = LoginRepository.getPublicUserById(userId)
        if user is None:
            raise InvalidTokenError
        if user["status"] != "ativo":
            raise InactiveUserError
        return user
