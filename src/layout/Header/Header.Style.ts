import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const StyledHeader = styled.div({
  height: '78px',
  display: 'flex',
  padding: '28px 24px 20px',
  borderBottom: '1px solid #E0E0E2',
  justifyContent: 'space-between',
  boxSizing: 'border-box',

  ['>svg']: {
    display: 'none',
  },
  [media[480]]: { ['>svg']: { display: 'block' } },
});

export const HeaderTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textAlign: 'left',
  color: '#000000',
  fontSize: '22px',
  fontWeight: '600',
  lineHeight: '1.32',
});

export const HeaderTitleCircle = styled.span(
  ({ color }: { color: string }) => ({
    background: color,
  }),
  {
    width: '8px',
    height: '8px',
    borderRadius: '4px',
  },
);

export const HeaderButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',

  ['svg']: {
    cursor: 'pointer',
    width: '24px',
    height: '24px',
  },
});
