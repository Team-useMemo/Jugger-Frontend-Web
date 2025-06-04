import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const TermsContainer = styled.div({
  padding: 24,
  background: '#fff',
  borderRadius: 12,
  width: 384,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

  [media[480]]: {
    width: '100%',
    padding: 16,
  },
});

export const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  h2: {
    fontSize: 24,
  },
});

export const Content = styled.div({
  marginTop: 10,
  gap: 10,
});

export const Checkbox = styled.label({
  display: 'flex',
  alignItems: 'center',
  margin: '16px 0',
  input: {
    marginRight: 10,
    accentColor: '#aaa',
    borderRadius: '50%',
    width: 18,
    height: 18,
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
