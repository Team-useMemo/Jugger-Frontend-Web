import styled from '@emotion/styled';
import { theme } from '@styles/theme';

export const MenuItem = styled.div({
  display: 'flex',
  padding: '12px 24px',
  alignItems: 'center',
  gap: '16px',
  cursor: 'pointer',

  [':hover']: {
    background: theme.color.background.alternative,
  },
});

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuTitle = styled.span`
  color: var(--label-normal, #171719);
  font-feature-settings: 'ss10' on;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
