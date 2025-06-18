import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppleSVG from '@assets/Login/apple.svg?react';
import GoogleSVG from '@assets/Login/google.svg?react';
import KakaoSVG from '@assets/Login/kakao.svg?react';
import NaverSVG from '@assets/Login/naver.svg?react';
import LogoPNG from '@assets/Logo.png';
import {
  LoginPageContainer,
  LoginPageLayout,
  LoginPageRecentSocialLoginBadge,
  LoginPageSocialLoginButton,
  LoginPageSocialLoginButtonContainer,
  LoginPageSocialLoginContainer,
  LoginPageSocialLoginTitle,
  LoginPageTitleContainer,
} from './LoginPage.style';

declare global {
  interface Window {
    Kakao: any;
  }
}

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

const loginMethod = [
  {
    key: 'kakao',
    loginMsg: '카카오톡으로 계속하기',
    LogoSVG: KakaoSVG,
    bgColor: '#FFE617',
    textColor: '#000',
    borderColor: 'transparent',
    onClick: handleKakaoLogin,
  },
  {
    key: 'naver',
    loginMsg: '네이버로 계속하기',
    LogoSVG: NaverSVG,
    bgColor: '#00C73C',
    textColor: '#FFF',
    borderColor: 'transparent',
    onClick: handleNaverLogin,
  },
  {
    key: 'google',
    loginMsg: '구글로 계속하기',
    LogoSVG: GoogleSVG,
    bgColor: '#FFFFFF',
    textColor: '#000',
    borderColor: '#E0E0E2',
    onClick: handleGoogleLogin,
  },
  {
    key: 'apple',
    loginMsg: 'Apple로 계속하기',
    LogoSVG: AppleSVG,
    bgColor: '#000000',
    textColor: '#FFF',
    borderColor: 'transparent',
    onClick: handleAppleLogin,
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const lastLogin = localStorage.getItem('lastLoginProvider');

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_SDK_KEY);
    }
  }, []);

  return (
    <LoginPageLayout>
      <LoginPageContainer>
        <button
          style={{ color: 'black' }}
          onClick={() => {
            localStorage.setItem('accessToken', 'masetermasterjugger123123123!');
            navigate('/memo');
          }}
        >
          TEST 로그인
        </button>
        <LoginPageTitleContainer>
          빠르게 '톡' 남기고 편하게 정리하는,
          <img src={LogoPNG} />
        </LoginPageTitleContainer>
        <LoginPageSocialLoginContainer>
          <LoginPageSocialLoginTitle>간편 로그인</LoginPageSocialLoginTitle>
          <LoginPageSocialLoginButtonContainer>
            {loginMethod.map((method) => (
              <LoginPageSocialLoginButton
                textColor={method.textColor}
                bgColor={method.bgColor}
                borderColor={method.borderColor}
                onClick={method.onClick}
              >
                <method.LogoSVG />
                {method.loginMsg}
                {lastLogin === method.key && (
                  <LoginPageRecentSocialLoginBadge>최근 로그인</LoginPageRecentSocialLoginBadge>
                )}
              </LoginPageSocialLoginButton>
            ))}
          </LoginPageSocialLoginButtonContainer>
        </LoginPageSocialLoginContainer>
        <LoginPageSocialLoginButtonContainer></LoginPageSocialLoginButtonContainer>
      </LoginPageContainer>
    </LoginPageLayout>
  );
};

export default LoginPage;
