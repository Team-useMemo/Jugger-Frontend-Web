import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const IndexLayout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
});

const IndexContainer = styled.div({
  flexGrow: '1',
  overflow: 'hidden auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: theme.color.background.alternative,
});

const IndexContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export { IndexLayout, IndexContainer, IndexContents };
