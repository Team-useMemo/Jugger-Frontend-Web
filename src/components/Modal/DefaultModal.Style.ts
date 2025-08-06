import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const DefaultModalLayout = styled.div({
  maxHeight: '100dvh',
  maxWidth: '100dvw',
  boxSizing: 'border-box',
  padding: '64px',
  display: 'flex',
  // overflow: 'hidden',

  [media[480]]: {
    padding: '0',
    width: '100%',
    height: '100%',
  },
});

const DefaultModalContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],

    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },

    [media[480]]: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  ({ maxWidth }: { maxWidth?: string }) => ({
    maxWidth: maxWidth ?? '',
    width: maxWidth ? '100vw' : '',
    [media['480']]: {
      maxWidth: '100dvw',
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
    borderRadius: theme.radius[16],
    boxSizing: 'border-box',

    ['>svg']: {
      marginLeft: 'auto',
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      flexShrink: '0',
      cursor: 'pointer',
    },

    [':focus']: {
      outline: 'none',
    },

    [media['480']]: {
      borderRadius: '0',
      padding: '0px',
      width: '100%',
      height: '100%',
    },
  },
);

const DefaultModalHeader = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      cursor: 'pointer',
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    padding: '14px 12px',
    display: 'flex',
    flexShrink: '0',
    position: 'relative',
    zIndex: '1',
    gap: '4px',
    alignItems: 'center',

    ['.grow']: {
      flexGrow: '1',
    },

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>p']: {
      ...theme.font.body1normal.medium,
      margin: '0 8px 0 0',
    },
  },
);

const DefaultModalHeaderTitle = styled.div(
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

        [media[480]]: {
          marginRight: '6px',
        },
      },
    },
  {
    position: 'absolute',
    width: '100%',
    padding: '0 72px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '50%',
    transform: 'translateX(-50%)',

    ['>p']: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      margin: '0',
      ...theme.font.body2normal.semibold,
    },

    ['>svg']: {
      width: '16px',
      height: 'auto',
      aspectRatio: '1 / 1',
      flexShrink: '0',
    },

    [media[480]]: {
      maxWidth: 'calc(100% - 72px * 2)',
      padding: '0',
      ['>svg']: {
        marginLeft: '2px',
      },
    },
  },
);

export { DefaultModalLayout, DefaultModalContainer, DefaultModalHeader, DefaultModalHeaderTitle };
