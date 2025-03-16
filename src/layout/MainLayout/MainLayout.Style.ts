import styled from 'styled-components';

export const StyledMainlayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
`;

export const StyledSidebar = styled.div`
  display: flex;
  width: 30%;
  min-width: 250px;
  max-width: 400px;
  height: calc(100vh - 60px);
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
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
