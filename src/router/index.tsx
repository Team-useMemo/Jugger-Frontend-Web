import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/page';
import LoginPage from '../pages/Login/page';

export const webPath = {
  home: () => '/',
  login: () => '/login',
};

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  {
    path: '/',
    // element: <HomePage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: webPath.login(),
        children: [{ path: '', element: <LoginPage /> }],
      },
    ],
  },
  {
    // path: webPath.usage(),
    // element: <Usage />,
  },
];

export const router = createBrowserRouter(routes);
