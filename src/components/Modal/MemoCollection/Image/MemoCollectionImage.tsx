import { useGetPhotosByCategoryQuery, useGetPhotosQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp, imageProp } from '@ts/Memo.Prop';
import {
  ContextMenuCategory,
  ContextMenuCopy,
  ContextMenuDelete,
  ContextMenuEdit,
  ContextMenuShare,
} from '@utils/ContextMenu';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useContextMenu } from '@hooks/useContextMenu';
import { useAppDispatch } from '@hooks/useRedux';
import EmptyContent from '@components/Common/EmptyContent';
import {
  MemoCollectionImageContainer,
  MemoCollectionImageItemContainer,
  MemoCollectionImageListContainer,
  MemoCollectionImageListContents,
  MemoCollectionImageListTitle,
} from './MemoCollectionImage.Style';

const MemoCollectionImageItem = ({ memo, category }: { memo: MemoProp; category?: CategoryProp }) => {
  const dispatch = useAppDispatch();

  const content = memo.content as imageProp;

  const handleClickImage = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailImageMemoCollection,
        value: {
          title: memo.description,
          content: content,
        },
      }),
    );
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.categoryColor ?? '', title: category?.categoryName ?? '' },
    items: [
      {
        label: '카테고리 설정',
        onClick: ContextMenuCategory,
      },
      {
        label: '복사',
        onClick: ContextMenuCopy,
      },
      {
        label: '수정',
        onClick: ContextMenuEdit,
      },
      {
        label: '공유',
        onClick: ContextMenuShare,
      },
      {
        label: '삭제',
        onClick: ContextMenuDelete,
      },
    ],
  });

  return (
    <MemoCollectionImageItemContainer onClick={handleClickImage} {...BindContextMenuHandlers}>
      <ContextMenu />
      <img src={content.imgUrl} />
    </MemoCollectionImageItemContainer>
  );
};

const MemoCollectionImage = ({ category }: { category?: CategoryProp }) => {
  const useImageMemos = (category?: CategoryProp) => {
    const useCategoryQuery = !!category?.categoryId;

    const query = useGetPhotosByCategoryQuery(
      { page: 0, size: 200, categoryId: category?.categoryId ?? '' },
      { skip: !useCategoryQuery },
    );

    const fallback = useGetPhotosQuery({ page: 0, size: 200 }, { skip: useCategoryQuery });

    return useCategoryQuery ? query : fallback;
  };

  const { data: imageMemos = [] } = useImageMemos(category);

  const dateImages: [string, MemoProp[]][] = Object.entries(
    [...imageMemos].reverse().reduce((acc: any, e) => {
      const dateStr = e.date.toDateString();
      (acc[dateStr] ||= []).push({ ...e, categoryId: category?.categoryId });
      return acc;
    }, {}),
  );

  if (!imageMemos.length) {
    return (
      <EmptyContent>
        아직 사진이 없어요
        <span>사진을 여기서 편하게 모아보세요!</span>
      </EmptyContent>
    );
  }

  return (
    <MemoCollectionImageContainer>
      {dateImages.map(([date, imageArr]: [string, any]) => (
        <MemoCollectionImageListContainer key={`IMAGE_COLLECTION_${date}`}>
          <MemoCollectionImageListTitle>
            {formatDate(new Date(date), '{YYYY}년 {MM}월 {DD}일 {W}요일')}
          </MemoCollectionImageListTitle>
          <MemoCollectionImageListContents>
            {imageArr.map((memo: MemoProp, i: number) => (
              <MemoCollectionImageItem key={`IMAGE_COLLECTION_${date}_${i}`} memo={memo} category={category} />
            ))}
          </MemoCollectionImageListContents>
        </MemoCollectionImageListContainer>
      ))}
    </MemoCollectionImageContainer>
  );
};

export default MemoCollectionImage;
