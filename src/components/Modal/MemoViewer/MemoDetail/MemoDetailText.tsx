import CloseSVG from '@assets/icons/close.svg?react';
import { MemoViewerContainer } from '../MemoViewer.Style';
import { MemoDetailTextContainer, MemoDetailTextContents, MemoDetailTextTitle } from './MemoDetailText.Style';

const MemoDetailText = ({ closeModal, props }: { closeModal: () => void; props: any }) => {
  return (
    <MemoViewerContainer>
      <CloseSVG onClick={closeModal} />
      <MemoDetailTextContainer>
        <MemoDetailTextTitle>{props.categoryName}</MemoDetailTextTitle>
        <MemoDetailTextContents>{props.text}</MemoDetailTextContents>
      </MemoDetailTextContainer>
    </MemoViewerContainer>
  );
};

export default MemoDetailText;
