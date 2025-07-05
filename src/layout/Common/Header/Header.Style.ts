import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const CommonHeaderContainer = styled.div({
  display: 'flex',
  padding: '24px',
  gap: '10px',
  borderBottom: `1px solid ${theme.color.line.normal}`,

  ['>img']: {
    width: '113px',
  },
});

export { CommonHeaderContainer };
