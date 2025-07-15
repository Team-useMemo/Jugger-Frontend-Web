import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const MemoCategoryContainer = styled.div(({ color }: { color: string }) => ({
  ...theme.font.caption2.medium,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: theme.color.label.alternative,
  overflow: 'hidden',

  ['>p']: {
    margin: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  ['::before']: {
    content: '""',
    flexShrink: '0',

    width: '8px',
    height: 'auto',
    aspectRatio: '1 / 1',
    background: color,
    borderRadius: theme.radius.full,
  },

  [media[480]]: {
    // flexGrow: '1',
    justifyContent: 'end',
    minWidth: '72px',
    maxWidth: '128px',
  },
}));

export { MemoCategoryContainer };
