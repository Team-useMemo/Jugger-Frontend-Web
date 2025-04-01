import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const MemoLinkTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 16px',
  gap: '4px',
  textAlign: 'left',
  width: '288px',

  ['p']: {
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',

    ['&.title']: {
      color: '#171719',
      WebkitLineClamp: '1',
    },
    ['&.desc']: {
      color: '#46474C',
      WebkitLineClamp: '2',
    },
    ['&.url']: {
      color: '#C2C4C8',
      WebkitLineClamp: '1',
    },
  },
});

const fetchUrlPreview = async (url: string) => {
  const res = await fetch(`https://og-meta-data-api.vercel.app/api/preview?url=${url}`);
  const data = await res.json();
  return data;
};

interface OgData {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

const MemoMainText = styled.p({
  margin: '0',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: '15px',
  fontWeight: '500',
  padding: '8px 16px',
  background: '#0054D1',
  textAlign: 'start',
});

const MemoFlexContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: '#EAF2FE',
  cursor: 'pointer',
});

const MemoLink = ({ content }: { content: string }) => {
  const [ogData, setOgData] = useState<OgData | null>(null);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      setOgData(await fetchUrlPreview(content));
    };

    fetchAndUpdate();
  }, [content]);

  if (!ogData) return <MemoMainText>{content}</MemoMainText>;

  return (
    <MemoFlexContainer
      onClick={() => {
        window.open(content);
      }}
    >
      {ogData.ogImage && (
        <img
          src={ogData.ogImage}
          style={{
            width: '320px',
            height: '180px',
            objectFit: 'cover',
          }}
        />
      )}
      <MemoLinkTextContainer>
        {ogData.ogTitle && (
          <p
            className="title"
            style={{
              fontWeight: '600',
              fontSize: '15px',
              lineHeight: '1.47',
              margin: '0',
            }}
          >
            {ogData.ogTitle}
          </p>
        )}
        {ogData.ogDescription && (
          <p
            className="desc"
            style={{
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '1.33',
              margin: '0',
            }}
          >
            {ogData.ogDescription}
          </p>
        )}
        <p
          className="url"
          style={{
            fontWeight: '500',
            fontSize: '11px',
            lineHeight: '1.27',
            margin: '0',
          }}
        >
          {ogData.ogUrl || content}
        </p>
      </MemoLinkTextContainer>
    </MemoFlexContainer>
  );
};

export default MemoLink;
