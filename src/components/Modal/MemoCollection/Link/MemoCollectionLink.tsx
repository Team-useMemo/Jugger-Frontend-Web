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
import LoadingGIF from '@assets/Loading.gif';
import MoreSVG from '@assets/icons/more.svg?react';
import {
  MemoCollectionLinkContainer,
  MemoCollectionLinkItemCategoryContainer,
  MemoCollectionLinkItemContainer,
  MemoCollectionLinkItemImageContainer,
  MemoCollectionLinkItemTextContainer,
} from './MemoCollectionLink.Style';

const MemoCollectionLinkItem = ({ memo, category }: { memo: MemoProp; category?: CategoryProp }) => {
  const content = memo.content as string;
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

const MemoCollectionLink = ({ category }: { category?: CategoryProp }) => {
  const { data: linkMemos = [] } = useGetLinksQuery({ categoryId: category?.categoryId ?? '' });

  return (
    <MemoCollectionLinkContainer>
      {linkMemos.map((memo) => (
        <MemoCollectionLinkItem key={`LINK_COLLECTION_${category}_${memo.content}`} memo={memo} category={category} />
      ))}
    </MemoCollectionLinkContainer>
  );
};

export default MemoCollectionLink;
