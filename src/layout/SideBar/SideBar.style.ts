import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const SideBarContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '360px',
  height: '100%',
  background: theme.color.background.normal,
  [media[480]]: {
    width: '315px',
    height: '100dvh',
  },
});

export const SideBarHeader = styled.div({
  display: 'flex',
  padding: '28px 24px 20px',
  borderBottom: '1px solid #E0E0E2',
  height: '78px',
  boxSizing: 'border-box',

  ['>img']: {
    width: '100%',
    objectFit: 'contain',
    objectPosition: 'left',
  },

  [media[480]]: {
    borderBottom: 'none',
    borderRight: '1px solid #E0E0E2',

    padding: '20px 24px 16px',
    height: 'auto',

    ['>img']: {
      width: '105px',
    },
  },
});

export const SideBarContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'hidden',
  flex: 1,
  borderRight: '1px solid #E0E0E2',
  padding: '16px 0',
  gap: '16px',
  boxSizing: 'border-box',

  ['::-webkit-scrollbar']: {
    opacity: '0',
    width: '12px',
    backgroundColor: '#FCFCFC',
    borderLeft: '1px solid #E8E8E8',
  },

  ['::-webkit-scrollbar-thumb']: {
    backgroundColor: '#7A7A7A',
    borderRadius: '100px',
    backgroundClip: 'padding-box',
    border: '3px solid transparent',

    [':hover']: {
      backgroundColor: '#AAAAAA',
    },
  },

  ['>button']: {
    margin: '0 24px',
  },

  [media[480]]: {
    padding: '0 0 16px',
  },
});

export const SideBarMenuContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const SideBarMenuItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '12px 24px',
  cursor: 'pointer',

  ...theme.font.body2normal.semibold,
  color: theme.color.label.normal,

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  [':hover']: {
    background: theme.palette.blue[99],
  },
});

export const SideBarCategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
