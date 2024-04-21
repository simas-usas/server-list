import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';
import { useAuthContext } from '../contexts/AuthContext';
import Button from './Button';
import { Logo } from '../assets';
import Spinner from './Spinner';

export const GlobalLayout = () => {
  const { pathname } = useLocation();
  const { clearToken } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-default bg-cover">
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
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};
