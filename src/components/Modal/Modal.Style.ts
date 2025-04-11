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
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,

  [media[0]]: {
    width: '90%',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    overflowY: 'auto',
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

export const CategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  width: '450px',
  textAlign: 'left',
  padding: '0 32px',
  boxSizing: 'border-box',

  [media[0]]: {
    width: '100%',
    padding: '0 24px',
  },
});

export const CategorylItemList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const CategoryItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const CategoryItemTitle = styled.p({
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
});

export const CategoryItemContent = styled.div({
  boxSizing: 'border-box',
  background: '#F7F7F8',
  padding: '11px 14px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',

  ['>input']: {
    background: 'none',
    outline: 'none',
    border: 'none',
    margin: '0',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '1.5',
    width: '100%',
    color: '#171719',
  },
});
