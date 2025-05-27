import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useWindowSize from '@hooks/useWindowSize';
import { StyledMain, StyledMainlayout } from '@layout/MainLayout/MainLayout.Style';
import { LogoImage } from '@layout/SideBar/SideBar.style';
import IndexHeader from '@components/Index/Header/Header';
import IndexFirstSection from '@components/Index/Section/First/FirstSection';
import IndexSecondSection from '@components/Index/Section/Second/SecondSection';
import IndexThirdSection from '@components/Index/Section/Third/ThirdSection';
import { media, theme } from '@styles/theme';
import LogoPNG from '@assets/Logo.png';
import CategoryModal1Png from '@assets/landing/CategoryModal1.png';
import CategoryModal2Png from '@assets/landing/CategoryModal2.png';
import CategoryModal3Png from '@assets/landing/CategoryModal3.png';
import ChatMobilePNG from '@assets/landing/ChatMobile.png';
import ChatWebPng from '@assets/landing/ChatWeb.png';
import GraphicPNG from '@assets/landing/Graphic.png';
import MobileModal1Png from '@assets/landing/MobileModal1.png';
import MobileModal2Png from '@assets/landing/MobileModal2.png';
import EnvelopeSVG from '@assets/landing/envelope.svg?react';
import InstagramSVG from '@assets/landing/instagram.svg?react';
import LinkedInSVG from '@assets/landing/linkedin.svg?react';
import Modal1Png from '@assets/landing/modal1.png';
import Modal2Png from '@assets/landing/modal2.png';
import PencilSVG from '@assets/landing/pencil.svg?react';
import PigTailSVG from '@assets/landing/pigTail.svg?react';
import ProfileCheerSVG from '@assets/landing/profilecheer.svg?react';
import UpRightSVG from '@assets/landing/upRight.svg?react';

const JuggerButton = styled.button(
  ({ color, size }: { color: 'primary' | 'secondary'; size: 'small' | 'medium' | 'large' }) => ({
    ...(color == 'primary'
      ? {
          background: theme.color.primary.normal,
          color: theme.color.label.inverse,
          ['svg']: {
            stroke: theme.palette.common[100],
          },
        }
      : {
          background: theme.palette.coolneutral[98],
          color: theme.color.label.normal,
          ['svg']: {
            stroke: theme.color.label.normal,
          },
        }),
    ...(size == 'small'
      ? {
          ...theme.font.body1normal.medium,
          borderRadius: theme.radius[4],
          padding: '8px 16px',
          minWidth: '60px',
          gap: '4px',
          ['svg']: {
            height: '16px',
            width: '16px',
          },
        }
      : size == 'medium'
        ? {
            ...theme.font.headline1.medium,
            borderRadius: theme.radius[6],
            padding: '10px 16px',
            minWidth: '80px',
            gap: '6px',
            ['svg']: {
              height: '20px',
              width: '20px',
            },
          }
        : {
            ...theme.font.heading1.medium,
            borderRadius: theme.radius[8],
            padding: '12px 24px',
            minWidth: '120px',
            gap: '8px',
            ['svg']: {
              height: '20px',
              width: '20px',
            },
          }),
  }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',

    [':focus']: {
      outline: 'none',
    },

    [':disabled']: {
      background: theme.color.label.disable,
      color: theme.color.label.assistive,
      ['svg']: {
        stroke: theme.color.label.assistive,
      },
    },
  },
);

const Index4ComponentContainer = styled.div({
  padding: '120px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '56px',

  [media[480]]: {
    padding: '42px 0',
    gap: '20px',
  },
});

const Index4ComponentContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',

  ['img']: {
    width: '56px',
    aspectRatio: '1 / 1',
  },

  [media[480]]: {
    gap: '12px',

    ['img']: {
      width: '24px',
    },
  },
});

const Index4ComponentTitle = styled.p({
  ...theme.font.display1.bold,
  margin: 0,
  backgroundImage: `linear-gradient(136.66deg, ${theme.palette.blue[20]} 37.16%, ${theme.palette.blue[50]} 57.94%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  [media[480]]: {
    ...theme.font.title3.bold,
  },
});

const Index4Component = ({ width }: { width: number }) => {
  return (
    <Index4ComponentContainer>
      <Index4ComponentContent>
        <img src={GraphicPNG} />
        <Index4ComponentTitle>
          새로운 메모,
          <br />
          직접 경험해보세요!
        </Index4ComponentTitle>
      </Index4ComponentContent>
      <JuggerButton color="primary" size={width >= 480 ? 'large' : 'small'}>
        바로 시작하기
        <b>asd</b>
      </JuggerButton>
    </Index4ComponentContainer>
  );
};

const IndexFooterContainer = styled.div({
  background: theme.palette.blue[20],
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '36px',
  padding: '72px',
  boxSizing: 'border-box',

  ...theme.font.body1normal.medium,
  color: theme.color.label.inverse,

  [media[480]]: {
    padding: '32px 20px',
    gap: '16px',

    ...theme.font.caption1.medium,

    ['img']: {
      width: '88px',
      height: '22px',
    },
  },
});

const IndexFooterContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  [media[480]]: {
    gap: '12px',
  },
});

const IndexFooterButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',

  [media[480]]: {
    gap: '8px',
  },
});

const IndexFooterIconContainer = styled.div({
  display: 'flex',
  gap: '24px',

  [media[480]]: {
    gap: '12px',
  },
});

const IndexFooter = ({ width }: { width: number }) => {
  return (
    <IndexFooterContainer>
      <LogoImage src={LogoPNG} />
      <IndexFooterContent>
        <IndexFooterButtonContainer>
          <JuggerButton color="secondary" size={width >= 480 ? 'large' : 'small'}>
            <PencilSVG />
            의견 남기기
          </JuggerButton>
          <JuggerButton color="secondary" size={width >= 480 ? 'large' : 'small'}>
            <EnvelopeSVG />
            비즈니스 제안
          </JuggerButton>
          <JuggerButton color="secondary" size={width >= 480 ? 'large' : 'small'}>
            <ProfileCheerSVG />
            만든이들
          </JuggerButton>
        </IndexFooterButtonContainer>
        <IndexFooterIconContainer>
          <InstagramSVG />
          <LinkedInSVG />
        </IndexFooterIconContainer>
      </IndexFooterContent>
      Jugger All rights reserved
    </IndexFooterContainer>
  );
};

const IndexPage = () => {
  const width = useWindowSize();

  return (
    <StyledMainlayout>
      <StyledMain>
        <IndexHeader />
        <div
          style={{
            background: theme.color.background.alternative,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <IndexFirstSection />
              <IndexSecondSection />
              <IndexThirdSection />
              <Index4Component width={width} />
            </div>
          </div>
          <IndexFooter width={width} />
        </div>
      </StyledMain>
    </StyledMainlayout>
  );
};

export default IndexPage;
