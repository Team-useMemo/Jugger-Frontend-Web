import styled from '@emotion/styled';

const MemoMainText = styled.p({
  margin: '0',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: '15px',
  fontWeight: '500',
  padding: '8px 16px',
  background: '#0054D1',
  textAlign: 'start',
});

const MemoText = ({ content }: { content: string }) => {
  return <MemoMainText>{content}</MemoMainText>;
};

export default MemoText;
