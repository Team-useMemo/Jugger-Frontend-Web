import styled from '@emotion/styled';

const ModalLayoutGrayContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  top: '0',
  background: '#989BA288',
  width: '100%',
  height: '100%',
  zIndex: 1,
});

const ModalLayoutGray = ({ children }: { children: React.ReactNode }) => {
  return <ModalLayoutGrayContainer>{children}</ModalLayoutGrayContainer>;
};

export default ModalLayoutGray;
