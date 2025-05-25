import { StyledMain, StyledMainlayout } from '@layout/MainLayout/MainLayout.Style';
import LogoPNG from '@assets/Logo.png';
import { LogoImage } from '@layout/SideBar/SideBar.style';
import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

import WriteSVG from '@assets/landing/write.svg?react';
import StackSVG from '@assets/landing/stack.svg?react';
import TagSVG from '@assets/landing/tag.svg?react';
import PigTailSVG from '@assets/landing/pigTail.svg?react';
import UpRightSVG from '@assets/landing/upRight.svg?react';
import PencilSVG from '@assets/landing/pencil.svg?react';
import EnvelopeSVG from '@assets/landing/envelope.svg?react';
import ProfileCheerSVG from '@assets/landing/profilecheer.svg?react';

import InstagramSVG from '@assets/landing/instagram.svg?react';
import LinkedInSVG from '@assets/landing/linkedin.svg?react';

import GraphicPNG from '@assets/landing/Graphic.png';

import MacBookPng from '@assets/landing/DeviceMacbookAir.png';
import ChatWebPng from '@assets/landing/ChatWeb.png';
import Modal1Png from '@assets/landing/modal1.png';
import Modal2Png from '@assets/landing/modal2.png';
import CheckCategoryPng from '@assets/landing/CheckCategorypng.png';
import CategoryModal1Png from '@assets/landing/CategoryModal1.png';
import CategoryModal2Png from '@assets/landing/CategoryModal2.png';
import CategoryModal3Png from '@assets/landing/CategoryModal3.png';

import ChatMobilePNG from '@assets/landing/ChatMobile.png';
import ChatPNG from '@assets/landing/Chat.png';
import MobileModal1Png from '@assets/landing/MobileModal1.png';
import MobileModal2Png from '@assets/landing/MobileModal2.png';
import MobileCheckCategoryPng from '@assets/landing/CheckCategoryMobile.png';

import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';

import { motion } from 'framer-motion';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const IndexHeader = styled.div({
  display: 'flex',
  padding: '16px 56px',
  borderBottom: '1px solid #E0E0E2',
  justifyContent: 'space-between',
  boxSizing: 'border-box',

  ['>svg']: {
    display: 'none',
  },
  // [media[0]]: { ['>svg']: { display: 'block' } },
});

const LoginButton = styled.div({
  background: theme.color.primary.normal,
  padding: '12px 16px',
  color: theme.color.label.inverse,
  ...theme.font.body1normal.medium,
  borderRadius: theme.radius[4],
});

const EmptyBlock = styled.div(({ width, height }: { width?: string; height?: string }) => ({
  width: width ?? 0,
  height: height ?? 0,
}));

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

const Index1ComponentLayout = styled.div({
  width: '100%',
});

const ltor = keyframes({
  ['from']: {
    left: '-50%',
  },
  ['50%']: {
    left: '50%',
  },
  ['to']: {
    left: '-50%',
  },
});

const Index1ComponentContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '24px 32px',
  height: 'calc(100vh - 128px)',
  borderRadius: theme.radius[32],
  // background: `radial-gradient(ellipse 60% 125% at 80% 160%,${theme.palette.blue[30]} 25%, transparent), radial-gradient(ellipse 60% 125% at 20% 160%,${theme.palette.blue[50]} 25%, transparent), ${theme.color.background.normal}`,
  boxShadow: '0px 50px 50px 0px #00235B0D, 0px 1px 50px 0px #00235B08, 0px 5px 50px 0px #0000000D',
  boxSizing: 'border-box',
  overflow: 'hidden',
  position: 'relative',

  [media[480]]: {
    margin: '16px 20px',
    height: 'calc(100vh - 112px)',
    borderRadius: theme.radius[20],
  },
});

const Index1ComponentContent = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '48px 0',
  gap: '72px',
});

const Index1ComponentTitleContainer = styled.div({
  margin: 'auto 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  ['.title']: {
    ...theme.font.display1.bold,
    margin: 0,
    backgroundImage: `linear-gradient(115.01deg, ${theme.palette.blue[50]} 28.24%, ${theme.palette.blue[40]} 85.69%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  ['.desc']: {
    ...theme.font.title3.medium,
    color: theme.color.label.neutral,
    margin: 0,
  },

  [media[480]]: {
    ['.title']: {
      ...theme.font.title1.bold,
    },
    ['.desc']: {
      ...theme.font.body1reading.medium,
    },
  },
});

const Index1ComponentBackgroundRadial = styled.div(
  ({ idx }: { idx: number }) => ({
    background: `radial-gradient(ellipse 50% 120% at 50% 160%,${theme.palette.blue[idx == 1 ? 30 : idx == 2 ? 40 : 50]} 30%, transparent)`,
    animationDelay: `${-5 * idx}s`,
  }),
  {
    width: '100%',
    height: '100%',
    position: 'absolute',
    animationName: ltor,
    animationIterationCount: 'infinite',
    animationDuration: '15s',
    animationTimingFunction: 'ease-in-out',
  },
);

const Index1ComponentImageContainer = styled.div({});

const Index1Component = ({ width }: { width: number }) => {
  return (
    <Index1ComponentLayout>
      <Index1ComponentContainer>
        <Index1ComponentBackgroundRadial idx={0} />
        <Index1ComponentBackgroundRadial idx={1} />
        <Index1ComponentBackgroundRadial idx={2} />
        <Index1ComponentContent>
          <Index1ComponentTitleContainer>
            <LogoImage src={LogoPNG} style={{ width: '113px' }} />
            <EmptyBlock height={width >= 480 ? '32px' : '24px'} />
            <p className="title">
              빠르게 '톡' 남기고
              <br />
              편하게 정리하는
            </p>
            <EmptyBlock height={width >= 480 ? '12px' : '8px'} />
            <p className="desc">새로운 메모 서비스</p>
            <EmptyBlock height={width >= 480 ? '48px' : '20px'} />
            <JuggerButton color="primary" size={width >= 480 ? 'large' : 'small'}>
              바로 시작하기
            </JuggerButton>
          </Index1ComponentTitleContainer>
          <div>
            {width >= 480 ? (
              <img
                src={MacBookPng}
                style={{ width: '100%', maxWidth: '960px', padding: '0 32px', boxSizing: 'border-box' }}
              />
            ) : (
              <div style={{ height: '100%', position: 'relative' }}>
                <img
                  src={ChatMobilePNG}
                  style={{ width: '75%', boxShadow: theme.shadow.emphasize, borderRadius: theme.radius[24] }}
                />
              </div>
            )}
          </div>
        </Index1ComponentContent>
      </Index1ComponentContainer>
    </Index1ComponentLayout>
  );
};

const Index2ComponentContainer = styled.div({
  width: '100%',
  position: 'relative',
  alignItems: 'center',
  maxWidth: '1440px',
});

const Index2ComponentContent = styled.div({
  width: '100%',
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  padding: '0 32px',
  boxSizing: 'border-box',

  [media[480]]: {
    padding: '0 24px',
  },
});

const Index2ComponentTitle = styled.p({
  ...theme.font.display1.bold,
  color: theme.color.label.normal,
  margin: '96px 0 56px',
  whiteSpace: 'nowrap',

  [media[480]]: {
    ...theme.font.title1.bold,
    margin: '48px 0 24px',
  },
});

const Index2ComponentListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const Index2ComponentItemContainer = styled.div({
  display: 'flex',
  padding: '0 64px',
  background: theme.color.background.normal,
  boxShadow: '0px 4px 32px 0px #0000000D',
  borderRadius: theme.radius[24],
  justifyContent: 'space-between',
  overflow: 'hidden',

  [media[1024]]: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.radius[20],
    padding: '0',
  },
});

const Index2ComponentItemDesc = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'center',
  width: '360px',
  flexShrink: '0',
  padding: '48px 0',
  textAlign: 'left',

  [media[1024]]: {
    alignItems: 'center',
    textAlign: 'center',
  },

  [media[480]]: {
    gap: '8px',
    ['svg']: {
      width: '24px',
      height: '24px',
    },
  },
});

const Index2ComponentItemDescTitle = styled.p({
  ...theme.font.display2.bold,
  color: theme.color.label.normal,
  margin: '0',
  whiteSpace: 'wrap',
  wordBreak: 'keep-all',
  width: '320px',

  ['span']: {
    backgroundImage: `linear-gradient(96.33deg, ${theme.palette.blue[50]} 7.36%, ${theme.palette.blue[40]} 66.36%)`,

    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  [media[480]]: {
    ...theme.font.title3.bold,
  },
});

const Index2ComponentItemDescText = styled.p({
  ...theme.font.title3.medium,
  color: theme.color.label.alternative,
  margin: '0',
  whiteSpace: 'wrap',
  wordBreak: 'keep-all',
  // width: '280px',

  [media[480]]: {
    ...theme.font.caption1.medium,
  },
});

const Index2ComponentItemImageContainer = styled.div({
  position: 'relative',
  padding: '42px 0',
  maxWidth: '600px',
  width: '100%',
  alignContent: 'center',
  [media[480]]: {
    maxWidth: '100%',
    padding: '0',
    height: '360px',
  },
});

const Index2Component = ({ width }: { width: number }) => {
  const sectionList = [
    {
      icon: <WriteSVG />,
      title: {
        web: (
          <>
            생각을 쉽고 빠르게
            <br />
            <span>기록해요</span>
          </>
        ),
        mobile: (
          <>
            생각을 쉽고
            <br />
            빠르게 <span>기록해요</span>
          </>
        ),
      },
      desc: {
        web: (
          <>
            머릿속에 떠오른 생각, 중요한
            <br />
            아이디어를 놓치지 말고
            <br />
            채팅하듯 간편하게 메모해요.
          </>
        ),
        mobile: (
          <>
            머릿속에 떠오른 생각, 중요한 아이디어를
            <br />
            놓치지 말고 채팅하듯 간편하게 메모해요.
          </>
        ),
      },
      image: {
        web: (
          <img
            src={ChatWebPng}
            style={{
              width: '100%',
              borderRadius: theme.radius[12],
              boxShadow: '0px 0px 2px 0px #0000000D, 0px 1px 32px 0px #0000000D, 0px 5px 12px 0px #0000000D',
            }}
          />
        ),
        mobile: (
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <img
              src={ChatPNG}
              style={{
                width: '80%',
                boxShadow: theme.shadow.emphasize,
                borderRadius: theme.radius[16],
              }}
            />
          </div>
        ),
      },
    },
    {
      icon: <TagSVG />,
      title: {
        web: (
          <>
            링크와 사진을
            <br />
            깔끔하게 <span>정리해요</span>
          </>
        ),
        mobile: (
          <>
            링크와 사진을
            <br />
            깔끔하게 <span>정리해요</span>
          </>
        ),
      },
      desc: {
        web: (
          <>
            흥미로운 기사, 웹사이트, 영감을 주는
            <br />
            이미지 등 잃어버리기 쉬운 콘텐츠를
            <br />
            한곳에 모아보세요.
          </>
        ),
        mobile: (
          <>
            흥미로운 기사, 웹사이트, 영감을 주는 이미지 등
            <br />
            잃어버리기 쉬운 콘텐츠를 한곳에 모아보세요.
          </>
        ),
      },
      image: {
        web: (
          <div
            style={{
              width: '100%',
              aspectRatio: '600 / 400',
            }}
          >
            <img
              src={Modal1Png}
              style={{
                width: '63%',
                borderRadius: theme.radius[12],
                boxShadow:
                  '0px 0px 16.33px 0px #0000000D, 0px 1.09px 21.77px 0px #0000000D, 0px 5.44px 21.77px 0px #0000000D',
                top: '50%',
                transform: 'translate(0, -63%)',
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
                transform: 'translate(0, -30%)',
                position: 'absolute',
                right: '0',
              }}
            />
          </div>
        ),
        mobile: (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              // background: 'red',
            }}
          >
            <img
              src={MobileModal1Png}
              style={{
                position: 'absolute',
                left: '10%',
                boxShadow: theme.shadow.emphasize,
                borderRadius: theme.radius[12],
              }}
            />
            <img
              src={MobileModal2Png}
              style={{
                position: 'absolute',
                right: '10%',
                bottom: '-10%',
                boxShadow: theme.shadow.emphasize,
                borderRadius: theme.radius[12],
              }}
            />
          </div>
        ),
      },
    },
    {
      icon: <TagSVG />,
      title: {
        web: (
          <>
            내 생각을 카테고리로
            <br />
            명확하게 <span>분류해요</span>
          </>
        ),
        mobile: (
          <>
            내 생각을 카테고리로
            <br />
            명확하게 <span>분류해요</span>
          </>
        ),
      },
      desc: {
        web: (
          <>
            정리된 카테고리로
            <br />
            필요한 내용을 빠르게 찾고,
            <br />
            효율적으로 관리해요
          </>
        ),
        mobile: (
          <>
            정리된 카테고리로 필요한 내용을 빠르게 찾고,
            <br />
            효율적으로 관리해요
          </>
        ),
      },
      image: {
        web: (
          <img
            src={CheckCategoryPng}
            style={{
              width: '100%',
              borderRadius: theme.radius[12],
              boxShadow: '0px 0px 2px 0px #0000000D, 0px 1px 32px 0px #0000000D, 0px 5px 12px 0px #0000000D',
            }}
          />
        ),
        mobile: (
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <img
              src={MobileCheckCategoryPng}
              style={{
                width: '80%',
                boxShadow: theme.shadow.emphasize,
                borderRadius: theme.radius[16],
              }}
            />
          </div>
        ),
      },
    },
  ];

  return (
    <Index2ComponentContainer>
      <div
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%,${theme.palette.blue[90]} 25%, transparent)`,
          position: 'absolute',
          width: '1800px',
          height: '1200px',
          zIndex: 1,
          right: '-30%',
          top: '-10%',
          rotate: '30deg',
        }}
      />
      <div
        style={{
          background: `radial-gradient(ellipse 50% 50% at 50% 50%,${theme.palette.blue[80]} 25%, transparent)`,
          position: 'absolute',
          width: '1800px',
          height: '1200px',
          zIndex: 1,
          left: '-30%',
          bottom: '-10%',
          rotate: '30deg',
        }}
      />
      <Index2ComponentContent>
        <Index2ComponentTitle>어떻게 활용하나요?</Index2ComponentTitle>
        <Index2ComponentListContainer>
          {sectionList.map((e) => (
            <Index2ComponentItemContainer>
              <Index2ComponentItemDesc>
                {e.icon}
                <Index2ComponentItemDescTitle>
                  {width >= 480 ? e.title.web : e.title.mobile}
                </Index2ComponentItemDescTitle>
                <Index2ComponentItemDescText>{width >= 480 ? e.desc.web : e.desc.mobile}</Index2ComponentItemDescText>
              </Index2ComponentItemDesc>
              <Index2ComponentItemImageContainer>
                {width >= 480 ? e.image.web : e.image.mobile}
              </Index2ComponentItemImageContainer>
            </Index2ComponentItemContainer>
          ))}
        </Index2ComponentListContainer>
      </Index2ComponentContent>
    </Index2ComponentContainer>
  );
};

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
          <div
            style={{
              width: '800px',
              alignContent: 'center',
            }}
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
          </div>
        ) : (
          <div
            style={{
              height: '420px',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
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
          </div>
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
            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'end' }}>
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
            </div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'end' }}>
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
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
              <img src={CategoryModal3Png} />
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3 / 2',
                }}
              ></div>
            </div>
          </Index3Component2ImageContainer>
        </Index3Component2Content>
      </Index3Component2Container>
      <Index3Component3Container>
        <Index3Component3Content>
          {width >= 480 ? (
            <div style={{ position: 'relative', width: '600px', height: '550px' }}>
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
            </div>
          ) : (
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
              }}
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
            </div>
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
        <IndexHeader>
          <LogoImage src={LogoPNG} />
          <LoginButton>로그인 및 회원가입</LoginButton>
        </IndexHeader>
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
              <Index1Component width={width} />
              <Index2Component width={width} />
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
