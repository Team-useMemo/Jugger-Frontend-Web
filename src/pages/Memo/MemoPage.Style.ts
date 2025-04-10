import styled from '@emotion/styled';

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
  borderBottom: '1px solid #E0E0E2',
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
    color: '#C2C4C8',
    fontSize: '14px',
    fontWeight: '500',
  },
});

export const MemoDateDivideLine = styled.span({
  borderBottom: '1px solid #E0E0E2',
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
  background: '#F7F7F8',
  width: '100%',
  display: 'flex',
  borderRadius: '12px',
  padding: '10px 20px',
  alignItems: 'center',

  ['textarea']: {
    fontSize: '15px',
    height: '22px',
    padding: '0',
    lineHeight: '1.47',
    margin: '0',
    flexGrow: '1',
    textAlign: 'left',
    border: 'none',
    outline: 'none',
    background: 'none',
    resize: 'none',
    color: '#171719',
    maxHeight: '160px',

    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  },

  ['svg']: {
    cursor: 'pointer',
  },
});
