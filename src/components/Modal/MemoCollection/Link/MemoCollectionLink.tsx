import { useAppSelector } from '@hooks/useRedux';
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

const linkList = [
  { content: 'https://www.youtube.com/watch?v=v8zk7DECvqs', category: '1' },
  { content: 'https://www.youtube.com/watch?v=gDlfKQpQZkQ', category: '2' },
  { content: 'https://www.youtube.com/watch?v=EMLxA1P119U', category: '5' },
  { content: 'https://www.youtube.com/watch?v=f_-I4yaMfK4&pp=0gcJCb8Ag7Wk3p_U' },
  { content: 'https://www.youtube.com/watch?v=UIN8CtE6Wis', category: '4' },
];

const MemoCollectionLinkItem = ({ content, category }: { content: any; category?: string }) => {
  const [ogData, setOgData] = useState<OgData | null>(null);

  const _category = useAppSelector((state) => state.category.value).find((e) => e.id == category);

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
            {_category.title}
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
  const [links] = useState(linkList);

  return (
    <MemoCollectionLinkContainer>
      <MemoCollectionLinkContents>
        {links.map((e) => {
          return <MemoCollectionLinkItem content={e.content} category={e.category} />;
        })}
      </MemoCollectionLinkContents>
    </MemoCollectionLinkContainer>
  );
};

export default MemoCollectionLink;
