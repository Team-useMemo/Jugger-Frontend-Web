import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const MemoContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '0 24px',
  gap: '6px',
  alignItems: 'end',
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'border-box',
  userSelect: 'none',
});

export const MemoCategoryContainer = styled.div(({ color }: { color: string }) => ({
  ...theme.font.caption2.medium,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: theme.color.label.alternative,

  ['p']: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  ['span']: {
    padding: '4px',
    background: color,
    margin: '0',
    borderRadius: theme.radius[32],
  },

  [media[480]]: {
    // flexGrow: '1',
    justifyContent: 'end',
    minWidth: '72px',
    maxWidth: '128px',
  },
}));

export const MemoContent = styled.div({
  borderRadius: theme.radius[12],
  overflow: 'hidden',
  maxWidth: '680px',

  [media[480]]: {
    maxWidth: '280px',
  },
});
