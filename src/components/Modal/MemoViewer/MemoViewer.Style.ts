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
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    marginRight: '32px',
    cursor: 'pointer',
    flexShrink: '0',
  },

  [media[480]]: {
    width: '100dvw',
    height: '100dvh',
    boxSizing: 'border-box',
    borderRadius: '0',
  },
});

const MemoViewerContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 32px',
  width: '100%',
  boxSizing: 'border-box',

  [media[480]]: {
    height: '100%',
  },
});

const MemoViewerTitle = styled.div({
  ...theme.font.title3.bold,
  color: theme.color.label.normal,
  margin: '0',
  textAlign: 'left',
});

export { MemoViewerContainer, MemoViewerContents, MemoViewerTitle };
