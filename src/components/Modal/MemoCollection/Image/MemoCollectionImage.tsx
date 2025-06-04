import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoDetailImage from '@components/Modal/MemoViewer/Image/MemoDetailImage';
import useModal from '@hooks/useModal';
import { formatDate } from '@utils/Date';
import {
  MemoColectionImageItemContainer,
  MemoCollectionImageListContainer,
  MemoCollectionImageListContents,
  MemoCollectionImageListTitle,
} from './MemoCollectionImage.Style';
import { useGetPhotosQuery } from '@stores/modules/memo';


const MemoCollectionImageItem = ({
  image,
  handleClickImage,
}: {
  image: string;
  handleClickImage: (image: string) => void;
}) => {
  return (
    <MemoColectionImageItemContainer
      onClick={() => {
        handleClickImage(image);
      }}
    >
      <img src={image} />
    </MemoColectionImageItemContainer>
  );
};

const MemoCollectionImageList = ({
  dateStr,
  images,
  handleClickImage,
}: {
  dateStr: string;
  images: any[];
  handleClickImage: (image: string) => void;
}) => {
  return (
    <MemoCollectionImageListContainer>
      <MemoCollectionImageListTitle>
        {formatDate(new Date(dateStr), '{YYYY}년 {MM}월 {DD}일 {W}요일')}
      </MemoCollectionImageListTitle>
      <MemoCollectionImageListContents>
        {images.map((e, i) => {
          return <MemoCollectionImageItem key={i} image={e.url} handleClickImage={handleClickImage} />;
        })}
      </MemoCollectionImageListContents>
    </MemoCollectionImageListContainer>
  );
};

const MemoCollectionImage = ({ categoryId }: { categoryId: string }) => {
  const [MemoDetailImageModal, openMemoDetailImageModal] = useModal('image', FullScreenGray, MemoDetailImage, [],);
  const { data: imageLists = [] } = useGetPhotosQuery({ category_uuid: categoryId });

  const images =
    Object.entries(
      imageLists.reduce((acc: any, e) => {
        const dateStr = new Date(e.timestamp).toDateString();
        return {
          ...acc.url,
          [dateStr]: acc[dateStr] ? [...acc[dateStr], e] : [e],
        };
      }, {}),
    ).sort(([aKey], [bKey]) => new Date(bKey).getTime() - new Date(aKey).getTime());

  const handleClickImage = (url: string) => {
    openMemoDetailImageModal({ url });
  };
  return (
    <>
      <MemoDetailImageModal />
      {images.map(([key, value]: [string, any]) =>
        <MemoCollectionImageList
          key={`Image_${key}`}
          dateStr={key}
          images={value}
          handleClickImage={handleClickImage}
        />
      )}
    </>
  );
};

export default MemoCollectionImage;
