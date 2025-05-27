import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const IndexFooterLayout = styled.div({
  background: theme.palette.blue[20],
  width: '100%',
  padding: '72px',
  boxSizing: 'border-box',

  display: 'flex',
  justifyContent: 'center',

  [media[480]]: {
    padding: '32px 20px',
  },
});

const IndexFooterContainer = styled.div({
  maxWidth: '1440px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '36px',

  ...theme.font.body1normal.medium,
  color: theme.color.label.inverse,

  ['img']: {
    height: '48px',
  },

  [media[480]]: {
    gap: '16px',

    ...theme.font.caption1.medium,

    ['img']: {
      height: '24px',
    },
  },
});

const IndexFooterContents = styled.div({
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

  [media[480]]: {
    gap: '8px',
    flexWrap: 'wrap',
  },
});

const IndexFooterSNSContainer = styled.div({
  display: 'flex',
  gap: '24px',

  ['svg']: {
    width: '32px',
    height: 'auto',
  },

  [media[480]]: {
    gap: '12px',

    ['svg']: {
      width: '24px',
    },
  },
});

export {
  IndexFooterLayout,
  IndexFooterContainer,
  IndexFooterContents,
  IndexFooterButtonContainer,
  IndexFooterSNSContainer,
};
