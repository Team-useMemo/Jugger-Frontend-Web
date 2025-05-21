import { createBrowserRouter } from 'react-router-dom';
// import HomePage from '@pages/Home/page';
import LoginPage from '@pages/Login/page';
import Root from './Root';
import MemoPage from '@pages/Memo/page';
import KakaoCallback from '@pages/Oauth/KakaoCallback';
import LandingPage from '@pages/Landing/page';

const webPath = {
  login: () => '/login',
};

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <LandingPage /> },
      // { path: 'home', element: <HomePage /> },
      { path: '/memo', element: <MemoPage /> },
      { path: '/login/oauth/callback/kakao', element: <KakaoCallback /> },
    ],
  },
  {
    path: webPath.login(),
    element: <LoginPage />,
  },
];

export const router = createBrowserRouter(routes);
