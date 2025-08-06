import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const MemoPageContainer = styled.div({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

// MemoList

export const MemoListContainer = styled.div({
  gap: '12px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '24px 0 0',
  overflowY: 'scroll',
  width: '100%',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  [media[480]]: {
    gap: '12px',
    padding: '16px 0 0',
  },
});

export const MemoItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
});

export const MemoItemDateContainer = styled.div(
  ({ theme }) => ({
    ['::before,::after']: {
      background: theme.mode === 'light' ? theme.color.line.normal : theme.color.label.alternative,
    },
  }),
  {
    padding: '12px 8px',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ['::before,::after']: {
      content: '""',
      flexGrow: '1',
      height: '1px',
    },

    [media[480]]: {
      padding: '12px 20px',
    },
  },
);

export const MemoItemDateContents = styled.div(
  ({ theme }) => ({
    color: theme.color.label[theme.mode === 'light' ? 'assistive' : 'alternative'],
    ['::before,::after']: {
      background: theme.mode === 'light' ? theme.color.line.normal : theme.color.label.alternative,
    },
  }),
  {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',

    ...theme.font.label1normal.medium,

    width: '100%',
    maxWidth: '1080px',

    ['::before']: {
      content: '""',
      width: '20px',
      height: '1px',
    },

    ['::after']: {
      content: '""',
      flexGrow: '1',
      height: '1px',
    },

    [media[480]]: {
      ['::before']: {
        width: 'auto',
        flexGrow: '1',
      },
    },
  },
);

// MemoPageBottom

export const MemoPageBottomContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'normal' : 'inverse'],
  }),
  {
    maxWidth: '1080px',
    width: '100%',
    minWidth: '0',
    boxSizing: 'border-box',
    padding: '24px',

    [media[480]]: {
      padding: '16px 20px 24px',
    },
  },
);

export const MemoPageBottomContents = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  [media[480]]: {
    position: 'relative',
  },
});

export const MemoPageBottomButtonContainer = styled.div(
  ({ theme }) => ({
    ['>svg']: {
      stroke: theme.color.label[theme.mode === 'light' ? 'normal' : 'inverse'],
    },
  }),
  {
    display: 'flex',
    gap: '12px',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
    },
  },
);

export const MemoPageBottomInputContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.background[theme.mode === 'light' ? 'alternative' : 'alternativeinverse'],

    ['>textarea']: {
      ['::placeholder']: {
        color: theme.color.label[theme.mode === 'light' ? 'assistive' : 'alternative'],
      },
    },
  }),
  {
    width: '100%',
    display: 'flex',
    borderRadius: theme.radius[12],
    padding: '10px 20px',
    alignItems: 'center',

    ['>textarea']: {
      ...theme.font.body2normal.medium,
      height: '22px',
      padding: '0',
      margin: '0',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      outline: 'none',
      background: 'none',
      resize: 'none',
      maxHeight: '160px',
      minWidth: '0',

      ['::-webkit-scrollbar']: {
        display: 'none',
      },
    },

    ['svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
    },
  },
);
