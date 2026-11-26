import unittest
from unittest.mock import patch

from backend.exceptions import AuthConfigurationError, InvalidCredentialsError, InvalidTokenError
from backend.security.security import Security
from backend.service.auth.Login.LoginService import LoginService


class SecurityTests(unittest.TestCase):
    def testPasswordCanBeHashedAndVerified(self):
        passwordHash = Security.hashPassword("senhaFicticia123")

        self.assertTrue(Security.verifyPassword("senhaFicticia123", passwordHash))
        self.assertFalse(Security.verifyPassword("senhaIncorreta123", passwordHash))

    def testAccessTokenRequiresStrongSecret(self):
        with patch.dict("os.environ", {"authSecret": "curto"}):
            with self.assertRaises(AuthConfigurationError):
                Security.createAccessToken(1)

    def testAccessTokenDoesNotContainSecret(self):
        authSecret = "segredo-ficticio-com-mais-de-trinta-e-dois-caracteres"
        with patch.dict("os.environ", {"authSecret": authSecret}):
            accessToken = Security.createAccessToken(42)

        self.assertEqual(2, accessToken.count("."))
        self.assertNotIn(authSecret, accessToken)

    def testAccessTokenCanBeVerifiedAndRejectsTampering(self):
        authSecret = "segredo-ficticio-com-mais-de-trinta-e-dois-caracteres"
        with patch.dict("os.environ", {"authSecret": authSecret}):
            accessToken = Security.createAccessToken(42)
            self.assertEqual(42, Security.verifyAccessToken(accessToken))

            tamperedToken = f"{accessToken[:-1]}{'a' if accessToken[-1] != 'a' else 'b'}"
            with self.assertRaises(InvalidTokenError):
                Security.verifyAccessToken(tamperedToken)


class LoginServiceTests(unittest.TestCase):
    def testInvalidEmailDoesNotRevealWhetherUserExists(self):
        with patch(
            "backend.service.auth.Login.LoginService.LoginRepository.getUserByEmail",
            return_value=None,
        ):
            with self.assertRaises(InvalidCredentialsError):
                LoginService.login("inexistente@example.com", "senhaFicticia123")

    def testValidUserReceivesTokenWithoutPasswordHash(self):
        passwordHash = Security.hashPassword("senhaFicticia123")
        storedUser = {
            "idUsuario": 7,
            "nome": "Gestor Fictício",
            "email": "gestor@example.com",
            "senhaHash": passwordHash,
            "perfil": "gestor",
            "status": "ativo",
        }
        with (
            patch(
                "backend.service.auth.Login.LoginService.LoginRepository.getUserByEmail",
                return_value=storedUser,
            ),
            patch.dict(
                "os.environ",
                {"authSecret": "segredo-ficticio-com-mais-de-trinta-e-dois-caracteres"},
            ),
        ):
            result = LoginService.login("gestor@example.com", "senhaFicticia123")

        self.assertNotIn("senhaHash", result["user"])
        self.assertEqual("gestor@example.com", result["user"]["email"])
        self.assertEqual("bearer", result["tokenType"])


if __name__ == "__main__":
    unittest.main()
