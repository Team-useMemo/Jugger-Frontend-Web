import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const ContextMenu = styled.div({
  position: 'fixed',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '12px 8px',
  boxShadow: '0px 6px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
  zIndex: 1000,
  minWidth: '160px',
  gap: '10px',
  alignItems: 'flex-start',
  textAlign: 'left',
});

export const ContextMenuHeader = styled.div(
  ({ color }: { color: string }) => ({
    ['::before']: {
      background: color,
    },
  }),
  {
    fontFamily: 'Pretendard',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '146.7%',
    letterSpacing: '0.144px',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    gap: '8px',

    ['::before']: {
      content: '""',
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
    },
  },
);

export const ContextMenuTitle = styled.span({
  ...theme.font.body2normal.semibold,

  marginLeft: '0px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ContextMenuItem = styled.div<{ active?: boolean }>(({ theme, active }) => ({
  ...theme.font.body2normal.semibold,

  padding: '8px 16px',
  backgroundColor: active ? theme.color.background.normal : 'transparent',

  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.mode === 'light' ? theme.color.fill.normal : theme.palette.coolneutral[22],
  },
}));

export const ContextMenuWrapper = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],
    ['.divider']: {
      borderBottom: `1px solid ${theme.mode === 'light' ? theme.color.line.normal : theme.color.label.neutral}`,
    },
  }),
  {
    position: 'fixed',
    // border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '8px 0',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '140px',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    maxWidth: '180px',

    ['>span.divider']: {
      display: 'block',
      height: '1px',
      width: '100%',
    },
  },
);
