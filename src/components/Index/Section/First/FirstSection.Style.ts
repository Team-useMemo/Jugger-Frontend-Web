import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const IndexFirstSectionLayout = styled.div({
  padding: '24px 42px',
  width: '100%',
  boxSizing: 'border-box',
  height: 'calc(100vh - 80px)',

  [media[480]]: {
    padding: '12px 20px',
  },
});

const IndexFirstSectionContainer = styled.div({
  position: 'relative',
  zIndex: '10',
  height: '100%',
  boxSizing: 'border-box',
  padding: '32px',
  background: theme.color.background.normal,
  borderRadius: theme.radius[32],
  overflow: 'hidden',
  boxShadow: '0px 50px 50px 0px #00235B0D, 0px 1px 50px 0px #00235B08, 0px 5px 50px 0px #0000000D',

  [media[480]]: {
    borderRadius: theme.radius[20],
    boxShadow: '0px 12.92px 12.92px 0px #00235B0D, 0px 0.26px 12.92px 0px #00235B08, 0px 1.29px 12.92px 0px #0000000D',
    padding: '32px',
  },
});

// Background

const IndexFirstSectionBackgroundAnimationLtoR = keyframes({
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

const IndexFirstSectionBackgroundColorMap = (idx: number) => {
  const colorMap = {
    0: theme.palette.blue[30],
    1: theme.palette.blue[40],
    2: theme.palette.blue[50],
  };
  return colorMap[idx as 0 | 1 | 2] ?? theme.palette.blue[50];
};

const IndexFirstSectionBackgroundContainer = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: '0',
  top: '0',
});

const IndexFirstSectionBackgroundRadial = styled.div(
  ({ idx }: { idx: number }) => ({
    background: `radial-gradient(ellipse 50% 120% at 50% 160%, ${IndexFirstSectionBackgroundColorMap(idx)} 30%, transparent)`,
    animationDelay: `${-5 * idx}s`,
  }),
  {
    width: '100%',
    height: '100%',
    position: 'absolute',
    animationName: IndexFirstSectionBackgroundAnimationLtoR,
    animationIterationCount: 'infinite',
    animationDuration: '15s',
    animationTimingFunction: 'ease-in-out',
  },
);

// Contents

const IndexFirstSectionContents = styled.div({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

// Title

const IndexFirstSectionTitleContainer = styled.div({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '48px',

  [media[480]]: {
    gap: '20px',
    padding: '42px 0',
  },
});

const IndexFirstSectionTitleLogo = styled.img({
  height: '32px',

  [media[480]]: {
    height: '24px',
  },
});

const IndexFirstSectionTitleContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  alignItems: 'center',

  [media[480]]: {
    gap: '24px',
  },
});

const IndexFirstSectionTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  [media[480]]: {
    gap: '8px',
  },
});

const IndexFirstSectionTitleMain = styled.p({
  margin: '0',
  ...theme.font.display1.bold,

  backgroundImage: `linear-gradient(115.01deg, ${theme.palette.blue[50]} 28.24%, ${theme.palette.blue[40]} 85.69%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',

  [media[480]]: {
    ...theme.font.title1.bold,
  },
});

const IndexFirstSectionTitleDesc = styled.p({
  margin: '0',
  ...theme.font.title3.medium,

  color: theme.color.label.neutral,

  [media[480]]: {
    ...theme.font.body1reading.medium,
  },
});

// Image

const IndexFirstSectionImage = styled.img({
  maxWidth: '1024px',
  width: '100%',
  filter: 'drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4))',

  [media[480]]: {
    width: '90%',
    borderRadius: theme.radius[16],
    overflow: 'hidden',
    filter: 'none',
    boxShadow: theme.shadow.emphasize,
  },
});

export {
  IndexFirstSectionLayout,
  IndexFirstSectionContainer,
  IndexFirstSectionBackgroundContainer,
  IndexFirstSectionBackgroundRadial,
  IndexFirstSectionContents,
  IndexFirstSectionTitleContainer,
  IndexFirstSectionTitleLogo,
  IndexFirstSectionTitleContents,
  IndexFirstSectionTitle,
  IndexFirstSectionTitleMain,
  IndexFirstSectionTitleDesc,
  IndexFirstSectionImage,
};
