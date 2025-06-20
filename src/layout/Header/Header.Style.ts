import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const HeaderContainer = styled.div({
  display: 'flex',
  width: '100%',
  flexGrow: '1',
  boxSizing: 'border-box',
  padding: '28px 24px 20px',
  gap: '64px',
  minWidth: 0,
  borderBottom: '1px solid #E0E0E2',
  height: '78px',

  [media[480]]: {
    justifyContent: 'space-between',
    padding: '14px 12px',
    gap: '12px',
    height: 'auto',
  },
});

const HeaderMenuContainer = styled.div({
  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },

  display: 'none',
  [media[480]]: {
    display: 'flex',
    width: '64px',
    flexShrink: '0',
  },
});

const HeaderTitleContainer = styled.div(
  ({ color }: { color: string }) => ({
    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexGrow: '1',
    overflow: 'hidden',

    ['>p']: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',

      color: theme.color.label.normal,
      ...theme.font.heading1.semibold,
      margin: '0',
    },

    ['::before']: {
      content: '""',
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
      flexShrink: '0',
    },

    [media[480]]: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%);',
      maxWidth: 'calc(100% - 72px * 2)',
      boxSizing: 'border-box',

      ['>p']: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        margin: '0',
        ...theme.font.body2normal.semibold,
        color: theme.color.label.normal,
      },
    },
  },
);

const HeaderButtonContainer = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexShrink: '0',
  marginLeft: 'auto',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },

  [media[480]]: {
    width: '64px',
    gap: '4px',
    justifyContent: 'end',
  },
});

export { HeaderContainer, HeaderMenuContainer, HeaderTitleContainer, HeaderButtonContainer };
