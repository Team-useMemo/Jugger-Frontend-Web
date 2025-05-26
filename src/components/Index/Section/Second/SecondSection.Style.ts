import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const IndexSecondSectionLayout = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '72px 42px',
  boxSizing: 'border-box',

  [media[480]]: {
    padding: '42px 20px',
  },
});

const IndexSecondSectionContainer = styled.div({
  position: 'relative',
  maxWidth: '1440px',
  width: '100%',
});

const IndexSecondSectionBackgroundContainer = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const IndexSecondSectionBackgroundRadial = styled.div(
  ({ idx }: { idx: number }) =>
    idx
      ? {
          left: '0%',
          top: '-10%',
        }
      : {
          right: '0%',
          bottom: '-10%',
        },
  {
    background: `radial-gradient(ellipse 50% 50% at 50% 50%,${theme.palette.blue[90]} 50%, transparent)`,
    position: 'absolute',
    width: '1800px',
    height: '1200px',
    zIndex: 1,
    rotate: '30deg',
  },
);

const IndexSecondSectionContents = styled.div({
  position: 'relative',
  width: '100%',
  zIndex: '10',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',

  [media[480]]: {
    gap: '24px',
  },
});

const IndexSecondSectionTitle = styled.p({
  ...theme.font.display1.bold,
  color: theme.color.label.normal,
  margin: '0',

  whiteSpace: 'nowrap',

  [media[480]]: {
    ...theme.font.title1.bold,
  },
});

const IndexSecondSectionList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  [media[480]]: {
    gap: '16px',
  },
});

const IndexSecondSectionItem = styled.div({
  display: 'flex',
  background: theme.color.background.normal,
  borderRadius: theme.radius[24],
  boxShadow: '0px 4px 32px 0px #0000000D',
  overflow: 'hidden',
  padding: '72px 48px',
  gap: '32px',
  justifyContent: 'space-between',

  [media[480]]: {
    flexDirection: 'column',
    borderRadius: theme.radius[20],
    boxShadow: '0px 1.04px 8.33px 0px #0000000D',
    padding: '40px 0',
    height: 'calc(100vh - 256px)',
  },
});

const IndexSecondSectionItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  alignItems: 'start',
  justifyContent: 'center',
  width: '320px',
  padding: '0 32px',

  ['svg']: {
    width: '36px',
  },

  ['p']: {
    margin: '0',
    textAlign: 'left',
    whiteSpace: 'nowrap',

    ['&.title']: {
      ...theme.font.display2.bold,
      color: theme.color.label.normal,

      ['span']: {
        backgroundImage: `linear-gradient(96.33deg, ${theme.palette.blue[50]} 7.36%, ${theme.palette.blue[40]} 66.36%)`,

        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },

    ['&.desc']: {
      ...theme.font.title3.medium,
      color: theme.color.label.alternative,
    },
  },

  [media[480]]: {
    width: 'auto',
    alignItems: 'center',
    gap: '8px',

    ['svg']: {
      width: '24px',
    },

    ['p']: {
      textAlign: 'center',

      ['&.title']: {
        ...theme.font.title3.bold,
      },

      ['&.desc']: {
        ...theme.font.caption1.medium,
      },
    },
  },
});

const IndexSecondSectionItemImage = styled.div(
  ({ type }: { type: 'single' | 'double' }) =>
    type == 'single'
      ? {
          ['img']: {
            width: '100%',
            top: '50%',
            left: '0',
            transform: 'translate(0, -50%)',
            borderRadius: theme.radius[12],
          },

          [media[480]]: {
            ['img']: {
              width: '80%',
              top: '0',
              left: '50%',
              transform: 'translate(-50%, 0);',
              borderRadius: theme.radius[16],
            },
          },
        }
      : {
          ['img']: {
            width: '63%',
            top: '50%',
            transform: 'translate(0, -50%)',
            borderRadius: theme.radius[12],
          },

          ['>:nth-of-type(1)>img']: {
            left: '0',
            transform: 'translate(0, -70%)',
          },
          ['>:nth-of-type(2)>img']: {
            right: '0',
            transform: 'translate(0, -30%)',
          },

          [media[480]]: {
            ['img']: {
              width: '63%',
              borderRadius: theme.radius[12],
              top: 'auto',
            },

            ['>:nth-of-type(1)>img']: {
              transform: 'none',
              top: '0%',
              left: '10%',
            },
            ['>:nth-of-type(2)>img']: {
              transform: 'none',
              right: '10%',
              bottom: '-15%',
            },
          },
        },
  {
    flexGrow: '1',
    maxWidth: '720px',
    position: 'relative',
    aspectRatio: '3 / 2',
    ['img']: {
      position: 'absolute',
      boxShadow: '0px 0px 16.33px 0px #0000000D, 0px 1.09px 21.77px 0px #0000000D, 0px 5.44px 21.77px 0px #0000000D',
    },

    [media[480]]: {
      ['img']: {
        boxShadow: theme.shadow.emphasize,
      },
    },
  },
);

export {
  IndexSecondSectionLayout,
  IndexSecondSectionContainer,
  IndexSecondSectionBackgroundContainer,
  IndexSecondSectionBackgroundRadial,
  IndexSecondSectionContents,
  IndexSecondSectionTitle,
  IndexSecondSectionList,
  IndexSecondSectionItem,
  IndexSecondSectionItemTitle,
  IndexSecondSectionItemImage,
};
