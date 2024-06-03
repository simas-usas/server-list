import { createContext, useContext, useState } from 'react';
import { AuthCredentials } from '#types';
import { fetchToken } from '#api/auth';
import { deleteAuthToken, getAuthToken } from '#lib/cookies';
import { useMutation } from '@tanstack/react-query';

interface AuthContext {
  token?: string | null;
  getToken: (props: AuthCredentials) => Promise<void> | undefined;
  clearToken: () => Promise<void> | undefined;
  isPending: boolean;
}

const AuthContext = createContext<AuthContext>({
  token: 'test',
  clearToken: () => undefined,
  getToken: () => undefined,
  isPending: false,
});

const getExpiryDate = (): string => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1);
  return expiryDate.toUTCString();
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const { mutateAsync, isPending } = useMutation({
    mutationFn: fetchToken,
    onSuccess: (data) => {
      try {
        const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `token=${
          data.token
        };${secureFlag}; HttpOnly; SameSite=Strict; expires=${getExpiryDate()}; path=/`;
        setToken(data.token);
      } catch (error) {
        console.error('Error creating auth token cookie:', error);
      }
    },
  });

  const getToken = async (props: AuthCredentials) => {
    await mutateAsync(props);
  };

  const clearToken = async () => {
    deleteAuthToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        getToken,
        clearToken,
        isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
