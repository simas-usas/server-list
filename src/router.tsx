import { Navigate, createBrowserRouter } from 'react-router-dom';
import ServerList from './pages/ServerList';
import Login from './pages/Login';
import { GlobalLayout } from './components/GlobalLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

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
            element: <ServerList />,
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
