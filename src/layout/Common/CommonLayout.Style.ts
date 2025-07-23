import styled from '@emotion/styled';
import { media } from '@styles/theme';

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

  [media[480]]: {
    padding: '12px 20px',
  },
});

export { CommonLayoutContainer, CommonLayoutContents };
