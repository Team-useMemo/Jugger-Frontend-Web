import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MemoPageContainer = styled.div({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

// MemoList

export const MemoListContainer = styled.div({
  gap: '16px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '24px 0',
  overflowY: 'scroll',
  width: '100%',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

export const MemoItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
});

export const MemoDateDivideContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  boxSizing: 'border-box',
  width: '100%',
});

export const MemoDateDivideLineTip = styled.span({
  borderBottom: `1px solid ${theme.color.line.normal}`,
  margin: '0',
  height: '0',
  minWidth: '20px',
  flexGrow: '1',
});

export const MemoDateDivideContents = styled.div({
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'content-box',
  display: 'flex',
  alignItems: 'center',

  ['p']: {
    margin: '0 12px',
    color: theme.color.label.assistive,
    ...theme.font.label1normal.medium,
  },
});

export const MemoDateDivideLine = styled.span({
  borderBottom: `1px solid ${theme.color.line.normal}`,
  margin: '0',
  height: '0',
  flexGrow: '1',
});

// MemoBottom

export const MemoBottomContainer = styled.div({
  maxWidth: '1080px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px 24px',
  gap: '12px',
});

export const MemoBottomButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',

  ['svg']: {
    cursor: 'pointer',
  },
});

export const MemoBottomInputContainer = styled.div({
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
    flexGrow: '1',
    textAlign: 'left',
    border: 'none',
    outline: 'none',
    background: 'none',
    resize: 'none',
    maxHeight: '160px',

    ['::placeholder']: {
      color: theme.color.label.assistive,
    },

    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  },

  ['svg']: {
    cursor: 'pointer',
  },
});
