import os
import unittest
import uuid

from fastapi import HTTPException

from backend.controller.auth.LoginController import getCurrentUser, loginUser
from backend.controller.auth.RegisterController import registerUser
from backend.entity.dto.auth.Login.LoginRequestDTO import LoginRequestDTO
from backend.entity.dto.auth.Register.RegisterRequestDTO import RegisterRequestDTO
from db.config import getConn, putConn


@unittest.skipUnless(
    os.getenv("RUN_DATABASE_TESTS") == "1",
    "Teste de integração requer PostgreSQL real e RUN_DATABASE_TESTS=1.",
)
class AuthIntegrationTests(unittest.TestCase):
    def setUp(self):
        uniquePart = uuid.uuid4().hex
        self.email = f"teste-{uniquePart}@example.com"
        self.password = "senhaFicticia123"

    def tearDown(self):
        conn = getConn()
        cursor = conn.cursor()
        try:
            cursor.execute("DELETE FROM tbl_usuario WHERE email = %s", (self.email,))
            conn.commit()
        finally:
            cursor.close()
            putConn(conn)

    def testRegisterDuplicateAndLoginFlow(self):
        registerRequest = RegisterRequestDTO(
            nome="Usuário de Teste",
            email=self.email,
            senha=self.password,
        )
        registeredUser = registerUser(registerRequest)
        self.assertEqual(self.email, registeredUser.email)

        with self.assertRaises(HTTPException) as duplicateContext:
            registerUser(registerRequest)
        self.assertEqual(409, duplicateContext.exception.status_code)

        with self.assertRaises(HTTPException) as invalidLoginContext:
            loginUser(LoginRequestDTO(email=self.email, senha="senhaIncorreta123"))
        self.assertEqual(401, invalidLoginContext.exception.status_code)

        loginBody = loginUser(LoginRequestDTO(email=self.email, senha=self.password))
        self.assertEqual(self.email, str(loginBody["user"]["email"]))
        self.assertEqual("bearer", loginBody["tokenType"])
        self.assertEqual(2, loginBody["accessToken"].count("."))

        currentUser = getCurrentUser(f"Bearer {loginBody['accessToken']}")
        self.assertEqual(self.email, currentUser["email"])


if __name__ == "__main__":
    unittest.main()
