import { setModalReplace } from '@stores/modules/modal';
import { ModalName } from '@utils/Modal';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import CategorySVG from '@assets/icons/category.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import DownloadSVG from '@assets/icons/download.svg?react';
import ExpandSVG from '@assets/icons/expand.svg?react';
import { MemoDetailContainer, MemoDetailLayout } from '../MemoDetail.Style';
import {
  MemoDetailImageButtonContainer,
  MemoDetailImageContainer,
  MemoDetailImageContents,
  MemoTitleContainer,
} from './MemoDetailImage.Style';

const MemoDetailImage = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const { content } = props ?? {};
  const { imgUrl, description } = content ?? {};

  const dispatch = useAppDispatch();

  const handleClickCategory = () => {
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    const currentCategory = searchParams.get('category');

    dispatch(
      setModalReplace({
        prev: ModalName.detailImageMemo,
        to: ModalName.memoCollection,
        value: {
          type: 'image',
          categoryId: currentCategory ?? '',
        },
      }),
    );
  };
  const handleClickExpand = () => {
    dispatch(
      setModalReplace({
        prev: ModalName.detailImageMemo,
        to: ModalName.detailImageMemoExpand,
        value: {
          imgUrl: imgUrl,
        },
      }),
    );
  };

  const handleClickDownload = async () => {
    try {
      const response = await fetch(imgUrl); // CORS 허용된 URL이어야 함
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err, '다운로드 실패: CORS 정책에 의해 차단됐을 수 있어요.');
    }
  };

  return (
    <MemoDetailLayout>
      <MemoDetailContainer ref={modalRef}>
        <CloseSVG onClick={closeModal} />
        <MemoDetailImageContainer>
          <MemoDetailImageContents>
            <img src={imgUrl} />
          </MemoDetailImageContents>
          {description && (
            <MemoTitleContainer>
              <p>{description}</p>
            </MemoTitleContainer>
          )}
          <MemoDetailImageButtonContainer>
            <CategorySVG onClick={handleClickCategory} />
            <ExpandSVG onClick={handleClickExpand} />
            <span className="grow" />
            <DownloadSVG onClick={handleClickDownload} />
          </MemoDetailImageButtonContainer>
        </MemoDetailImageContainer>
      </MemoDetailContainer>
    </MemoDetailLayout>
  );
};

export default MemoDetailImage;
