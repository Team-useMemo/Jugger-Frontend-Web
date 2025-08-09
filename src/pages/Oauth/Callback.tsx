import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { getPostAuthCode } from '@controllers/api';

const Callback = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const pathParts = window.location.pathname.split('/');
    const provider = pathParts[pathParts.length - 1]; // 'kakao', 'google', etc.
    localStorage.setItem('provider', provider);
    console.log(provider);
    console.log('인가 코드:', code);

    if (code && provider) {
      const postAuthCode = getPostAuthCode(provider);
      if (!postAuthCode) {
        console.error('지원하지 않는 소셜 로그인입니다:', provider);
        return;
      }

      postAuthCode(code)
        .then((data) => {
          console.log('백엔드 응답:', data);

          if (data.status === 'NEED_REGISTER') {
            navigate(webPath.register(), { state: { provider: provider, email: data.email } });
          } else {
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;
            const email = data.email;
            if (accessToken && refreshToken) {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              localStorage.setItem('email', email);
              navigate('/');
            }
          }
        })
        .catch((error) => {
          console.error('예상치 못한 로그인 실패:', error);
        });
    } else {
      console.error('인가 코드 또는 provider가 없습니다.');
    }
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default Callback;
