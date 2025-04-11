import { MemoViewerCloseContainer, MemoViewerContainer } from '../MemoViewer.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import { MemoDetailTextContainer, MemoDetailTextContents, MemoDetailTextTitle } from './MemoDetailText.Style';

const MemoDetailText = ({ closeModal, props }: { closeModal: () => void; props: any }) => {
  return (
    <MemoViewerContainer>
      <MemoViewerCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoViewerCloseContainer>
      <MemoDetailTextContainer>
        <MemoDetailTextTitle>4월 여행계획</MemoDetailTextTitle>
        <MemoDetailTextContents>{props.text}</MemoDetailTextContents>
      </MemoDetailTextContainer>
    </MemoViewerContainer>
  );
};

export default MemoDetailText;
