import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoViewerContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],
  width: '460px',
  alignItems: 'end',

  [':focus']: {
    outline: 'none',
  },

  ['>svg']: {
    marginRight: '32px',
    cursor: 'pointer',
  },

  [media[480]]: {
    maxWidth: '360px',
  },
});

const MemoViewerContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 32px',
  width: '100%',
  boxSizing: 'border-box',
});

const MemoViewerTitle = styled.div({
  ...theme.font.title3.bold,
  color: theme.color.label.normal,
  margin: '0',
  textAlign: 'left',
});

export { MemoViewerContainer, MemoViewerContents, MemoViewerTitle };
