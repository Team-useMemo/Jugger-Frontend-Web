import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetPhotosQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoResponseProp } from '@ts/Memo.Prop';
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
import {
  MemoCollectionImageContainer,
  MemoCollectionImageItemContainer,
  MemoCollectionImageListContainer,
  MemoCollectionImageListContents,
  MemoCollectionImageListTitle,
} from './MemoCollectionImage.Style';

const MemoCollectionImageItem = ({ memo, category }: { memo: MemoResponseProp; category?: CategoryProp }) => {
  const dispatch = useAppDispatch();

  const content = memo.content as string;

  const handleClickImage = (image: string) => {
    dispatch(setModalOpen({ name: ModalName.detailImageMemoCollection, value: { image: image } }));
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.color ?? '', title: category?.name ?? '' },
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
    <MemoCollectionImageItemContainer onClick={() => handleClickImage(content)} {...BindContextMenuHandlers}>
      <ContextMenu />
      <img src={content} />
    </MemoCollectionImageItemContainer>
  );
};

const MemoCollectionImage = ({ category }: { category: string }) => {
  const { data: imageLists = [] } = useGetPhotosQuery({ category_uuid: category });
  const { data: categories = [] } = useGetCategoriesQuery();

  const images = Object.entries(
    [...imageLists].reverse().reduce((acc: any, e) => {
      const dateStr = e.date.toDateString();
      return {
        ...acc,
        [dateStr]: acc[dateStr] ? [...acc[dateStr], { ...e, categoryId: category }] : [{ ...e, categoryId: category }],
      };
    }, {}),
  );

  return (
    <MemoCollectionImageContainer>
      {images.map(([date, imageArr]: [string, any]) => (
        <MemoCollectionImageListContainer key={`IMAGE_COLLECTION_${date}`}>
          <MemoCollectionImageListTitle>
            {formatDate(new Date(date), '{YYYY}년 {MM}월 {DD}일 {W}요일')}
          </MemoCollectionImageListTitle>
          <MemoCollectionImageListContents>
            {imageArr.map((memo: MemoResponseProp, i: number) => (
              <MemoCollectionImageItem
                key={`IMAGE_COLLECTION_${date}_${i}`}
                memo={memo}
                category={categories.find((e) => e.uuid == category)}
              />
            ))}
          </MemoCollectionImageListContents>
        </MemoCollectionImageListContainer>
      ))}
    </MemoCollectionImageContainer>
  );
};

export default MemoCollectionImage;
