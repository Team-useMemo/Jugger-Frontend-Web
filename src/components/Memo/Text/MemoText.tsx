import { setModalOpen } from '@stores/modules/modal';
import { useEffect, useRef, useState } from 'react';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { MemoTextContainer, MemoTextContents, MemoTextMoreButton, MemoTextMoreDivideLine } from './MemoText.Style';

const MemoText = ({ memoId, content }: { categoryName: any; memoId: number; content: string }) => {
  const memoRef = useRef<HTMLParagraphElement>(null);
  const [activeMore, setActiveMore] = useState(false);

  useEffect(() => {
    setActiveMore(false); // Reset first
    if (!memoRef.current) return;
    setTimeout(() => {
      if (memoRef.current) {
        setActiveMore(memoRef.current.scrollHeight > memoRef.current.clientHeight);
      }
    }, 0);
  }, [content, memoId]);

  const dispatch = useAppDispatch();

  const openDetailTextMemoModal = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailTextMemo,
        value: {
          title: '',
          text: content,
        },
      }),
    );
  };

  return (
    <MemoTextContainer>
      <MemoTextContents ref={memoRef}>{content}</MemoTextContents>
      {activeMore && (
        <>
          <MemoTextMoreDivideLine />
          <MemoTextMoreButton onClick={openDetailTextMemoModal}>
            전체 보기
            <RightArrowSVG fill="white" />
          </MemoTextMoreButton>
        </>
      )}
    </MemoTextContainer>
  );
};

export default MemoText;
