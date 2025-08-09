import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import CommonLayout from '@layout/Common/CommonLayout';
import { webPath } from '.';

const CommonRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate(webPath.index(), { replace: true });
    }
  }, [navigate]);

  return (
    <CommonLayout>
      <Outlet />
      <ScrollRestoration />
    </CommonLayout>
  );
};

export default CommonRoot;
