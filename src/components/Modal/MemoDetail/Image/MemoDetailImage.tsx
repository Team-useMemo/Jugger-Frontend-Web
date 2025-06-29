import { ModalComponentProps } from '@hooks/useParamModal';
import CategorySVG from '@assets/icons/category.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import DownloadSVG from '@assets/icons/download.svg?react';
import ExpandSVG from '@assets/icons/expand.svg?react';
import { MemoDetailContainer, MemoDetailLayout } from '../MemoDetail.Style';
import {
  MemoDetailImageButtonContainer,
  MemoDetailImageContainer,
  MemoDetailImageContents,
  MemoTitle,
  MemoTitleContainer,
} from './MemoDetailImage.Style';

const MemoDetailImage = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const { title, content } = props ?? {};
  return (
    <MemoDetailLayout>
      <MemoDetailContainer ref={modalRef}>
        <CloseSVG onClick={closeModal} />
        <MemoDetailImageContainer>
          <MemoDetailImageContents>
            <img src={content} />
          </MemoDetailImageContents>
          <MemoTitleContainer>
            <MemoTitle>{title}</MemoTitle>
          </MemoTitleContainer>
          <MemoDetailImageButtonContainer>
            <CategorySVG />
            <ExpandSVG />
            <span className="grow" />
            <DownloadSVG />
          </MemoDetailImageButtonContainer>
        </MemoDetailImageContainer>
      </MemoDetailContainer>
    </MemoDetailLayout>
  );
};

export default MemoDetailImage;
