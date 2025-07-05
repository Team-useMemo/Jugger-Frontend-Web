import { useEffect, useState } from 'react';

const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLogin(!!token);
  }, []);

  return isLogin;
};

export default useIsLogin;
