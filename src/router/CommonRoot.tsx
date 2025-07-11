import { Outlet, ScrollRestoration } from 'react-router-dom';
import CommonLayout from '@layout/Common/CommonLayout';

const CommonRoot = () => {
  return (
    <CommonLayout>
      <Outlet />
      <ScrollRestoration />
    </CommonLayout>
  );
};

export default CommonRoot;
