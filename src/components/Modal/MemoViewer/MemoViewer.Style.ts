import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const MemoViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],
  padding: '32px 0',
  outline: 'none',
  boxSizing: 'border-box',

  [media[480]]: {
    maxWidth: '360px',
  },
});

export const MemoViewerCloseContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  padding: '0 32px',
  boxSizing: 'border-box',

  ['svg']: {
    cursor: 'pointer',
  },
});

export const MemoViewerTitle = styled.p({
  ...theme.font.title3.bold,
  color: theme.color.label.normal,
  margin: '0',
});

export const MemoViewerButton = styled.button({
  ...theme.font.headline1.medium,
  color: theme.color.background.normal,
  margin: '0',
  background: theme.color.primary.normal,
  width: '100%',
  borderRadius: theme.radius[6],
  padding: '12px',
  boxSizing: 'border-box',
  textAlign: 'center',

  [':focus']: {
    outline: 'none',
  },
});
