from backend.dao.UserDAO import UserDAO


class LoginRepository:

    @staticmethod
    def getUserByEmail(email):
        return UserDAO.getUserByEmail(email)

    @staticmethod
    def getPublicUserById(userId):
        return UserDAO.getPublicUserById(userId)
