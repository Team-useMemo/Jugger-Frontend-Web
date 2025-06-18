import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetLinksQuery } from '@stores/modules/memo';
import { useMemo } from 'react';
import { CategoryProp } from '@ts/Category.Prop';
import {
  ContextMenuCategory,
  ContextMenuCopy,
  ContextMenuDelete,
  ContextMenuEdit,
  ContextMenuShare,
} from '@utils/ContextMenu';
import { useContextMenu } from '@hooks/useContextMenu';
import { useOgData } from '@hooks/useOgData';
import LoadingGIF from '@assets/Loading.gif';
import MoreSVG from '@assets/icons/more.svg?react';
import {
  MemoCollectionLinkContainer,
  MemoCollectionLinkItemCategoryContainer,
  MemoCollectionLinkItemContainer,
  MemoCollectionLinkItemImageContainer,
  MemoCollectionLinkItemTextContainer,
} from './MemoCollectionLink.Style';

const MemoCollectionLinkItem = ({ link, category }: { link: any; category?: CategoryProp }) => {
  const { content } = link;
  const ogData = useOgData(content);
  const { ogImage, ogTitle, ogDescription, ogUrl } = ogData || {};

  const handleClickLinkItemMore = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
  };

  const handleClickLinkItem = () => {
    window.open(content);
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
    <MemoCollectionLinkItemContainer {...BindContextMenuHandlers}>
      <ContextMenu />
      <MemoCollectionLinkItemImageContainer onClick={handleClickLinkItem}>
        <img src={ogImage || LoadingGIF} />
        <MemoCollectionLinkItemCategoryContainer color={category?.categoryColor}>
          <span />
          {category?.categoryName}
        </MemoCollectionLinkItemCategoryContainer>
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

const MemoCollectionLink = ({ category }: { category: string }) => {
  const { data: linkList = [] } = useGetLinksQuery({ categoryId: category });
  const { data: _categories = [] } = useGetCategoriesQuery();
  const categories: CategoryProp[] = useMemo(() => {
    return [
      {
        categoryId: '',
        categoryColor: '#171719',
        categoryName: '전체',
        isPinned: false,
        recentMessage: '',
        updateAt: new Date(),
      },
      ..._categories,
    ];
  }, [_categories]);
  console.log(linkList);

  return (
    <MemoCollectionLinkContainer>
      {linkList.map((e) => (
        <MemoCollectionLinkItem
          key={`LINK_COLLECTION_${category}_${e.content}`}
          link={e}
          category={categories.find((category) => category.categoryId == e.categoryId)}
        />
      ))}
    </MemoCollectionLinkContainer>
  );
};

export default MemoCollectionLink;
