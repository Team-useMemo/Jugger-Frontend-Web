import styled from '@emotion/styled';

const BottomTransparentContainer = styled.div({
  position: 'absolute',
  left: '0px',
  width: '100%',
  top: '100%',
  boxSizing: 'border-box',
  zIndex: 1000,
});

const BottomTransparent = ({ children }: { children: React.ReactNode }) => {
  return <BottomTransparentContainer>{children}</BottomTransparentContainer>;
};

export default BottomTransparent;
