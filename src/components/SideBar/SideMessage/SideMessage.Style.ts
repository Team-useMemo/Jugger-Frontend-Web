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
  fontWeight: 600,
  fontSize: '14px',
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
