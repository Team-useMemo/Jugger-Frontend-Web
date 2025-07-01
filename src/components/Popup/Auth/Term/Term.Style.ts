import styled from '@emotion/styled';
import { media, theme } from '@styles/theme';

export const TermsContainer = styled.div({
  padding: '24px',
  background: '#fff',
  borderRadius: '12px',
  width: '384px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

  [media[480]]: {
    width: '100%',
    padding: '16px',
    boxSizing: 'border-box',
  },
});

export const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  h2: {
    fontSize: '24px',
  },
});

export const Content = styled.div({
  marginTop: '10px',
  gap: '10px',
});

export const Checkbox = styled.label({
  display: 'flex',
  alignItems: 'center',
  margin: '16px 0',
  input: {
    marginRight: '10px',
    accentColor: '#aaa',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    flexShrink: 0,
  },
  span: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  '& > span:first-of-type': {
    flex: 1,
  },
});

export const RightText = styled.span({
  marginLeft: 'auto',
  fontSize: 12,
  color: '#555',
  cursor: 'pointer',
});

export const DividerLine = styled.hr({
  border: 'none',
  borderTop: '1px solid #ddd',
  margin: '10px 0',
});

export const ButtonWrapper = styled.div({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
});

export const CompleteButton = styled.button({
  backgroundColor: '#0055d4',
  color: '#fff',
  padding: '10px 40px',
  border: 'none',
  borderRadius: 6,
  fontSize: 16,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0041a8',
  },
});

export const TermDetailModalOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const TermDetailModalContent = styled.div({
  background: '#FFFFFF',
  padding: '32px',
  maxWidth: '90%',
  width: '448px',
  borderRadius: '8px',
  textAlign: 'left',

  [media[480]]: {
    width: '100%',
    padding: '16px',
    boxSizing: 'border-box',
    maxHeight: '80%',
    overflowY: 'scroll',
  },
});

export const TermDetailTitle = styled.div({
  ...theme.font.title3.bold,
});

export const TermCheckboxWrapper = styled.div({
  marginBottom: '24px',
});

export const TermDetailHeader = styled.div({
  display: 'flex',
  justifyContent: 'flex-end', // 오른쪽 정렬
});

export const CloseButton = styled.button({
  backgroundColor: 'transparent',
  padding: 0,
});

export const ConfirmButton = styled.button({
  color: theme.color.background.normal,
  backgroundColor: theme.color.primary.normal,
  marginTop: '16px',
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  cursor: 'pointer',
});

export const TermDetailTextBox = styled.div({
  ...theme.font.body1normal.medium,
  textAlign: 'left',
  whiteSpace: 'pre-wrap',
});

export const TermDetailSemiBoldText = styled.p({
  ...theme.font.body1normal.semibold,
});
