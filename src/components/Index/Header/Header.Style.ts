import styled from '@emotion/styled';
import { media } from '@styles/theme';

const IndexHeaderContainer = styled.div({
  display: 'flex',
  padding: '16px 56px',
  borderBottom: '1px solid #E0E0E2',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  alignItems: 'center',

  [media[480]]: {
    padding: '16px 20px',
  },
});

const IndexHeaderLogo = styled.img({
  height: '32px',

  [media[480]]: {
    height: '28px',
  },
});

export { IndexHeaderContainer, IndexHeaderLogo };
