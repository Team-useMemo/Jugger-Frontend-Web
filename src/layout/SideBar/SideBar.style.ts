import styled from '@emotion/styled';

export const StyledSideBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '349px',
  height: '100%',
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
