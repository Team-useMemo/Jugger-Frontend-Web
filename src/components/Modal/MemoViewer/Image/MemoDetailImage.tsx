import CloseSVG from '@assets/icons/close.svg?react';
import CategorySVG from '@assets/icons/category.svg?react';
import ExpandSVG from '@assets/icons/expand.svg?react';
import DownloadSVG from '@assets/icons/download.svg?react';
import { MemoViewerCloseContainer, MemoViewerContainer } from '../MemoViewer.Style';
import { GrowDiv, MemoDetailImageButtonContainer, MemoDetailImageContainer } from './MemoViewerImage.Style';

const MemoDetailImage = ({ closeModal, props }: { closeModal: () => void; props: { image: string } }) => {
  return (
    <MemoViewerContainer>
      <MemoViewerCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoViewerCloseContainer>
      <MemoDetailImageContainer>
        <img src={props.image} />
      </MemoDetailImageContainer>
      <MemoDetailImageButtonContainer>
        <CategorySVG />
        <ExpandSVG />
        <GrowDiv />
        <DownloadSVG />
      </MemoDetailImageButtonContainer>
    </MemoViewerContainer>
  );
};

export default MemoDetailImage;
