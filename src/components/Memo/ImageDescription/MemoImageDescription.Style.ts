import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MemoImageDescriptionContainer = styled.div({
  borderRadius: theme.radius[12],
  maxWidth: '320px',
  padding: '12px 16px',
  background: theme.palette.blue[95],
  boxSizing: 'border-box',
  textAlign: 'left',
  cursor: 'pointer',

  ['>p']: {
    ...theme.font.caption1.medium,
    color: theme.color.label.neutral,
    margin: '0',
  },
});

export { MemoImageDescriptionContainer };
