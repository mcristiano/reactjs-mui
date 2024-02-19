import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  isAuthenticated: boolean;
  logout(): void;
  login(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem('APP_ACCESS_TOKEN');
    if (token) {
      setAccessToken(JSON.parse(token));
    } else {
      setAccessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    }
    localStorage.setItem('APP_ACCESS_TOKEN', JSON.stringify(result.access_token));
    setAccessToken(result.access_token);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('APP_ACCESS_TOKEN');
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout: handleLogout, login: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
