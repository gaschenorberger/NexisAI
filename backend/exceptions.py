class UserAlreadyExistsError(Exception):
    pass


class InvalidCredentialsError(Exception):
    pass


class InactiveUserError(Exception):
    pass


class AuthConfigurationError(Exception):
    pass


class InvalidTokenError(Exception):
    pass
