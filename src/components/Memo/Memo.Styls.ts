import styled from '@emotion/styled';

export const MemoContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '0 24px',
  gap: '6px',
  alignItems: 'end',
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'border-box',
});

export const MemoCategoryContainer = styled.div(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: '500',
  lineHeight: '1.27',
  color: '#878A93',

  ['span']: {
    padding: '4px',
    background: color,
    margin: '0',
    borderRadius: '32px',
  },
}));

export const MemoContent = styled.div({
  borderRadius: '12px',
  overflow: 'hidden',
  maxWidth: '680px',
});
