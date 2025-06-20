import { useGetPhotosQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp } from '@ts/Memo.Prop';
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

const MemoCollectionImageItem = ({ memo, category }: { memo: MemoProp; category?: CategoryProp }) => {
  const dispatch = useAppDispatch();

  const content = memo.content as string;

  const handleClickImage = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailImageMemoCollection,
        value: { content },
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
      <img src={content} />
    </MemoCollectionImageItemContainer>
  );
};

const MemoCollectionImage = ({ category }: { category?: CategoryProp }) => {
  const { data: imageMemos = [] } = useGetPhotosQuery({ category_uuid: category?.categoryId ?? '' });

  const dateImages: [string, MemoProp[]][] = Object.entries(
    [...imageMemos].reverse().reduce((acc: any, e) => {
      const dateStr = e.date.toDateString();
      (acc[dateStr] ||= []).push({ ...e, categoryId: category?.categoryId });
      return acc;
    }, {}),
  );

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
