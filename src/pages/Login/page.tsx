import Kakao from '@assets/Login/kakao.svg?react';
import Naver from '@assets/Login/naver.svg?react';
import Google from '@assets/Login/google.svg?react';
import Apple from '@assets/Login/apple.svg?react';
import LoginLogo from '@assets/Login/loginLogo.svg?react';
import { Button, Container, Description, Divider } from './LoginPage.style';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    Kakao: any;
  }
}
const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_SDK_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <Container>
      <button
        onClick={() => {
          localStorage.setItem('accessToken', 'testAccessToken');
          localStorage.setItem('username', 'testUser');
          navigate('/');
        }}
      >
        TEST 로그인
      </button>
      <Description>빠르게 '딱' 받기고 편하게 정리하는,</Description>
      <LoginLogo />
      <Divider>
        <span>간편 로그인</span>
      </Divider>
      <Button bgColor="#FEE500" onClick={handleKakaoLogin}>
        <Kakao />
        카카오톡으로 계속하기
      </Button>
      <Button bgColor="#1EC800" textColor="#fff">
        <Naver />
        네이버로 계속하기
      </Button>
      <Button bgColor="#fff" textColor="#000" style={{ border: '1px solid #ddd' }}>
        <Google />
        구글로 계속하기
      </Button>
      <Button bgColor="#000" textColor="#fff">
        <Apple />
        Apple로 계속하기
      </Button>
    </Container>
  );
};

export default LoginPage;
