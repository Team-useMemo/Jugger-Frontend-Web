import styled from '@emotion/styled';

const ModalLayoutGrayContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.material.dimmer,
  }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: 20,
  },
);

const ModalLayoutGray = ({ children }: { children: React.ReactNode }) => {
  return <ModalLayoutGrayContainer>{children}</ModalLayoutGrayContainer>;
};

export default ModalLayoutGray;
