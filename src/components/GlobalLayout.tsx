import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useAuthContext } from '../contexts/AuthContext';
import Button from './Button';

export const GlobalLayout = () => {
  const { pathname } = useLocation();
  const { clearToken } = useAuthContext();

  return (
    <div className=" bg-default bg-cover">
      {pathname !== '/login' && (
        <Header>
          <div>logo</div>
          <Button variant="secondary" onClick={() => clearToken()}>
            Sign out
          </Button>
        </Header>
      )}
      <div className="flex items-center justify-center h-screen w-screen">
        <Outlet />
      </div>
    </div>
  );
};
