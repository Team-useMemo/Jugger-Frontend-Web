import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const StyledHeader = styled.div({
  height: '78px',
  display: 'flex',
  padding: '28px 24px 20px',
  borderBottom: '1px solid #E0E0E2',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  alignItems: 'center',

  ['>svg']: {
    display: 'none',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
  [media[480]]: {
    height: 'auto',
    padding: '14px 12px',
    ['>svg']: {
      display: 'block',
      width: '24px',
    },
  },
});

export const HeaderTitle = styled.div(
  ({ color }: { color: string }) => ({
    ['::before']: {
      background: color,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: theme.color.label.normal,
    ...theme.font.heading1.semibold,

    [media[480]]: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',

      ...theme.font.body2normal.semibold,
    },

    ['::before']: {
      content: '""',
      width: '8px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
    },
  },
);

export const HeaderButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',

  ['>svg']: {
    cursor: 'pointer',
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  [media[480]]: {
    gap: '4px',
  },
});
