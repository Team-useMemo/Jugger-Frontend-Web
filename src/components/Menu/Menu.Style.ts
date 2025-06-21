import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const MenuContainer = styled.div(
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
    background: theme.color.background.normal,
    padding: '12px 8px',
    borderRadius: theme.radius[12],
    boxShadow: theme.shadow.strong,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '1',

    ['.divider']: {
      borderBottom: '1px solid black',
      margin: '4px 0',
    },
  },
);

const MenuContainerItem = styled.label(
  ({ color }: { color?: string }) =>
    color && {
      ['::before']: {
        content: '""',
        width: '8px',
        height: 'auto',
        aspectRatio: '1 / 1',
        background: color,
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
      color: theme.color.label.normal,
      borderRadius: theme.radius[4],
      margin: '0',

      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    [':active']: {
      background: theme.color.fill.normal,
    },

    ['>input']: { display: 'none' },
  },
);

export { MenuContainer, MenuContainerItem };
