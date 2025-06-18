import { ModalComponentProps } from '@hooks/useParamModal';
import CategorySVG from '@assets/icons/category.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import DownloadSVG from '@assets/icons/download.svg?react';
import ExpandSVG from '@assets/icons/expand.svg?react';
import { MemoViewerContainer } from '../MemoViewer.Style';
import {
  DetailImageMemoButtonContainer,
  DetailImageMemoContainer,
  DetailImageMemoImageContainer,
} from './ViewerImageMemo.Style';

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
