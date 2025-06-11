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

export const ContextMenuHeader = styled.div({
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '146.7%',
  letterSpacing: '0.144px',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
});

export const ContextMenuTitle = styled.span({
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '146.7%',
  letterSpacing: '0.144px',
  marginLeft: '0px',
});

export const Divider = styled.div({
  height: '1px',
  backgroundColor: '#E0E0E2',
  margin: '4px 0',
});

export const ContextMenuItem = styled.div<{ active?: boolean }>(({ active }) => ({
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '150%',
  letterSpacing: '0.150px',
  padding: '8px 16px',
  color: '#171719',
  backgroundColor: active ? theme.color.background.normal : 'transparent',

  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
}));

export const ContextMenuWrapper = styled.div({
  position: 'fixed',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '8px 0',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  minWidth: '160px',
  textAlign: 'left',
  fontFamily: 'Pretendard',
});
