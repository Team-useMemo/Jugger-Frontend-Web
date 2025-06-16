import styled from '@emotion/styled';
import { ModalComponentProps } from '@hooks/useParamModal';
import CategorySVG from '@assets/icons/category.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import DownloadSVG from '@assets/icons/download.svg?react';
import ExpandSVG from '@assets/icons/expand.svg?react';
import { MemoViewerContainer } from '../MemoViewer.Style';

const DetailImageMemoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginTop: '24px',
  width: '100%',
});

const DetailImageMemoImageContainer = styled.div({
  width: '100%',
  overflow: 'hidden',

  ['>img']: {
    maxHeight: '480px',
    width: '100%',
    objectFit: 'contain',
  },
});

const DetailImageMemoButtonContainer = styled.div({
  display: 'flex',
  gap: '15px',
  padding: '0 32px',
  ['.grow']: {
    flexGrow: '1',
  },
});

const DetailImageMemo = ({ closeModal, props }: ModalComponentProps) => {
  return (
    <MemoViewerContainer>
      <CloseSVG onClick={closeModal} />
      <DetailImageMemoContainer>
        <DetailImageMemoImageContainer>
          <img src={props.image} />
        </DetailImageMemoImageContainer>
        <DetailImageMemoButtonContainer>
          <CategorySVG />
          <ExpandSVG />
          <div className="grow" />
          <DownloadSVG />
        </DetailImageMemoButtonContainer>
      </DetailImageMemoContainer>
    </MemoViewerContainer>
  );
};

export default DetailImageMemo;
