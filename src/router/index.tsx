import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@pages/Home/page';
import LoginPage from '@pages/Login/page';
import Root from './Root';

const webPath = {
  login: () => '/login',
};

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    path: webPath.login(),
    children: [{ path: '', element: <LoginPage /> }],
  },
];

export const router = createBrowserRouter(routes);
