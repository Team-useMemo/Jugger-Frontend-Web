import styled from '@emotion/styled';

export const StyledMainlayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const StyledMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledContent = styled.div({
  overflow: 'auto',
  height: 'calc(100% - 78px)',
});
