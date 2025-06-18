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

export const MemoItemDateContainer = styled.div({
  padding: '12px 8px',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  ['::before,::after']: {
    content: '""',
    flexGrow: '1',
    background: theme.color.line.normal,
    height: '1px',
  },

  [media[480]]: {
    padding: '12px 20px',
  },
});

export const MemoItemDateContents = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',

  ...theme.font.label1normal.medium,
  color: theme.color.label.assistive,

  width: '100%',
  maxWidth: '1080px',

  ['::before']: {
    content: '""',
    width: '20px',
    background: theme.color.line.normal,
    height: '1px',
  },

  ['::after']: {
    content: '""',
    flexGrow: '1',
    background: theme.color.line.normal,
    height: '1px',
  },

  [media[480]]: {
    ['::before']: {
      width: 'auto',
      flexGrow: '1',
    },
  },
});

// MemoPageBottom

export const MemoPageBottomContainer = styled.div({
  background: theme.color.background.normal,
  maxWidth: '1080px',
  width: '100%',
  minWidth: '0',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: '24px',
  gap: '12px',

  [media[480]]: {
    padding: '16px 20px 24px',
  },
});

export const MemoPageBottomButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',

  ['svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },
});

export const MemoPageBottomInputContainer = styled.div({
  background: theme.color.background.alternative,
  width: '100%',
  display: 'flex',
  borderRadius: theme.radius[12],
  padding: '10px 20px',
  alignItems: 'center',

  ['textarea']: {
    ...theme.font.body2normal.medium,
    color: theme.color.label.normal,
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

    ['::placeholder']: {
      color: theme.color.label.assistive,
    },

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
});
