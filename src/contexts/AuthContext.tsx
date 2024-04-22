import { createContext, useContext, useState } from 'react';
import { AuthCredentials } from '#types';
import { fetchToken } from '#api/auth';
import { deleteAuthToken, getAuthToken } from '#lib/cookies';
import { useMutation } from '@tanstack/react-query';

type AuthContext = {
  token?: string | null;
  getToken: (props: AuthCredentials) => Promise<void> | undefined;
  clearToken: () => Promise<void> | undefined;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContext>({
  token: 'test',
  clearToken: () => undefined,
  getToken: () => undefined,
  isLoading: false,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: fetchToken,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      document.cookie = `token=${data.token}`;
      setToken(data.token);
      setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
