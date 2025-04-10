import styled from '@emotion/styled';
import { theme } from '@styles/theme';

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
  color: theme.palette.common[100],
  margin: '0',
  whiteSpace: 'pre-wrap',
  WebkitLineClamp: '20',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const MemoTextMoreButton = styled.div({
  ...theme.font.body2normal.medium,
  color: theme.palette.common[100],
  margin: '0',

  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

  ['svg']: {
    stroke: theme.palette.common[100],
    height: '16px',
    width: '16px',
  },
});

export const MemoTextMoreDivideLine = styled.span({
  borderBottom: `1px solid ${theme.color.line.normal}`,
  width: '100%',
  opacity: '0.3',
});
