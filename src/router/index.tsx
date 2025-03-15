import { Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/page';
import LoginPage from '../pages/Login/page';
import Mainlayout from '@layout/MainLayout/MainLayout';

export const webPath = {
  login: () => '/login',
};

const Root = () => {
  return (
    <Mainlayout>
      <Outlet />
      <ScrollRestoration />
    </Mainlayout>
  );
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
      {
        path: webPath.login(),
        children: [{ path: '', element: <LoginPage /> }],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
