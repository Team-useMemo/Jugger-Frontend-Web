import { useEffect } from 'react';
import AppleSVG from '@assets/Login/apple.svg?react';
import GoogleSVG from '@assets/Login/google.svg?react';
import KakaoSVG from '@assets/Login/kakao.svg?react';
import NaverSVG from '@assets/Login/naver.svg?react';
import LogoSVG from '@assets/LogoTextFill.svg?react';
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
  const redirect_uri = `${window.location.origin}/login/oauth/callback/kakao`;
  console.log(redirect_uri);
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${redirect_uri}`;
  window.location.href = kakaoAuthUrl;
};

const handleNaverLogin = () => {
  localStorage.setItem('lastLoginProvider', 'naver');
  const redirect_uri = `${window.location.origin}/login/oauth/callback/naver`;
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_REST_API_KEY}&redirect_uri=${redirect_uri}`;
  window.location.href = naverAuthUrl;
};

const handleGoogleLogin = () => {
  localStorage.setItem('lastLoginProvider', 'google');
  const redirect_uri = `${window.location.origin}/login/oauth/callback/google`;
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
  window.location.href = googleAuthUrl;
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
    bgColor: 'transparent',
    textColor: 'normal',
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
  const lastLogin = localStorage.getItem('lastLoginProvider');

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_SDK_KEY);
    }
  }, []);

  return (
    <LoginPageLayout>
      <LoginPageContainer>
        <LoginPageTitleContainer>
          빠르게 '톡' 남기고 편하게 정리하는,
          <LogoSVG />
        </LoginPageTitleContainer>
        <LoginPageSocialLoginContainer>
          <LoginPageSocialLoginTitle>간편 로그인</LoginPageSocialLoginTitle>
          <LoginPageSocialLoginButtonContainer>
            {loginMethod.map(
              (method) =>
                method.key !== 'apple' && (
                  <LoginPageSocialLoginButton
                    textColor={method.textColor}
                    bgColor={method.bgColor}
                    borderColor={method.borderColor}
                    onClick={method.onClick}
                    key={method.key}
                  >
                    <method.LogoSVG />
                    <p>{method.loginMsg}</p>
                    {lastLogin === method.key && (
                      <LoginPageRecentSocialLoginBadge>최근 로그인</LoginPageRecentSocialLoginBadge>
                    )}
                  </LoginPageSocialLoginButton>
                ),
            )}
          </LoginPageSocialLoginButtonContainer>
        </LoginPageSocialLoginContainer>
        <LoginPageSocialLoginButtonContainer></LoginPageSocialLoginButtonContainer>
      </LoginPageContainer>
    </LoginPageLayout>
  );
};

export default LoginPage;
