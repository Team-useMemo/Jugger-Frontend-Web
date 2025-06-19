import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoDetailLayout = styled.div({
  padding: '64px',
  maxHeight: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  overflow: 'hidden',

  [media[480]]: {
    padding: '20px',
  },
});

const MemoDetailContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],

  ['>svg']: {
    marginLeft: 'auto',
    marginRight: '32px',
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    flexShrink: '0',
    cursor: 'pointer',
  },

  [media[480]]: {
    ['>svg']: {
      marginRight: '24px',
    },
  },
});

export { MemoDetailLayout, MemoDetailContainer };
