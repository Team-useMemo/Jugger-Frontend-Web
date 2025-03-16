import styled from '@emotion/styled';

export const StyledHeader = styled.header({
  width: '100%',
  height: '64px',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  boxSizing: 'border-box',

  borderBottom: '1px solid #ddd' /* 구분선 추가 */,
});

const HeaderContainer = styled.div({
  width: '100%',
  maxWidth: '1280px',
  margin: '0 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const HeaderLogo = styled.div({
  width: '300px',
  display: 'flex',
  alignItems: 'left',
  boxSizing: 'border-box',

  ['> svg']: {
    cursor: 'pointer',
    width: 'auto',
    height: '30px',
    margin: '0 5px',
  },
});

const IconContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  ['> svg']: {
    cursor: 'pointer',
    width: '24px',
    height: '24px',
  },
});

export { HeaderContainer, HeaderLogo, IconContainer };
