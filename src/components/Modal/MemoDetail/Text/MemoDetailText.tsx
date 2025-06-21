import { ModalComponentProps } from '@hooks/useParamModal';
import { useIsMobile } from '@hooks/useWindowSize';
import {
  DefaultModalContainer,
  DefaultModalHeader,
  DefaultModalHeaderTitle,
  DefaultModalLayout,
} from '@components/Modal/DefaultModal.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import LeftArrosSVG from '@assets/icons/left_arrow.svg?react';
import { MemoDetailTextContainer, MemoDetailTextContents } from './MemoDetailText.Style';

const MemoDetailText = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isMobile = useIsMobile();
  const { content } = props ?? {};
  const { title } = content ?? {};

  return (
    <DefaultModalLayout>
      <DefaultModalContainer ref={modalRef} maxWidth="440px">
        {!isMobile ? (
          <CloseSVG onClick={closeModal} />
        ) : (
          <DefaultModalHeader>
            <LeftArrosSVG onClick={closeModal} />
            <DefaultModalHeaderTitle>
              <p>전체보기</p>
            </DefaultModalHeaderTitle>
          </DefaultModalHeader>
        )}
        <MemoDetailTextContainer>
          {title}
          <MemoDetailTextContents>{content}</MemoDetailTextContents>
        </MemoDetailTextContainer>
      </DefaultModalContainer>
    </DefaultModalLayout>
  );
};

export default MemoDetailText;
