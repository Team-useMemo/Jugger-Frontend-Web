import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const InfoContainer = styled.div({
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

export const Label = styled.label({
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
  display: 'block',
  textAlign: 'left',
});

export const InputWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
  width: '100%',
});

export const Input = styled.input<{ hasValue: boolean }>(({ hasValue }) => ({
  display: 'inline-block',
  width: '100%',
  padding: '10px 36px 10px 12px',
  border: `1px solid ${hasValue ? '#0057FF' : '#ddd'}`,
  borderRadius: 8,
  fontSize: 14,
  background: '#f1f3f4',
  '&:focus': {
    borderColor: '#0057ff',
    outline: 'none',
  },
}));

export const ClearButton = styled.button({
  position: 'absolute',
  top: '50%',
  right: -4,
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 16,
});

export const ButtonGroup = styled.div({
  display: 'flex',
  gap: 8,
  marginBottom: 16,
});

export const Button = styled.button<{ selected?: boolean }>(({ selected }) => ({
  flex: 1,
  padding: 10,
  background: selected ? '#E6F0FF' : '#f1f3f4',
  color: selected ? '#0057FF' : '#333',
  border: `1px solid ${selected ? '#0057FF' : '#ddd'}`,
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 500,
}));

export const Select = styled.select({
  display: 'inline-block',
  width: '100%',
  padding: '10px 12px',
  marginBottom: 16,
  border: '1px solid #ddd',
  borderRadius: 8,
  fontSize: 14,
});

export const SubmitButton = styled.button({
  width: '100%',
  padding: 12,
  background: '#0057ff',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
});
