import { useEffect, useState } from 'react';
import { MemoLinkContainer, MemoLinkDefaultText, MemoLinkImage, MemoLinkTextContainer } from './MemoLink.Style';

interface OgData {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

const fetchUrlPreview = async (url: string) => {
  const res = await fetch(`https://og-meta-data-api.vercel.app/api/preview?url=${url}`);
  const data = await res.json();
  return data;
};

const MemoLink = ({ content }: { content: string }) => {
  const [ogData, setOgData] = useState<OgData | null>(null);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      setOgData(await fetchUrlPreview(content));
    };

    fetchAndUpdate();
  }, [content]);

  if (!ogData) return <MemoLinkDefaultText>{content}</MemoLinkDefaultText>;

  return (
    <MemoLinkContainer
      onClick={() => {
        window.open(content);
      }}
    >
      {ogData.ogImage && <MemoLinkImage src={ogData.ogImage} />}
      <MemoLinkTextContainer>
        {ogData.ogTitle && <p className="title">{ogData.ogTitle}</p>}
        {ogData.ogDescription && <p className="desc">{ogData.ogDescription}</p>}
        <p className="url">{ogData.ogUrl || content}</p>
      </MemoLinkTextContainer>
    </MemoLinkContainer>
  );
};

export default MemoLink;
