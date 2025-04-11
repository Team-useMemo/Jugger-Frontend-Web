import styled from '@emotion/styled';

const MemoImageContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
  ['img']: {
    maxWidth: '320px',
    maxHeight: '240px',
  },
});

export default MemoImageContainer;
