import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoDetailTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'left',
  maxHeight: '640px',
  marginTop: '24px',
});

const MemoDetailTextContents = styled.p({
  ...theme.font.body2normal.medium,
  color: theme.color.label.normal,
  margin: '0',
  width: '100%',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  [media[480]]: {
    width: 'auto',
  },
});

export { MemoDetailTextContainer, MemoDetailTextContents };
