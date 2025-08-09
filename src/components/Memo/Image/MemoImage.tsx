import { setModalOpen } from '@stores/modules/modal';
import { imageProp } from '@ts/Memo.Prop';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import MemoImageContainer from './MemoImage.Style';

const MemoImage = ({ content }: { content: imageProp }) => {
  const dispatch = useAppDispatch();
  const openDetailImageMemoModal = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailImageMemo,
        value: {
          content: content,
        },
      }),
    );
  };

  return (
    <MemoImageContainer>
      <img src={content.imgUrl} loading="lazy" decoding="async" onClick={openDetailImageMemoModal} />
    </MemoImageContainer>
  );
};

export default MemoImage;
