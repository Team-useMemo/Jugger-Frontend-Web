import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { media, theme } from '@styles/theme';

const IndexThirdSectionLayout = styled.div({
  position: 'relative',
  zIndex: '10',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const IndexThirdSectionContainer = styled.div(
  ({ idx }: { idx: number }) => ({
    background:
      idx == 0
        ? ''
        : idx == 1
          ? `radial-gradient(ellipse 50% 80% at 50% 100%,${theme.palette.blue[90]} 25%, transparent), ${theme.palette.blue[99]}`
          : theme.color.background.normal,
  }),
  {
    padding: '72px 42px',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    [media[480]]: {
      padding: '32px 20px',
    },
  },
);

const IndexThirdSectionContents = styled.div(
  ({ idx }: { idx: number }) =>
    ({
      flexDirection: idx == 0 ? 'row' : idx == 1 ? 'column' : 'row-reverse',
      alignItems: idx == 0 ? '' : 'center',
      maxWidth: idx == 0 ? '1280px' : '1440px',
      gap: idx == 1 ? '8px' : '64px',
    }) as const,
  {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',

    [media[480]]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
  },
);

const IndexThirdSectionTitleContainer = styled.div(
  ({ idx }: { idx: number }) =>
    ({
      alignItems: idx == 0 ? 'start' : idx == 1 ? 'center' : 'start',
      textAlign: idx == 0 ? 'left' : idx == 1 ? 'center' : 'left',
      margin: idx == 2 ? '0 auto' : '',
    }) as const,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',

    [media[480]]: {
      gap: '8px',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
);

const IndexThirdSectionTitleIndex = styled.p(
  ({ idx }: { idx: number }) =>
    idx == 0
      ? {
          background: theme.color.primary.normal,
          color: theme.color.label.inverse,
          aspectRatio: '1 / 1',
          borderRadius: theme.radius[8],
          [media[480]]: {
            borderRadius: theme.radius[4],
          },
        }
      : idx == 1
        ? {
            color: theme.color.label.normal,
            lineHeight: '1.25 !important',
            borderBottom: `4px solid ${theme.color.primary.normal}`,
            [media[480]]: {
              borderBottom: `2px solid ${theme.color.primary.normal}`,
            },
          }
        : {
            color: theme.color.primary.normal,
            ['::before']: {
              content: '""',
              background: theme.color.primary.normal,
              width: '8px',
              aspectRatio: '1 / 1',
              borderRadius: theme.radius.full,
              [media[480]]: {
                width: '4px',
              },
            },
          },
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    ...theme.font.title1.bold,
    margin: '0',

    [media[480]]: {
      ...theme.font.body1normal.semibold,
    },
  },
);

const IndexThirdSectionTitle = styled.p(
  ({ strongColor }: { strongColor: 'black' | 'blue' }) => ({
    color: strongColor == 'black' ? theme.color.label.alternative : theme.color.label.normal,

    ['b']: {
      color: strongColor == 'black' ? theme.color.label.normal : theme.color.primary.normal,
    },
  }),
  {
    ...theme.font.display2.bold,
    margin: '0',
    whiteSpace: 'nowrap',

    ['b']: {
      ...theme.font.display2.bold,
    },

    [media[480]]: {
      ...theme.font.title3.bold,

      ['b']: {
        ...theme.font.title3.bold,
      },
    },
  },
);

const IndexThirdSectionImage1Container = styled(motion.picture)({
  ['img']: {
    maxWidth: '820px',
    width: '100%',
    borderRadius: theme.radius[16],
    boxShadow: '0px 0px 2.28px 0px #0000000D, 0px 1.14px 36.44px 0px #0000000D, 0px 5.69px 13.67px 0px #0000000D',
  },

  [media[480]]: {
    height: '460px',

    ['img']: {
      width: '80%',
    },
  },
});

const IndexThirdSectionImage2Container = styled.div({
  display: 'flex',
  gap: '20px',
  maxWidth: '1080px',

  [media[480]]: {
    gap: '4px',
  },
});

const IndexThirdSectionImage2Item = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'end',
  width: '100%',

  ['svg']: {
    width: '40%',
    height: 'auto',
  },

  ['img']: {
    width: '100%',
    boxShadow: theme.shadow.emphasize,
  },
});

const IndexThirdSectionImage2Block = styled.div(({ size }: { size: string }) => ({ width: size }), {
  aspectRatio: '1 / 1',
});

const IndexThirdSectionImage3Container = styled(motion.div)({
  position: 'relative',
  width: '720px',
  height: '500px',

  ['img']: {
    position: 'absolute',
    width: '63%',
    top: '50%',
    boxShadow: theme.shadow.emphasize,
    borderRadius: '12px',
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
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    ['img']: {
      top: 'auto',
      width: '55%',
    },
    ['>:nth-of-type(1)>img']: {
      transform: 'none',
      left: '10%',
      top: '0%',
    },
    ['>:nth-of-type(2)>img']: {
      transform: 'none',
      right: '10%',
      bottom: '-15%',
    },
  },
});

export {
  IndexThirdSectionLayout,
  IndexThirdSectionContainer,
  IndexThirdSectionContents,
  IndexThirdSectionTitleContainer,
  IndexThirdSectionTitleIndex,
  IndexThirdSectionTitle,
  IndexThirdSectionImage1Container,
  IndexThirdSectionImage2Container,
  IndexThirdSectionImage2Item,
  IndexThirdSectionImage2Block,
  IndexThirdSectionImage3Container,
};
