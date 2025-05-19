import { Outlet, ScrollRestoration } from 'react-router-dom';
import Mainlayout from '@layout/MainLayout/MainLayout';

const Root = () => {
  return (
    <Mainlayout>
      <Outlet />
      <ScrollRestoration />
    </Mainlayout>
  );
};

export default Root;
