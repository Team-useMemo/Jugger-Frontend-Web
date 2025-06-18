import { useOgData } from '@hooks/useOgData';
import { MemoLinkContainer, MemoLinkDefaultText, MemoLinkImage, MemoLinkTextContainer } from './MemoLink.Style';

const MemoLink = ({ content }: { content: string }) => {
  const ogData = useOgData(content);

  if (!ogData) return <MemoLinkDefaultText>{content}</MemoLinkDefaultText>;

  return (
    <MemoLinkContainer
      onClick={() => {
        window.open(content);
      }}
    >
      {ogData.ogImage && (
        <MemoLinkImage>
          <img src={ogData.ogImage} />
        </MemoLinkImage>
      )}
      <MemoLinkTextContainer>
        {ogData.ogTitle && <p className="title">{ogData.ogTitle}</p>}
        {ogData.ogDescription && <p className="desc">{ogData.ogDescription}</p>}
        <p className="url">{ogData.ogUrl || content}</p>
      </MemoLinkTextContainer>
    </MemoLinkContainer>
  );
};

export default MemoLink;
