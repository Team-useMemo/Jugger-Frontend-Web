import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Apple from '@assets/Login/apple.svg?react';
import Google from '@assets/Login/google.svg?react';
import Kakao from '@assets/Login/kakao.svg?react';
import LoginLogo from '@assets/Login/loginLogo.svg?react';
import Naver from '@assets/Login/naver.svg?react';
import { Button, Container, Description, Divider, RecentLoginBadge } from './LoginPage.style';

declare global {
  interface Window {
    Kakao: any;
  }
}
const LoginPage = () => {
  const navigate = useNavigate();
  const lastLogin = localStorage.getItem('lastLoginProvider');
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_SDK_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    localStorage.setItem('lastLoginProvider', 'kakao');
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  const handleNaverLogin = () => {
    localStorage.setItem('lastLoginProvider', 'naver');
  };

  const handleGoogleLogin = () => {
    localStorage.setItem('lastLoginProvider', 'google');
  };

  const handleAppleLogin = () => {
    localStorage.setItem('lastLoginProvider', 'apple');
  };

  return (
    <Container>
      <button
        style={{ color: 'black' }}
        onClick={() => {
          localStorage.setItem('accessToken', 'masetermasterjugger123123123!');
          navigate('/memo');
        }}
      >
        TEST 로그인
      </button>
      <Description>빠르게 '딱' 받기고 편하게 정리하는,</Description>
      <LoginLogo />
      <Divider>
        <span>간편 로그인</span>
      </Divider>
      <Button bgColor="#FFE617" onClick={handleKakaoLogin}>
        <Kakao />
        카카오톡으로 계속하기
        {lastLogin === 'kakao' && <RecentLoginBadge>최근 로그인</RecentLoginBadge>}
      </Button>
      <Button bgColor="#00C73C" textColor="#fff" onClick={handleNaverLogin}>
        <Naver />
        네이버로 계속하기
        {lastLogin === 'naver' && <RecentLoginBadge>최근 로그인</RecentLoginBadge>}
      </Button>
      <Button style={{ border: '1px solid #ddd' }} onClick={handleGoogleLogin}>
        <Google />
        구글로 계속하기
        {lastLogin === 'google' && <RecentLoginBadge>최근 로그인</RecentLoginBadge>}
      </Button>
      <Button bgColor="#000000" textColor="#fff" onClick={handleAppleLogin}>
        <Apple />
        Apple로 계속하기
        {lastLogin === 'apple' && <RecentLoginBadge >최근 로그인</RecentLoginBadge>}
      </Button>
    </Container >
  );
};

export default LoginPage;
