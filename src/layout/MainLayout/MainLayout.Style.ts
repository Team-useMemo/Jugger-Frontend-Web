import styled from 'styled-components';

export const StyledMainlayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 80vw;
`;

export const StyledMain = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100vh - 60px);
`;

export const StyledContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
