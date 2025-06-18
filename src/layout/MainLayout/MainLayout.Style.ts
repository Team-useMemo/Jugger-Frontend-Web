import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const StyledMainlayout = styled.div({
  display: 'flex',
  height: '100dvh',
  width: '100dvw',
  overflow: 'hidden',
});

export const StyledMain = styled.div({
  minWidth: '0',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

export const StyledContent = styled.div({
  overflow: 'auto',
  height: 'calc(100% - 78px)',

  [media[480]]: {
    height: '100%',
  },
});
