import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetLinksQuery } from '@stores/modules/memo';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp } from '@ts/Memo.Prop';
import {
  ContextMenuCategory,
  ContextMenuCopy,
  ContextMenuDelete,
  ContextMenuEdit,
  ContextMenuShare,
} from '@utils/ContextMenu';
import { useContextMenu } from '@hooks/useContextMenu';
import { useOgData } from '@hooks/useOgData';
import EmptyContent from '@components/Common/EmptyContent';
import LoadingGIF from '@assets/Loading.gif';
import MoreSVG from '@assets/icons/more.svg?react';
import {
  MemoCollectionLinkContainer,
  MemoCollectionLinkItemCategoryContainer,
  MemoCollectionLinkItemContainer,
  MemoCollectionLinkItemImageContainer,
  MemoCollectionLinkItemTextContainer,
} from './MemoCollectionLink.Style';

const MemoCollectionLinkItem = ({ memo, isSelectCategory }: { memo: MemoProp; isSelectCategory: boolean }) => {
  // console.log(isSelectCategory);
  const { data: categories = [] } = useGetCategoriesQuery();
  const content = memo.content as string;
  const category = categories.find((category) => category.categoryId === memo.categoryId);

  const { data: ogData } = useOgData(content);
  const { ogImage, ogTitle, ogDescription, ogUrl } = ogData || {};

  const handleClickLinkItemMore = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
  };

  const handleClickLinkItem = () => {
    window.open(content);
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.categoryColor ?? '#171719', title: category?.categoryName ?? '카테고리 없음' },
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
    <MemoCollectionLinkItemContainer {...BindContextMenuHandlers}>
      <ContextMenu />
      <MemoCollectionLinkItemImageContainer onClick={handleClickLinkItem}>
        <img src={ogImage || LoadingGIF} />

        {!isSelectCategory && (
          <MemoCollectionLinkItemCategoryContainer color={category?.categoryColor ?? '#171719'}>
            <span />
            {category?.categoryName ?? '카테고리 없음'}
          </MemoCollectionLinkItemCategoryContainer>
        )}

        <MoreSVG onClick={handleClickLinkItemMore} />
      </MemoCollectionLinkItemImageContainer>
      <MemoCollectionLinkItemTextContainer>
        <p className="title">{ogTitle}</p>
        <p className="desc">{ogDescription}</p>
        <p className="url">{ogUrl}</p>
      </MemoCollectionLinkItemTextContainer>
    </MemoCollectionLinkItemContainer>
  );
};

const MemoCollectionLink = ({ category }: { category?: CategoryProp }) => {
  const isSelectCategory = category?.categoryId !== '';

  const { data: linkMemos = [] } = useGetLinksQuery({ page: 0, size: 200, categoryId: category?.categoryId });

  if (!linkMemos.length) {
    return (
      <EmptyContent>
        아직 링크가 없어요
        <span>링크를 여기서 편하게 모아보세요!</span>
      </EmptyContent>
    );
  }

  return (
    <MemoCollectionLinkContainer>
      {linkMemos.map((memo, index: number) => (
        <MemoCollectionLinkItem
          key={`LINK_COLLECTION_${category}_${memo.content}_${index}`}
          memo={memo}
          isSelectCategory={isSelectCategory}
        />
      ))}
    </MemoCollectionLinkContainer>
  );
};

export default MemoCollectionLink;
