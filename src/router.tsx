import { Navigate, createBrowserRouter } from 'react-router-dom';
import Servers from '#pages/Servers/Servers';
import Login from '#pages/Login/Login';
import { GlobalLayout, ProtectedRoute } from '#components';

// NOTE: Re-reouting to /servers with the idea that there would be additional pages later.
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
