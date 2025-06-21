import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const HeaderContainer = styled.div({
  display: 'flex',
  width: '100%',
  flexGrow: '1',
  boxSizing: 'border-box',
  padding: '0px 24px',
  minWidth: 0,
  borderBottom: '1px solid #E0E0E2',
  height: '78px',
  position: 'relative',

  [media[480]]: {
    padding: '0 12px',
    height: 'auto',
  },
});

const HeaderContents = styled.div({
  display: 'flex',
  gap: '64px',
  width: '100%',
  boxSizing: 'border-box',
  padding: '28px 0px 20px',

  [media[480]]: {
    justifyContent: 'space-between',
    gap: '12px',
    padding: '14px 0',
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

    ['>svg']: {
      flexShrink: '0',
      stroke: theme.color.label.alternative,
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    [media[480]]: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%);',
      maxWidth: 'calc(100% - 72px * 2)',
      boxSizing: 'border-box',
      gap: '0px',

      ['::before']: {
        marginRight: '8px',
      },

      ['>p']: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        margin: '0',
        ...theme.font.body2normal.semibold,
        color: theme.color.label.normal,
      },

      ['>svg']: {
        width: '16px',
        marginLeft: '2px',
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

export { HeaderContainer, HeaderContents, HeaderMenuContainer, HeaderTitleContainer, HeaderButtonContainer };
