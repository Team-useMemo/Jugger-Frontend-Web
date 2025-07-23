import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const CommonFooterLayout = styled.div({
  background: theme.palette.blue[20],
  width: '100%',
  padding: '56px 72px',
  boxSizing: 'border-box',

  display: 'flex',
  justifyContent: 'center',

  [media[480]]: {
    background: theme.color.background.alternative,
    padding: '32px 20px',
  },
});

const CommonFooterContainer = styled.div({
  maxWidth: '1440px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '36px',

  ...theme.font.body1normal.medium,
  color: theme.color.label.inverse,

  ['img']: {
    height: '32px',
  },

  [media[480]]: {
    gap: '16px',

    ...theme.font.caption1.medium,
    color: theme.color.label.assistive,

    ['img']: {
      height: '22px',
    },
  },
});

const CommonFooterContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  [media[480]]: {
    gap: '16px',
  },
});

const CommonFooterButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',

  [media[480]]: {
    gap: '4px',
    flexWrap: 'wrap',

    ['>button']: {
      backgroundColor: theme.color.label.inverse,
    },
  },
});

const CommonFooterSNSContainer = styled.div({
  display: 'flex',
  gap: '24px',

  ['svg']: {
    width: '32px',
    height: 'auto',
    cursor: 'pointer',
  },

  [media[480]]: {
    gap: '12px',

    ['svg']: {
      width: '24px',
      fill: theme.color.label.assistive,
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
