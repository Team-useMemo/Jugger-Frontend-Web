import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Mainlayout from '@layout/MainLayout/MainLayout';

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/memo');
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
