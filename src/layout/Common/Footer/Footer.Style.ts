import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const CommonFooterLayout = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'alternative' : 'alternativeinverse'],
  }),
  {
    width: '100%',
    padding: '56px 72px',
    boxSizing: 'border-box',

    display: 'flex',
    justifyContent: 'center',

    [media[480]]: {
      padding: '32px 20px',
    },
  },
);

const CommonFooterContainer = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      fill: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    maxWidth: '1440px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '36px',

    ...theme.font.body1normal.medium,
    color: theme.color.label.assistive,

    ['>svg']: {
      height: '32px',
      width: 'auto',
    },

    [media[480]]: {
      gap: '16px',

      ...theme.font.caption1.medium,

      ['>svg']: {
        height: '24px',
      },
    },
  },
);

const CommonFooterContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  [media[480]]: {
    gap: '16px',
  },
});

const CommonFooterButtonContainer = styled.div(
  ({ theme }) => ({
    ['>button']: {
      backgroundColor: theme.color.label[theme.mode === 'light' ? 'inverse' : 'neutral'],
    },
    ['>button>svg']: {
      fill: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    gap: '12px',

    ['>button>svg']: {
      stroke: 'none',
    },

    [media[480]]: {
      gap: '4px',
      flexWrap: 'wrap',
    },
  },
);

const CommonFooterSNSContainer = styled.div({
  display: 'flex',
  gap: '24px',

  ['svg']: {
    width: '32px',
    height: 'auto',
    cursor: 'pointer',
    fill: theme.color.label.assistive,
  },

  [media[480]]: {
    gap: '12px',

    ['svg']: {
      width: '24px',
    },
  },
});

export {
  CommonFooterLayout,
  CommonFooterContainer,
  CommonFooterContents,
  CommonFooterButtonContainer,
  CommonFooterSNSContainer,
};
