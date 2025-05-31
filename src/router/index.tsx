import { createBrowserRouter } from 'react-router-dom';
// import HomePage from '@pages/Home/page';
import LoginPage from '@pages/Login/page';
import Root from './Root';
import MemoPage from '@pages/Memo/page';
import KakaoCallback from '@pages/Oauth/KakaoCallback';
import IndexPage from '@pages/Index/page';

export const webPath = {
  root: () => '/',
  index: () => '/index',
  login: () => '/login',
  memo: () => '/memo',
};

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  { path: webPath.root(), element: <Root /> },
  { path: webPath.index(), element: <IndexPage /> },
  { path: webPath.login(), element: <LoginPage /> },
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/memo', element: <MemoPage /> },
      { path: '/login/oauth/callback/kakao', element: <KakaoCallback /> },
      // { path: 'home', element: <HomePage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
