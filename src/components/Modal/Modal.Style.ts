import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const MemoModalContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  background: 'white',
  borderRadius: '16px',
  padding: '32px 0',
  outline: 'none',

  [media[0]]: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    overflowY: 'auto',
    zIndex: 1000,
  },
});

export const MemoModalCloseContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  padding: '0 32px',
  boxSizing: 'border-box',

  ['svg']: {
    cursor: 'pointer',
  },
});

export const MemoModalButton = styled.button({
  background: '#0054D1',
  width: '100%',
  fontSize: '18px',
  color: 'white',
  fontWeight: '500',
  lineHeight: '1.45',
  borderRadius: '6px',
  padding: '12px',
  boxSizing: 'border-box',
  margin: '0',
  textAlign: 'center',

  [':focus']: {
    outline: 'none',
  },
});

export const MemoModalTitle = styled.p({
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.36',
  margin: '0',
});
