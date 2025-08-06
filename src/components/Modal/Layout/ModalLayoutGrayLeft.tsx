import styled from '@emotion/styled';

const ModalLayoutGrayLeftContainer = styled.div(
  ({ theme }) => ({
    background: theme.color.material.dimmer,
  }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: '20',
  },
);

const ModalLayoutGrayLeft = ({ children }: { children: React.ReactNode }) => {
  return <ModalLayoutGrayLeftContainer>{children}</ModalLayoutGrayLeftContainer>;
};

export default ModalLayoutGrayLeft;
