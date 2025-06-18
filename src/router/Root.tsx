import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import Mainlayout from '@layout/MainLayout/MainLayout';
import { webPath } from '.';

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const currentPath = window.location.pathname;

    if (currentPath.startsWith('/oauth/callback/kakao') || currentPath.startsWith('/login')) {
      return; // 카카오 콜백 페이지는 리다이렉트 건너뜀
    }

    if (!token) {
      navigate(webPath.index(), { replace: true });
    } else if (currentPath == '/') {
      navigate(webPath.memo(), { replace: true });
    }
  }, [navigate]);

  return (
    <Mainlayout>
      <Outlet />
      <ScrollRestoration />
    </Mainlayout>
  );
};

export default Root;
