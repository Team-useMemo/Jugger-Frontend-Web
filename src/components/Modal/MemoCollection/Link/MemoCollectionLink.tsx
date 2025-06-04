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
import { useSearchParams } from 'react-router-dom';


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

  return (
    <MemoCollectionLinkItemContainer onClick={handleLinkClick}>
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
  );
};

const MemoCollectionLink = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') ?? '';
  const { data: linkDatas = [] } = useGetLinksQuery({ category_uuid: currentCategory });

  return (
    <MemoCollectionLinkContainer>
      <MemoCollectionLinkContents>
        {linkDatas.map((e) => {
          return <MemoCollectionLinkItem content={e.link} category={currentCategory} />;
        })}
      </MemoCollectionLinkContents>
    </MemoCollectionLinkContainer>
  );
};

export default MemoCollectionLink;
