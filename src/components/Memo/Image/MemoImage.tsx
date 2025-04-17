import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoDetailImage from '@components/Modal/MemoViewer/Image/MemoDetailImage';
import useModal from '@hooks/useModal';
import MemoImageContainer from './MemoImage.Style';

const MemoImage = ({ memoId, content }: { memoId: number; content: string }) => {
  const [MemoDetailImageModal, openMemoDetailImageModal] = useModal(
    `memoImage_${memoId}`,
    FullScreenGray,
    MemoDetailImage,
    [],
    {
      image: content,
    },
  );

  return (
    <>
      <MemoDetailImageModal />
      <MemoImageContainer>
        <img src={content} onClick={() => openMemoDetailImageModal()} />
      </MemoImageContainer>
    </>
  );
};

export default MemoImage;
