import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoDetailImage from '@components/Modal/MemoViewer/Image/MemoDetailImage';
import useModal from '@hooks/useModal';
import { formatDate } from '@utils/Date';
import { useState } from 'react';
import {
  MemoColectionImageItemContainer,
  MemoCollectionImageListContainer,
  MemoCollectionImageListContents,
  MemoCollectionImageListTitle,
} from './MemoCollectionImage.Style';

const imageList = Array.from({ length: 30 }, () => ({
  image:
    'https://plus.unsplash.com/premium_photo-1681437096361-c5f1e29d6997?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJTk3JUFDJUVCJUE2JTg0JTIwJUVCJUIwJUIwJUVBJUIyJUJEJUVEJTk5JTk0JUVCJUE5JUI0fGVufDB8fDB8fHww',
  date: new Date(`2024-04-0${Math.ceil(Math.random() * 9)}`),
})).sort((a: any, b: any) => b.date - a.date);

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
          return <MemoCollectionImageItem key={i} image={e.image} handleClickImage={handleClickImage} />;
        })}
      </MemoCollectionImageListContents>
    </MemoCollectionImageListContainer>
  );
};

const MemoCollectionImage = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [MemoDetailImageModal, openMemoDetailImageModal] = useModal('image', FullScreenGray, MemoDetailImage, [], {
    image: selectedImage,
  });

  const [images] = useState(
    Object.entries(
      imageList.reduce((acc: any, e) => {
        const dateStr = e.date.toDateString();

        return {
          ...acc,
          [dateStr]: acc[dateStr] ? [...acc[dateStr], e] : [e],
        };
      }, {}),
    ).sort(([aKey], [bKey]) => new Date(bKey).getTime() - new Date(aKey).getTime()),
  );

  const handleClickImage = (image: string) => {
    setSelectedImage(image);
    openMemoDetailImageModal();
  };

  return (
    <>
      <MemoDetailImageModal />
      {images.map(([key, value]: [string, any]) => (
        <MemoCollectionImageList
          key={`Image_${key}`}
          dateStr={key}
          images={value}
          handleClickImage={handleClickImage}
        />
      ))}
    </>
  );
};

export default MemoCollectionImage;
