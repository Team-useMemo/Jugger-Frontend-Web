import { webPath } from '@router/index';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = false;
    if (isAuth) {
      console.log('has been logined');
    } else {
      navigate(webPath.index());
    }
  }, []);

  return <div>asdsss</div>;
};

export default RootPage;
