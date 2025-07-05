import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoDetailTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  overflow: 'hidden',
  gap: '12px',

  ...theme.font.title3.bold,
  color: theme.color.label.normal,

  [media[480]]: {
    padding: '0px 20px',
  },
});

const MemoDetailTextContents = styled.p({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflow: 'auto',

  ...theme.font.body2normal.medium,
  color: theme.color.label.normal,
  margin: '0',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  [media[480]]: {
    padding: '12px 0px',
  },
});

export { MemoDetailTextContainer, MemoDetailTextContents };
