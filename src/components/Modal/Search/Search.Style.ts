import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 24px 24px',
});

export const InputWrapper = styled.div({
  position: 'relative',
  width: '100%',
});

export const IconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  pointerEvents: 'none',
});

export const SearchInputWrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  backgroundColor: '#F7F7F8',
  borderRadius: '8px',
  border: '1px solid #ccc',
  padding: '8px 12px',
  gap: '8px',
  width: 'auto',
  '&:focus-within': {
    borderColor: '#0054D1',
  },
});

export const SearchInput = styled.input({
  flex: 1,
  padding: '12px 0',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '15px',
  transition: 'border 0.2s',
  backgroundColor: 'transparent',
  minWidth: 0,
});

export const SelectedCategoryTag = styled.div<{ color: string }>(({ color }) => ({
  padding: '4px 8px',
  backgroundColor: `${color}1A`,
  borderRadius: '999px',
  fontSize: '13px',
  fontWeight: 500,
  color: '#2D2D2D',
  minWidth: 0,
  maxWidth: '160px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  '&::before': {
    content: "''",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: color,
  },
}));

export const SectionTitle = styled.div({
  fontSize: '15px',
  fontWeight: 600,
  marginBottom: '4px',
  textAlign: 'left',
});

export const TagGrid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

export const CategoryTag = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 14px',
  fontSize: '15px',
  fontWeight: 500,
  backgroundColor: `${color}1A`,
  borderRadius: '999px',
  cursor: 'pointer',
  color: '#2D2D2D',
  userSelect: 'none',
  gap: '8px',
  lineHeight: '1.2',
  whiteSpace: 'nowrap',
  border: '1px solid transparent',

  '&::before': {
    content: "''",
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
  },
}));

export const ResultLayout = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '32px',
  marginTop: '20px',
  paddingBottom: '8px',
  borderTop: '1px solid #E0E0E0',
  paddingTop: '16px',
});

export const ResultList = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  flex: 1,
});

export const ResultItem = styled.li({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  color: '#222',
  lineHeight: 1.4,
  gap: '6px',
});

export const ResultIconWrapper = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  marginRight: '4px',
});

export const ResultText = styled.span({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '300px',

  [media[0]]: {
    maxWidth: '100px',
  },
});

export const Highlight = styled.span({
  color: '#0054D1',
  fontWeight: 500,
});

export const Legend = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#333',
});

export const LegendDot = styled.div<{ color: string }>(({ color }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
}));
