import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const MemoDetailTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  textAlign: 'left',
  padding: '0 32px',
  maxHeight: '720px',
});

export const MemoDetailTextTitle = styled.p({
  ...theme.font.title3.bold,
  color: theme.color.label.normal,
  margin: '0',
});

export const MemoDetailTextContents = styled.p({
  ...theme.font.body2normal.medium,
  color: theme.color.label.normal,
  margin: '0',
  width: '400px',
  overflow: 'auto',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  [media[480]]: {
    width: 'auto',
  },
});
