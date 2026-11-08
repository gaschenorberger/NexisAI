from backend.dao.UserDAO import UserDAO

class RegisterRepository:

    @staticmethod
    def setNewUser(nome, email, senhaHash):
        return UserDAO.setNewUser(nome, email, senhaHash)
         
