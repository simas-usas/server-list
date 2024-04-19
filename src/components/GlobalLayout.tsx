import { Outlet } from 'react-router-dom';

export const GlobalLayout = () => {
  return (
    <div className="flex items-center justify-center w-screen">
      <Outlet />
    </div>
  );
};
