import Kakao from '@assets/Login/kakao.svg?react';
import Naver from '@assets/Login/naver.svg?react';
import Google from '@assets/Login/google.svg?react';
import Apple from '@assets/Login/apple.svg?react';
import LoginLogo from '@assets/Login/loginLogo.svg?react';
import { Button, Container, Description, Divider } from './LoginPage.style';

const LoginPage = () => {
  return (
    <Container>
      <Description>빠르게 '딱' 받기고 편하게 정리하는,</Description>
      <LoginLogo />
      <Divider>
        <span>간편 로그인</span>
      </Divider>
      <Button bgColor="#FEE500">
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
