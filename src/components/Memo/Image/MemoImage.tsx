import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import CloseSVG from '@assets/icons/close.svg?react';

const MemoImageContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
  ['img']: {
    maxWidth: '320px',
    maxHeight: '240px',
  },
});

const AboutImageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  background: 'white',
  borderRadius: '16px',
  padding: '12px',
  gap: '8px',
  ['img']: {
    maxWidth: '640px',
    maxHeight: '480px',
    borderRadius: '12px',
  },
});

const AboutPhotoComponent = ({ closeModal, props }: { closeModal: () => void; props: { image: string } }) => {
  return (
    <AboutImageContainer>
      <CloseSVG onClick={closeModal} />
      <img src={props.image} />
    </AboutImageContainer>
  );
};

const MemoImage = ({ content }: { content: string }) => {
  const [AboutPhotoModal, openAboutPhotoModal] = useModal(AboutPhotoComponent, [], { image: content });

  return (
    <MemoImageContainer>
      <AboutPhotoModal />
      <img src={content} onClick={openAboutPhotoModal} />
    </MemoImageContainer>
  );
};

export default MemoImage;
