import styled from '@emotion/styled';

const FullGrayLeftComponentContainer = styled.div({
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

const FullGrayLeftComponent = ({ children }: { children: React.ReactNode }) => {
  return <FullGrayLeftComponentContainer>{children}</FullGrayLeftComponentContainer>;
};

export default FullGrayLeftComponent;
