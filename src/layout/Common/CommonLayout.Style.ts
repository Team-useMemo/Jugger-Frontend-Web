import styled from '@emotion/styled';

const CommonLayoutContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100dvh',
  overflow: 'auto',
});

const CommonLayoutContents = styled.div({
  position: 'relative',
  flexGrow: '1',
  display: 'flex',
  justifyContent: 'center',
  padding: '36px 72px',
});

export { CommonLayoutContainer, CommonLayoutContents };
