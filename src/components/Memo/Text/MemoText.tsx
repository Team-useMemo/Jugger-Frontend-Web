import { useEffect, useRef, useState } from 'react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import useModal from '@hooks/useModal';
import MemoDetailText from '@components/Modal/MemoViewer/MemoDetail/MemoDetailText';
import { MemoTextContainer, MemoTextContents, MemoTextMoreButton, MemoTextMoreDivideLine } from './MemoText.Style';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';

const MemoText = ({ content }: { content: string }) => {
  const memoRef = useRef<HTMLParagraphElement>(null);
  const [MemoDetailTextModal, openMemoDetailTextModal] = useModal(FullScreenGray, MemoDetailText, [], {
    text: content,
  });
  const [activeMore, setActiveMore] = useState(false);

  useEffect(() => {
    if (!memoRef.current) return;
    setActiveMore(memoRef.current.scrollHeight > memoRef.current.clientHeight);
  }, []);

  return (
    <>
      <MemoDetailTextModal />
      <MemoTextContainer>
        <MemoTextContents ref={memoRef}>{content}</MemoTextContents>
        {activeMore && (
          <>
            <MemoTextMoreDivideLine />
            <MemoTextMoreButton onClick={openMemoDetailTextModal}>
              전체 보기
              <RightArrowSVG fill="white" />
            </MemoTextMoreButton>
          </>
        )}
      </MemoTextContainer>
    </>
  );
};

export default MemoText;
