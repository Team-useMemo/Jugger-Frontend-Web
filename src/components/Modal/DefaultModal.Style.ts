import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

const DefaultModalLayout = styled.div({
  maxHeight: '100dvh',
  maxWidth: '100dvw',
  boxSizing: 'border-box',
  padding: '64px',
  display: 'flex',
  overflow: 'hidden',

  [media[480]]: {
    padding: '0',
    width: '100%',
    height: '100%',
  },
});

const DefaultModalContainer = styled.div(
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
    background: theme.color.background.normal,
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

const DefaultModalHeader = styled.div({
  padding: '14px 12px',
  display: 'flex',
  flexShrink: '0',
  position: 'relative',

  ['.grow']: {
    flexGrow: '1',
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    stroke: theme.color.label.normal,
  },

  ['>p']: {
    ...theme.font.body1normal.medium,
    color: theme.color.primary.normal,
    margin: '0 8px 0 0',
  },
});

const DefaultModalHeaderTitle = styled.div({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%);',
  maxWidth: '100%',
  padding: '0 48px',
  boxSizing: 'border-box',

  ['>p']: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: '0',
    ...theme.font.body2normal.semibold,
    color: theme.color.label.normal,
  },
});

export { DefaultModalLayout, DefaultModalContainer, DefaultModalHeader, DefaultModalHeaderTitle };
