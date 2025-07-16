import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MemoDetailImageExpandContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  background: theme.color.label.normal,
  alignItems: 'center',
  justifyContent: 'center',

  ['>img']: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
  },
});

export { MemoDetailImageExpandContainer };
