import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MemoImageContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
  borderRadius: theme.radius[12],
  overflow: 'hidden',

  ['>img']: {
    maxWidth: '320px',
    width: '100%',
    maxHeight: '240px',
    height: '100%',
  },
});

export default MemoImageContainer;
