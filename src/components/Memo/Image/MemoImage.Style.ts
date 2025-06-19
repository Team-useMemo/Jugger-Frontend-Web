import styled from '@emotion/styled';

const MemoImageContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
  ['>img']: {
    maxWidth: '320px',
    width: '100%',
    maxHeight: '240px',
    height: '100%',
  },
});

export default MemoImageContainer;
