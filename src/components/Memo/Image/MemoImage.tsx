import AboutImage from '@components/Modal/AboutImage';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';

const MemoImageContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
  ['img']: {
    maxWidth: '320px',
    maxHeight: '240px',
  },
});

const MemoImage = ({ content }: { content: string }) => {
  const [AboutPhotoModal, openAboutPhotoModal] = useModal(AboutImage, [], { image: content });

  return (
    <>
      <AboutPhotoModal />
      <MemoImageContainer>
        <img src={content} onClick={openAboutPhotoModal} />
      </MemoImageContainer>
    </>
  );
};

export default MemoImage;
