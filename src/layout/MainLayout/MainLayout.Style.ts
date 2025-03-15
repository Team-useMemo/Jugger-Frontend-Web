import styled from 'styled-components';

export const StyledMainlayout = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(800px, 1fr); /* 최소 600px, 최대 1fr */
  grid-template-rows: auto 1fr auto; /* 헤더, 컨텐츠, 푸터 */
  height: 100vh;
  width: 100%;

  .sidebar {
    background-color: #f8f9fa;
    padding: 16px;
    border-right: 1px solid #ddd;
  }

  .main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .header {
    background-color: #ffffff;
    padding: 16px;
    border-bottom: 1px solid #ddd;
  }

  .content {
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
  }

  .footer {
    background-color: #ffffff;
    padding: 16px;
    border-top: 1px solid #ddd;
  }
`;
