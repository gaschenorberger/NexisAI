import base64
import hashlib
import hmac
import json
import os
import time

import bcrypt

from backend.exceptions import AuthConfigurationError, InvalidTokenError

class Security:
    
    @staticmethod
    def hashPassword(senha: str):
        return bcrypt.hashpw(
            senha.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

    @staticmethod
    def verifyPassword(senha: str, senhaHash: str):
        try:
            return bcrypt.checkpw(
                senha.encode("utf-8"),
                senhaHash.encode("utf-8"),
            )
        except (TypeError, ValueError):
            return False

    @staticmethod
    def createAccessToken(userId: int):
        authSecret = Security.getAuthSecret()

        issuedAt = int(time.time())
        expiresAt = issuedAt + 8 * 60 * 60
        header = {"alg": "HS256", "typ": "JWT"}
        payload = {
            "sub": str(userId),
            "iat": issuedAt,
            "exp": expiresAt,
        }
        encodedHeader = Security.encodeTokenPart(header)
        encodedPayload = Security.encodeTokenPart(payload)
        unsignedToken = f"{encodedHeader}.{encodedPayload}"
        signature = hmac.new(
            authSecret.encode("utf-8"),
            unsignedToken.encode("ascii"),
            hashlib.sha256,
        ).digest()
        encodedSignature = base64.urlsafe_b64encode(signature).rstrip(b"=").decode("ascii")
        return f"{unsignedToken}.{encodedSignature}"

    @staticmethod
    def verifyAccessToken(accessToken: str):
        try:
            encodedHeader, encodedPayload, encodedSignature = accessToken.split(".")
            header = Security.decodeTokenPart(encodedHeader)
            payload = Security.decodeTokenPart(encodedPayload)
            if header != {"alg": "HS256", "typ": "JWT"}:
                raise InvalidTokenError

            unsignedToken = f"{encodedHeader}.{encodedPayload}"
            expectedSignature = hmac.new(
                Security.getAuthSecret().encode("utf-8"),
                unsignedToken.encode("ascii"),
                hashlib.sha256,
            ).digest()
            receivedSignature = Security.decodeBase64(encodedSignature)
            if not hmac.compare_digest(receivedSignature, expectedSignature):
                raise InvalidTokenError

            expiresAt = payload.get("exp")
            subject = payload.get("sub")
            if not isinstance(expiresAt, int) or expiresAt <= int(time.time()):
                raise InvalidTokenError
            if not isinstance(subject, str) or not subject.isdigit():
                raise InvalidTokenError
            return int(subject)
        except AuthConfigurationError:
            raise
        except (InvalidTokenError, ValueError, TypeError, KeyError, json.JSONDecodeError):
            raise InvalidTokenError from None

    @staticmethod
    def encodeTokenPart(value: dict):
        serializedValue = json.dumps(
            value,
            separators=(",", ":"),
            sort_keys=True,
        ).encode("utf-8")
        return base64.urlsafe_b64encode(serializedValue).rstrip(b"=").decode("ascii")

    @staticmethod
    def decodeTokenPart(encodedValue: str):
        return json.loads(Security.decodeBase64(encodedValue).decode("utf-8"))

    @staticmethod
    def decodeBase64(encodedValue: str):
        padding = "=" * (-len(encodedValue) % 4)
        return base64.b64decode(encodedValue + padding, altchars=b"-_", validate=True)

    @staticmethod
    def getAuthSecret():
        authSecret = os.getenv("authSecret", "").strip()
        if len(authSecret) < 32:
            raise AuthConfigurationError(
                "authSecret deve possuir pelo menos 32 caracteres."
            )
        return authSecret
