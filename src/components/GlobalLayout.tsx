import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useAuthContext } from '../contexts/AuthContext';
import Button from './Button';
import { Logo } from '../assets';

export const GlobalLayout = () => {
  const { pathname } = useLocation();
  const { clearToken } = useAuthContext();

  return (
    <div className="bg-default bg-cover">
      {pathname !== '/login' && (
        <Header>
          <Logo className="fill-secondary" />
          <Button variant="secondary" onClick={() => clearToken()}>
            Sign out
          </Button>
        </Header>
      )}
      <div className="flex items-center justify-center h-screen w-screen overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
};
