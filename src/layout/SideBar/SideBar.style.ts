import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const SideBarContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],

    [media[480]]: {
      background: theme.color.background[theme.mode === 'light' ? 'normal' : 'alternativeinverse'],
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    width: '360px',
    height: '100%',
    [media[480]]: {
      width: '315px',
      height: '100dvh',
    },
  },
);

export const SideBarHeader = styled.div(
  ({ theme }) => ({
    borderBottom: `1.5px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,
    ['>svg']: {
      fill: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
    [media[480]]: {
      borderRight: `1.5px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,
    },
  }),
  {
    display: 'flex',
    padding: '24px 24px 20px',
    height: '78px',
    boxSizing: 'border-box',

    ['>svg']: {
      cursor: 'pointer',
      width: '113px',
      aspectRatio: 'auto',
      height: 'auto',
      padding: '0',
      flexShrink: '0',
    },

    [media[480]]: {
      borderBottom: 'none',

      padding: '20px 24px 16px',
      height: 'auto',

      ['>img']: {
        width: '105px',
      },
    },
  },
);

export const SideBarSearchContainer = styled.label(
  ({ theme }) => ({
    background: theme.mode === 'light' ? theme.color.background.alternative : theme.color.label.neutral,

    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'alternative'],
    },
  }),
  {
    margin: '12px 16px',
    boxSizing: 'border-box',
    padding: '16px 12px',
    borderRadius: theme.radius[8],
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    ['>svg']: {
      width: '20px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>input']: {
      background: 'transparent',
      border: 'none',

      ...theme.font.body2normal.medium,

      [':focus']: {
        outline: 'none',
      },

      ['::placeholder']: {
        color: theme.color.label.alternative,
      },
    },
  },
);

export const SideBarContents = styled.div(
  ({ theme }) => ({
    borderRight: `1.5px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,

    ['::-webkit-scrollbar']: {
      backgroundColor: theme.mode === 'light' ? '#FCFCFC' : '#333333ff',
      borderLeft: `1.5px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,
    },

    [media[480]]: {
      ['::-webkit-scrollbar']: {
        border: `1.5px solid ${theme.color.line[theme.mode === 'light' ? 'normal' : 'neutral']}`,
      },
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1,
    padding: '16px 0',
    gap: '16px',
    boxSizing: 'border-box',

    ['::-webkit-scrollbar']: {
      opacity: '0',
      width: '12px',
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
  },
);

export const SideBarMenuContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const SideBarMenuItemContainer = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
    [':hover']: {
      background: theme.mode === 'light' ? theme.palette.blue[99] : theme.palette.coolneutral[22],
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 24px',
    cursor: 'pointer',

    ...theme.font.body2normal.semibold,

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

export const SideBarCategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
