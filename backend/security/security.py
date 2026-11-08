import bcrypt

class Security:
    
    @staticmethod
    def hash_password(senha: str):
        return bcrypt.hashpw(
            senha.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")