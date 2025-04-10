import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '0 24px',
  gap: '6px',
  alignItems: 'end',
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'border-box',
});

export const MemoCategoryContainer = styled.div(({ color }: { color: string }) => ({
  ...theme.font.caption2.medium,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: theme.color.label.alternative,

  ['span']: {
    padding: '4px',
    background: color,
    margin: '0',
    borderRadius: theme.radius[32],
  },
}));

export const MemoContent = styled.div({
  borderRadius: theme.radius[12],
  overflow: 'hidden',
  maxWidth: '680px',
});
