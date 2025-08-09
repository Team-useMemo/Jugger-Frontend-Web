import { createBrowserRouter } from 'react-router-dom';
import IndexPage from '@pages/Index/page';
// import HomePage from '@pages/Home/page';
import LoginPage from '@pages/Login/page';
import MemoPage from '@pages/Memo/page';
import NoticePage from '@pages/Notice/page';
import Callback from '@pages/Oauth/Callback';
import RegisterPage from '@pages/Register/page';
import SettingPage from '@pages/Setting/page';
import CommonRoot from './CommonRoot';
import Root from './Root';

export const webPath = {
  root: () => '/',
  index: () => '/index',
  login: () => '/login',
  register: () => '/register',
  memo: () => '/memo',
  setting: () => '/setting',
  notice: () => '/notice',
};

const routes = [
  { path: '*', element: <div>404 Not Found</div> },
  { path: webPath.root(), element: <Root /> },
  { path: webPath.index(), element: <IndexPage /> },
  { path: webPath.login(), element: <LoginPage /> },
  { path: webPath.register(), element: <RegisterPage /> },
  {
    path: '/',
    element: <CommonRoot />,
    children: [
      { path: webPath.setting(), element: <SettingPage /> },
      { path: webPath.notice(), element: <NoticePage /> },
    ],
  },
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/memo', element: <MemoPage /> },
      { path: '/login/oauth/callback/kakao', element: <Callback /> },
      { path: '/login/oauth/callback/google', element: <Callback /> },
      { path: '/login/oauth/callback/naver', element: <Callback /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
