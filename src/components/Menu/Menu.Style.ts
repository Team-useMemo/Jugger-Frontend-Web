import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MenuContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],
    ['.divider']: {
      borderBottom: `1px solid ${theme.mode === 'light' ? theme.color.line.normal : theme.color.label.neutral}`,
    },
  }),
  ({
    left,
    right,
    top,
    bottom,
    margin,
    width,
    minWidth,
    maxWidth,
  }: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    margin?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
  }) => ({
    left,
    right,
    top,
    bottom,
    margin,
    width,
    minWidth,
    maxWidth,
  }),
  {
    position: 'absolute',
    padding: '12px 8px',
    borderRadius: theme.radius[12],
    boxShadow: theme.shadow.strong,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '1',

    ['.divider']: {
      margin: '4px 0',
    },
  },
);

const MenuContainerItem = styled.label(
  ({ theme }) => ({
    [':active']: {
      background: theme.mode === 'light' ? theme.color.fill.normal : theme.palette.coolneutral[22],
    },
  }),
  ({ theme, color }: { theme?: any; color?: string }) =>
    color && {
      ['::before']: {
        content: '""',
        width: '8px',
        height: 'auto',
        aspectRatio: '1 / 1',
        background: color !== 'all' ? color : theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
        flexShrink: '0',
        borderRadius: theme.radius.full,
      },
    },
  {
    display: 'flex',
    alignItems: 'center',

    textAlign: 'left',
    padding: '6px',
    boxSizing: 'border-box',
    gap: '6px',

    ['>p']: {
      ...theme.font.body2normal.semibold,
      borderRadius: theme.radius[4],
      margin: '0',

      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    ['>input']: { display: 'none' },
  },
);

export { MenuContainer, MenuContainerItem };
