import unittest
from unittest.mock import patch

from db.config import getConn


class DatabaseConfigTests(unittest.TestCase):
    def testMissingUrlDoesNotConnect(self):
        with patch.dict("os.environ", {"databaseUrl": ""}), patch("db.config.connect") as connectMock:
            with self.assertRaisesRegex(ValueError, "Configure databaseUrl"):
                getConn()
            connectMock.assert_not_called()

    def testInvalidUrlDoesNotExposeCredentials(self):
        databaseUrl = "mysql://demoUser:senhaPrivada@localhost/demoDb"
        with patch.dict("os.environ", {"databaseUrl": databaseUrl}), patch("db.config.connect") as connectMock:
            with self.assertRaises(ValueError) as errorContext:
                getConn()
            self.assertNotIn("senhaPrivada", str(errorContext.exception))
            connectMock.assert_not_called()

    def testEncodedCredentialsAndDefaultPort(self):
        databaseUrl = "postgresql://demo%40user:p%40ss%3Aword@localhost/demoDb"
        with patch.dict("os.environ", {"databaseUrl": databaseUrl}), patch("db.config.connect") as connectMock:
            connection = getConn()
            connectMock.assert_called_once_with(
                user="demo@user",
                password="p@ss:word",
                host="localhost",
                port=5432,
                database="demoDb",
            )
            self.assertIs(connection, connectMock.return_value)

    def testInvalidPortDoesNotExposeCredentials(self):
        databaseUrl = "postgresql://demoUser:senhaPrivada@localhost:invalid/demoDb"
        with patch.dict("os.environ", {"databaseUrl": databaseUrl}), patch("db.config.connect") as connectMock:
            with self.assertRaises(ValueError) as errorContext:
                getConn()
            self.assertNotIn("senhaPrivada", str(errorContext.exception))
            connectMock.assert_not_called()


if __name__ == "__main__":
    unittest.main()
