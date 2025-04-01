import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import CloseSVG from '@assets/icons/close.svg?react';
import CategorySVG from '@assets/icons/category.svg?react';
import ExpandSVG from '@assets/icons/expand.svg?react';
import DownloadSVG from '@assets/icons/download.svg?react';

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
  alignItems: 'start',
  background: 'white',
  borderRadius: '16px',
  padding: '32px 0',
  ['img']: {
    margin: '24px 0',
    maxWidth: '480px',
    maxHeight: '480px',
  },
});

const AboutMoreCloseContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  padding: '0 32px',
  boxSizing: 'border-box',
});

const AboutMoreTitle = styled.p({
  margin: '0',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.36',
  textAlign: 'left',
  padding: '0 32px',
});

const AboutImageContent = styled.div({
  width: '100%',
  padding: '0 32px',
  display: 'flex',
  gap: '15px',
  boxSizing: 'border-box',
});

const GrowDiv = styled.div({
  flexGrow: '1',
});

const AboutPhotoComponent = ({ closeModal, props }: { closeModal: () => void; props: { image: string } }) => {
  return (
    <AboutImageContainer>
      <AboutMoreCloseContainer>
        <CloseSVG onClick={closeModal} />
      </AboutMoreCloseContainer>
      <AboutMoreTitle>4월 여행계획</AboutMoreTitle>
      <img src={props.image} />
      <AboutImageContent>
        <CategorySVG />
        <ExpandSVG />
        <GrowDiv />
        <DownloadSVG />
      </AboutImageContent>
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
