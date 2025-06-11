import { useEffect, useState } from 'react';
import {
  MemoCollectionLinkContainer,
  MemoCollectionLinkContents,
  MemoCollectionLinkItemCategory,
  MemoCollectionLinkItemContainer,
  MemoCollectionLinkItemContents,
  MemoCollectionLinkItemThumbnailContainer,
} from './MemoCollectionLink.Style';
import { fetchUrlPreview, OgData } from '@utils/ogData';
import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetLinksQuery } from '@stores/modules/memo';
import { useContextMenu } from '@hooks/useContextMenu';


const MemoCollectionLinkItem = ({ content, category }: { content: any; category?: string }) => {
  const [ogData, setOgData] = useState<OgData | null>(null);

  const { data: categories = [] } = useGetCategoriesQuery();
  const _category = categories.find((e: any) => e.id == category);
  useEffect(() => {
    const fetchAndUpdate = async () => {
      setOgData(await fetchUrlPreview(content));
    };

    fetchAndUpdate();
  }, [content]);

  const handleLinkClick = () => {
    window.open(content);
  };

  const handleEdit = () => {
    // TODO: 카테고리 설정 모달 열기
  };

  const handleCopy = () => {
    // TODO: 카테고리 설정 모달 열기
  };

  const handleShare = () => {
    // TODO: 즐겨찾기 토글 API 연결 예정
  };

  const handleDeleteMemo = () => {
    // TODO: 삭제 확인 모달 또는 삭제 API 호출
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: _category?.color || '#FFF', title: _category?.name || '' },
    items: [
      {
        label: '링크 수정',
        onClick: handleEdit,
      },
      {
        label: '복사',
        onClick: handleCopy,
      },
      {
        label: '공유',
        onClick: handleShare,
      },
      {
        label: '삭제',
        onClick: handleDeleteMemo,
      },
    ],
  });

  return (
    <>
      <ContextMenu />
      <MemoCollectionLinkItemContainer onClick={handleLinkClick}
        {...BindContextMenuHandlers}>
        <MemoCollectionLinkItemThumbnailContainer>
          {_category && (
            <MemoCollectionLinkItemCategory color={_category.color}>
              <span />
              {_category.name}
            </MemoCollectionLinkItemCategory>
          )}
          <img src={ogData?.ogImage} />
        </MemoCollectionLinkItemThumbnailContainer>
        <MemoCollectionLinkItemContents>
          <p className="title">{ogData?.ogTitle}</p>
          <p className="desc">{ogData?.ogDescription}</p>
          <p className="url">{ogData?.ogUrl}</p>
        </MemoCollectionLinkItemContents>
      </MemoCollectionLinkItemContainer>
    </>
  );
};

const MemoCollectionLink = ({ categoryId }: { categoryId: string }) => {
  const { data: linkData = [] } = useGetLinksQuery({ categoryId });
  return (
    <MemoCollectionLinkContainer>
      <MemoCollectionLinkContents>
        {linkData.map((e) => {
          return <MemoCollectionLinkItem content={e.link} category={categoryId} />;
        })}
      </MemoCollectionLinkContents>
    </MemoCollectionLinkContainer>
  );
};

export default MemoCollectionLink;
