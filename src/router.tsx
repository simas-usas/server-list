import { Navigate, createBrowserRouter } from 'react-router-dom';
import Servers from '#pages/Servers/Servers';
import Login from '#pages/Login/Login';
import { GlobalLayout, ProtectedRoute } from '#components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="/servers" />,
          },
          {
            path: 'servers',
            element: <Servers />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
