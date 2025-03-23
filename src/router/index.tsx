import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@pages/Home/page';
import LoginPage from '@pages/Login/page';
import Root from './Root';
import MemoPage from '@pages/Memo/page';

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
        path: '/home',
        element: <HomePage />,
      },
      {
        path: ':username',
        element: <MemoPage />,
      },
    ],
  },
  {
    path: webPath.login(),
    children: [{ path: '', element: <LoginPage /> }],
  },
];

export const router = createBrowserRouter(routes);
