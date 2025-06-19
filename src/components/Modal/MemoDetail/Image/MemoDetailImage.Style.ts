import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoDetailImageContainer = styled.div({
  display: 'inline-flex',
  flexDirection: 'column',
  paddingTop: '24px',
  gap: '24px',
  overflow: 'hidden',

  [media[480]]: {
    paddingTop: '12px',
    gap: '12px',
  },
});

const MemoDetailImageContents = styled.div({
  overflow: 'hidden',
  display: 'flex',

  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.color.background.alternative,

  ['>img']: {
    objectFit: 'contain',
    width: 'auto',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '0',
    minHeight: '0',
  },
});

const MemoDetailImageButtonContainer = styled.div({
  padding: '0 32px',
  display: 'flex',

  gap: '15px',
  flexShrink: '0',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },

  ['.grow']: {
    flexGrow: '1',
  },

  [media[480]]: {
    padding: '0 24px',
  },
});

export { MemoDetailImageContainer, MemoDetailImageContents, MemoDetailImageButtonContainer };
