import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const MemoTextContainer = styled.div({
  background: theme.color.primary.normal,
  padding: '8px 16px',
  textAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const MemoTextContents = styled.p({
  ...theme.font.body2normal.medium,
  color: theme.color.label.inverse,
  margin: '0',
  whiteSpace: 'pre-wrap',
  WebkitLineClamp: '24',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  [media[480]]: {
    WebkitLineClamp: '16',
  },
});

export const MemoTextMoreButton = styled.div({
  ...theme.font.body2normal.medium,
  color: theme.color.label.inverse,
  margin: '0',

  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  ['svg']: {
    stroke: theme.color.label.inverse,
    height: '16px',
    width: '16px',
  },
});

export const MemoTextMoreDivideLine = styled.span({
  borderBottom: `1px solid ${theme.color.line.normal}`,
  width: '100%',
  opacity: '0.3',
});
