import styled from '@emotion/styled';
import { theme } from '@styles/theme';

// MemoDetailImage

export const MemoDetailImageContainer = styled.div({
  display: 'flex',
  margin: '24px 0',
  width: '100%',
  background: '',
  justifyContent: 'center',
  ['img']: {
    maxWidth: '480px',
    maxHeight: '480px',
  },
});

export const MemoDetailImageButtonContainer = styled.div({
  width: '100%',
  padding: '0 32px',
  display: 'flex',
  gap: '15px',
  boxSizing: 'border-box',
});

export const GrowDiv = styled.div({
  flexGrow: '1',
});

// MemoAddImage

export const MemoAddImageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '0 32px',
  width: '450px',
  boxSizing: 'border-box',
  textAlign: 'left',
});

export const MemoAddImageContents = styled.div({
  width: '100%',
  borderRadius: theme.radius[12],
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const MemoAddImageEmptyContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.color.material.dimmer,
  color: theme.color.label.inverse,
  height: '320px',
  gap: '12px',
});
