import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@styles/theme';
import AppleSVG from '@assets/Login/apple.svg?react';
import GoogleSVG from '@assets/Login/google.svg?react';
import KakaoSVG from '@assets/Login/kakao.svg?react';
import NaverSVG from '@assets/Login/naver.svg?react';
import LogoPNG from '@assets/Logo.png';

// import { Button, Container, Description, Divider, RecentLoginBadge } from './LoginPage.style';

declare global {
  interface Window {
    Kakao: any;
  }
}

const LoginPageLayout = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
  padding: '0 32px',
  background: theme.color.background.normal,
});

const LoginPageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '44px',
  width: '100%',
});

const LoginPageTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ...theme.font.body2normal.medium,
  color: theme.color.label.neutral,

  ['>img']: {
    width: '210px',
  },
});

const LoginPageSocialLoginContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  maxWidth: '320px',
  boxSizing: 'border-box',
});

const LoginPageSocialLoginTitle = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  ...theme.font.body2normal.medium,
  color: theme.color.label.alternative,

  ['::before,::after']: {
    content: '""',
    flexGrow: '1',
    borderBottom: `1px solid ${theme.color.line.normal}`,
  },
});

const LoginPageSocialLoginButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const LoginPageSocialLoginButton = styled.button(
  ({ textColor, bgColor, borderColor }: { textColor: string; bgColor: string; borderColor: string }) => ({
    color: textColor,
    background: bgColor,
    borderColor: borderColor,
  }),
  {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    padding: '16px',
    borderRadius: theme.radius[6],

    ...theme.font.body1normal.medium,

    position: 'relative',

    ['>svg']: {
      width: '24px',
      height: 'auto',
    },

    [':hover']: {
      opacity: '0.9',
    },

    [':focus']: {
      outline: 'none',
    },
  },
);

const RecentLoginBadge = styled.span({
  position: 'absolute',
  top: '-16px',
  left: '32px',
  background: theme.color.label.normal,

  ...theme.font.label1reading.medium,
  color: theme.color.label.inverse,
  borderRadius: theme.radius[32],
  padding: '4px 16px',
  zIndex: '1',

  ['&::after']: {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '0',
    height: '0',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid black',
  },
});

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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
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
                {lastLogin === method.key && <RecentLoginBadge>최근 로그인</RecentLoginBadge>}
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
