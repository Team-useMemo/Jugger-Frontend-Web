import styled from '@emotion/styled';

export const MessageItem = styled.div(
  ({ focus }: { focus: boolean }) => ({
    background: focus ? '#F7FBFF' : 'transparent',
  }),
  {
    display: 'flex',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',

    '&:hover': {
      backgroundColor: '#f8f8f8',
    },
  },
);

export const Dot = styled.div({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  marginRight: '10px',
  marginTop: '6px',
  flexShrink: 0,
  alignSelf: 'flex-start',
});

export const MessageBody = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
});

export const MessageHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '100%',
});

export const Title = styled.div({
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '146.7%',
  letterSpacing: '0.144px',
});

export const Pin = styled.div({
  marginLeft: '6px',
});

export const Time = styled.div({
  fontSize: '12px',
  color: '#888',
  minWidth: '32px',
  textAlign: 'right',
});

export const Content = styled.div({
  fontSize: '13px',
  color: '#444',
  marginTop: '4px',
  width: '100%',
  whiteSpace: 'normal',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',

  WebkitLineClamp: '2',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

export const HeaderLeft = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

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
  backgroundColor: active ? '#F4F4F5' : 'transparent',

  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
}));
