export interface User {
  idUsuario: number;
  nome: string;
  email: string;
  perfil: 'admin' | 'gestor' | 'usuario';
  status: 'ativo' | 'inativo' | 'bloqueado';
}

export interface AuthSession {
  accessToken: string;
  tokenType: 'bearer';
  user: User;
}

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const apiBaseUrl = (configuredApiBaseUrl || '/api').replace(/\/$/, '');

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const getErrorMessage = (body: unknown) => {
  if (
    typeof body === 'object'
    && body !== null
    && 'detail' in body
    && typeof body.detail === 'string'
  ) {
    return body.detail;
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
};

export const apiRequest = async <ResponseType>(
  path: string,
  options: RequestInit = {},
) => {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor.', 0);
  }

  const body = await response.json().catch(() => null) as unknown;
  if (!response.ok) {
    throw new ApiError(getErrorMessage(body), response.status);
  }

  return body as ResponseType;
};
