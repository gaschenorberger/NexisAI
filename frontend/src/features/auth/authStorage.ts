import type { AuthSession } from '../../services/api';

const sessionKey = 'nexisAuthSession';

export const saveAuthSession = (session: AuthSession) => {
  localStorage.setItem(sessionKey, JSON.stringify(session));
};

export const getAuthSession = (): AuthSession | null => {
  const storedSession = localStorage.getItem(sessionKey);
  if (!storedSession) return null;

  try {
    return JSON.parse(storedSession) as AuthSession;
  } catch {
    localStorage.removeItem(sessionKey);
    return null;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(sessionKey);
};
