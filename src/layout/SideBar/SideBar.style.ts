import styled from '@emotion/styled';
import { media } from '@styles/theme';

export const StyledSideBar = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    height: '100%',
    background: '#989BA288',

    [media[0]]: {
      width: '100%',
      position: 'absolute',
    },
  },
  ({ active }: { active: boolean }) => ({
    [media[0]]: {
      left: active ? '0' : '',
      right: active ? '' : '100%',
    },
  }),
);

export const SideBarContainer = styled.div({
  height: '100%',
  background: 'white',
  [media[0]]: { width: '315px' },
});

export const SideBarHeader = styled.div({
  display: 'flex',
  padding: '28px 24px 20px',
  borderBottom: '1px solid #E0E0E2',
  height: '78px',
  boxSizing: 'border-box',
});

export const SideBarContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  flex: 1,
  borderRight: '1px solid #E0E0E2',
  height: 'calc(100% - 78px)',

  ['::-webkit-scrollbar']: {
    opacity: '0',
    width: '12px',
    backgroundColor: '#FCFCFC',
    borderLeft: '1px solid #E8E8E8',
  },

  ['::-webkit-scrollbar-thumb']: {
    backgroundColor: '#7A7A7A',
    borderRadius: '100px',
    backgroundClip: 'padding-box',
    border: '3px solid transparent',

    [':hover']: {
      backgroundColor: '#AAAAAA',
    },
  },
});

export const AddCategoryButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: 'calc(100% - 32px)', // 양쪽 패딩 포함 여백 확보
  margin: '12px 16px',
  padding: '12px 16px',
  gap: '4px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  background: 'var(--primary-Normal, #0054D1)',
  color: '#FFFFFF',
  border: 'none',
  cursor: 'pointer',

  '&:hover': {
    background: '#0046B5',
  },
});

export const MessageSection = styled.div({
  marginTop: '12px',
  padding: '0 10px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignSelf: 'stretch',
  maxWidth: '100%',
});
