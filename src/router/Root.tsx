import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Mainlayout from '@layout/MainLayout/MainLayout';

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log('username', username);
    const currentPath = window.location.pathname;
    console.log(currentPath);
    if (currentPath.startsWith('/oauth/callback/kakao') || currentPath.startsWith('/login')) {
      return; // 카카오 콜백 페이지는 리다이렉트 건너뜀
    }
    if (username) {
      navigate(`/${username}`);
    } else {
      navigate('/login');
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
