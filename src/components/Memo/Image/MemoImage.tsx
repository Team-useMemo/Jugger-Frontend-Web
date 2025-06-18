import { setModalOpen } from '@stores/modules/modal';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import MemoImageContainer from './MemoImage.Style';

const MemoImage = ({ content }: { memoId: number; content: string }) => {
  const dispatch = useAppDispatch();

  const openDetailImageMemoModal = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailImageMemo,
        value: {
          title: '',
          image: content,
        },
      }),
    );
  };

  return (
    <MemoImageContainer>
      <img src={content} onClick={openDetailImageMemoModal} />
    </MemoImageContainer>
  );
};

export default MemoImage;
