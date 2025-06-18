import { ModalComponentProps } from '@hooks/useParamModal';
import CloseSVG from '@assets/icons/close.svg?react';
import { MemoViewerContainer, MemoViewerContents, MemoViewerTitle } from '../MemoViewer.Style';
import { MemoDetailTextContainer, MemoDetailTextContents } from './DetailTextMemo.Style';

const DetailTextMemo = ({ closeModal, props }: ModalComponentProps) => {
  return (
    <MemoViewerContainer>
      <CloseSVG onClick={closeModal} />
      <MemoViewerContents>
        {props.title && <MemoViewerTitle>{props.title}</MemoViewerTitle>}
        <MemoDetailTextContainer>
          <MemoDetailTextContents>{props.text}</MemoDetailTextContents>
        </MemoDetailTextContainer>
      </MemoViewerContents>
    </MemoViewerContainer>
  );
};

export default DetailTextMemo;
