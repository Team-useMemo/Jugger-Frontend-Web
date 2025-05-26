import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import useWindowSize from '@hooks/useWindowSize';
import { StyledMain, StyledMainlayout } from '@layout/MainLayout/MainLayout.Style';
import { LogoImage } from '@layout/SideBar/SideBar.style';
import IndexHeader from '@components/Index/Header/Header';
import IndexFirstSection from '@components/Index/Section/First/FirstSection';
import IndexSecondSection from '@components/Index/Section/Second/SecondSection';
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

const Index3ComponentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  zIndex: 10,
  marginTop: '100px',
  alignItems: 'center',

  [media[480]]: {
    marginTop: '64px',
  },
});

const Index3Component1Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1280px',
  whiteSpace: 'nowrap',
  padding: '64px 32px',
  boxSizing: 'border-box',
  overflow: 'hidden',

  [media[480]]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 24px',
    gap: '32px',
  },
});

const Index3Component1TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '20px',
  width: '360px',
  flexShrink: '0',

  ['p']: {
    textAlign: 'left',
    ...theme.font.display2.bold,
    color: theme.color.label.alternative,
    margin: '0',

    ['span']: {
      color: theme.color.label.normal,
    },
  },

  [media[480]]: {
    alignItems: 'center',
    gap: '12px',

    ['p']: {
      textAlign: 'center',
      ...theme.font.title3.bold,
    },
  },
});

const Index3Component1TitleButton = styled.div({
  ...theme.font.title1.bold,
  color: theme.color.label.inverse,
  background: theme.palette.blue[50],
  width: '52px',
  height: '52px',
  alignContent: 'center',
  borderRadius: theme.radius[8],

  [media[480]]: {
    ...theme.font.body1normal.semibold,
    width: '32px',
    height: '32px',
  },
});

const Index3Component2Container = styled.div({
  width: '100%',
  display: 'flex',
  // background: theme.palette.blue[99],
  background: `radial-gradient(ellipse 50% 80% at 50% 100%,${theme.palette.blue[90]} 25%, transparent), ${theme.palette.blue[99]}`,
  justifyContent: 'center',
});

const Index3Component2Content = styled.div({
  maxWidth: '1440px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '32px',
  boxSizing: 'border-box',
  alignItems: 'center',
  overflow: 'hidden',
});

const Index3Component2TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',

  ['p']: {
    ...theme.font.display2.bold,
    color: theme.color.label.normal,
    margin: '0',

    ['span']: {
      color: theme.color.primary.normal,
    },
  },

  [media[480]]: {
    alignItems: 'center',
    gap: '8px',

    ['p']: {
      textAlign: 'center',
      ...theme.font.title3.bold,
    },
  },
});

const Index3Component2Index = styled.div({
  ...theme.font.title1.bold,
  color: theme.color.label.normal,
  borderBottom: `4px solid ${theme.color.primary.normal}`,
  lineHeight: '1',

  [media[480]]: {
    ...theme.font.body1normal.semibold,
    lineHeight: '1',
    borderBottom: `3px solid ${theme.color.primary.normal}`,
  },
});

const Index3Component2ImageContainer = styled.div({
  display: 'flex',
  maxWidth: '1200px',
  width: '100%',
  maxHeight: '720px',
  justifyContent: 'space-between',
  paddingBottom: '48px',
  gap: '20px',

  ['img']: {
    width: '100%',
    boxShadow: '0px 4px 32px 0px #0000000F',
    borderRadius: theme.radius[16],
  },

  [media[480]]: {
    gap: '4px',
    paddingBottom: '0',

    ['img']: {
      borderRadius: theme.radius[6],
    },
  },
});

const Index3Component3Container = styled.div({
  width: '100%',
  display: 'flex',
  background: theme.color.background.normal,
  justifyContent: 'center',
});

const Index3Component3Content = styled.div({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  width: ' 100%',
  maxWidth: '1440px',
  padding: '0 32px',
  boxSizing: 'border-box',

  [media[480]]: {
    flexDirection: 'column-reverse',
  },
});

const Index3Component3TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '20px',
  margin: '0 auto',

  ['p']: {
    ...theme.font.display2.bold,
    color: theme.color.label.normal,
    margin: '0',
    textAlign: 'left',
    whiteSpace: 'nowrap',

    ['span']: {
      color: theme.color.primary.normal,
    },
  },

  [media[480]]: {
    padding: '32px 0',
    alignItems: 'center',
    gap: '6px',

    ['p']: {
      textAlign: 'center',
      ...theme.font.title3.bold,
    },
  },
});

const Index3Component3Index = styled.div({
  display: 'flex',
  flexDirection: 'column',
  ...theme.font.title1.bold,
  color: theme.color.primary.normal,
  margin: '0',
  alignItems: 'center',

  ['span']: {
    width: '8px',
    aspectRatio: '1 / 1',
    borderRadius: theme.radius.full,
    background: theme.palette.blue[50],
  },

  [media[480]]: {
    ...theme.font.body1normal.semibold,

    ['span']: {
      width: '4px',
    },
  },
});

const Index3Component = ({ width }: { width: number }) => {
  return (
    <Index3ComponentContainer>
      <Index3Component1Container>
        <Index3Component1TitleContainer>
          <Index3Component1TitleButton>1</Index3Component1TitleButton>
          <p>
            <span>대화하듯 메모</span>를<br />
            기록하고 관리해요
          </p>
        </Index3Component1TitleContainer>
        {width >= 480 ? (
          <motion.div
            style={{
              width: '800px',
              alignContent: 'center',
            }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0 }}
          >
            <img
              src={ChatWebPng}
              style={{
                width: '100%',
                borderRadius: theme.radius[16],
                boxShadow:
                  '0px 0px 2.28px 0px #0000000D, 0px 1.14px 36.44px 0px #0000000D, 0px 5.69px 13.67px 0px #0000000D',
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            style={{
              height: '420px',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <img
              src={ChatMobilePNG}
              style={{
                left: '50%',
                position: 'absolute',
                width: '75%',
                boxShadow: theme.shadow.emphasize,
                borderRadius: theme.radius[24],
                transform: 'translate(-50%, 0)',
              }}
            />
          </motion.div>
        )}
      </Index3Component1Container>
      <Index3Component2Container>
        <Index3Component2Content>
          <Index3Component2TitleContainer>
            <Index3Component2Index>2</Index3Component2Index>
            <p>
              <span>카테고리를 설정</span>하고
              <br />
              쉽게 <span>모아 확인해요</span>
            </p>
          </Index3Component2TitleContainer>
          <Index3Component2ImageContainer>
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'end',
              }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: -0.2, duration: 0.5 }}
              viewport={{ once: false, amount: 0 }}
            >
              <div
                style={{
                  width: '40%',
                  aspectRatio: '1 / 1',
                  marginRight: '5%',
                }}
              >
                <PigTailSVG style={{ height: '100%', width: '100%' }} />
              </div>
              <img src={CategoryModal1Png} />
            </motion.div>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'end' }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: -0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={CategoryModal2Png} />
              <div
                style={{
                  width: '30%',
                  aspectRatio: '1 / 1',
                  marginBottom: '5%',
                }}
              >
                <UpRightSVG style={{ width: '100%', height: '100%' }} />
              </div>
            </motion.div>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={CategoryModal3Png} />
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3 / 2',
                }}
              ></div>
            </motion.div>
          </Index3Component2ImageContainer>
        </Index3Component2Content>
      </Index3Component2Container>
      <Index3Component3Container>
        <Index3Component3Content>
          {width >= 480 ? (
            <motion.div
              style={{
                position: 'relative',
                width: '600px',
                height: '550px',
              }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img
                src={Modal1Png}
                style={{
                  width: '63%',
                  borderRadius: theme.radius[12],
                  boxShadow:
                    '0px 0px 16.33px 0px #0000000D, 0px 1.09px 21.77px 0px #0000000D, 0px 5.44px 21.77px 0px #0000000D',
                  top: '50%',
                  transform: 'translate(0, -73%)',
                  position: 'absolute',
                  left: '0',
                }}
              />
              <img
                src={Modal2Png}
                style={{
                  width: '63%',
                  borderRadius: theme.radius[12],
                  boxShadow:
                    '0px 0px 16.33px 0px #0000000D, 0px 1.09px 21.77px 0px #0000000D, 0px 5.44px 21.77px 0px #0000000D',
                  top: '50%',
                  transform: 'translate(0, -28%)',
                  position: 'absolute',
                  right: '0',
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
              }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img
                src={MobileModal1Png}
                style={{
                  position: 'absolute',
                  left: '5%',
                  boxShadow: theme.shadow.emphasize,
                  borderRadius: theme.radius[12],
                }}
              />
              <img
                src={MobileModal2Png}
                style={{
                  position: 'absolute',
                  right: '5%',
                  bottom: '-10%',
                  boxShadow: theme.shadow.emphasize,
                  borderRadius: theme.radius[12],
                }}
              />
            </motion.div>
          )}
          <Index3Component3TitleContainer>
            <Index3Component3Index>
              <span />3
            </Index3Component3Index>
            <p>
              {width >= 480 ? (
                <>
                  <span>링크</span>와 <span>사진</span>을 간편하게
                  <br />
                  모아볼 수 있어요
                </>
              ) : (
                <>
                  <span>링크</span>와 <span>사진</span>을<br />
                  간편하게 모아볼 수 있어요
                </>
              )}
            </p>
          </Index3Component3TitleContainer>
        </Index3Component3Content>
      </Index3Component3Container>
    </Index3ComponentContainer>
  );
};

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

const TTTT = styled.p(
  ({ strongColor }: { strongColor: 'black' | 'blue' }) => ({
    color: theme.color.label[strongColor == 'black' ? 'alternative' : 'normal'],
    ['b']: {
      color: strongColor == 'black' ? theme.color.label.normal : theme.color.primary.normal,
    },
  }),
  {},
);

const TTTTT = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '&::before': {
    content: '""',
    padding: '4px',
    background: 'black',
  },
});

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
        <TTTTT>asd</TTTTT>
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
        {/* <picture style={{}}>
          <source media="(max-width: 480px)" srcSet={ChatMobilePNG} />
          <img src={ChatWebPng} style={{ width: '' }} />
        </picture> */}
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
              // maxWidth: '1440px',
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
              <Index3Component width={width} />
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
