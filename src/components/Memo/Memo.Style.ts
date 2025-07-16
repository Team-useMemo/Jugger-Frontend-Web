import styled from '@emotion/styled';

export const MemoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  width: '100%',
  gap: '8px',
});

export const MemoContent = styled.div({
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'end',
  padding: '0 24px',
  gap: '6px',
  alignItems: 'end',
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'border-box',
  userSelect: 'none',
  // maxWidth: '680px',
  // [media[480]]: {
  //   maxWidth: '280px',
  // },
});
