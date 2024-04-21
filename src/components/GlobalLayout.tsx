import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useAuthContext } from '../contexts/AuthContext';
import Button from './Button';
import { Logo } from '../assets';

export const GlobalLayout = () => {
  const { pathname } = useLocation();
  const { clearToken } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen bg-default bg-cover">
      {pathname !== '/login' && (
        <Header>
          <Logo className="fill-secondary" />
          <Button variant="secondary" onClick={() => clearToken()}>
            Sign out
          </Button>
        </Header>
      )}
      <div className="flex flex-grow items-center justify-center m-2">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
