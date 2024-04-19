import { createContext, useContext, useState } from 'react';
import { AuthCredentials } from '../types';
import { fetchToken } from '../api/auth';

type AuthContext = {
  token?: string;
  getToken: (props: AuthCredentials) => Promise<void> | undefined;
  // clearToken(): void;
};

const AuthContext = createContext<AuthContext>({
  token: 'test',
  // clearToken: () => undefined,
  getToken: () => undefined,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') ?? '');

  const getToken = async (props: AuthCredentials) => {
    const data = await fetchToken(props);
    localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
