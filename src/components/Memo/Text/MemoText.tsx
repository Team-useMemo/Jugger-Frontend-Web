import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import CloseSVG from '@assets/icons/close.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import useModal from '@hooks/useModal';
import { MemoModalCloseContainer, MemoModalContainer } from '@components/Modal/Modal.Style';
import { theme } from '@styles/theme';

const MemoTextContainer = styled.div({
  background: theme.color.primary.normal,
  padding: '8px 16px',
  textAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const MemoTextContents = styled.p(theme.font.body2normal.medium, {
  color: theme.palette.common[100],
  margin: '0',
  whiteSpace: 'pre-wrap',
  WebkitLineClamp: '20',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const MemoTextAboutMoreButton = styled.div(theme.font.body2normal.medium, {
  color: theme.palette.common[100],
  margin: '0',

  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const MemoTextAboutMoreDivideLine = styled.span({
  borderBottom: `1px solid ${theme.color.line.normal}`,
  width: '100%',
  opacity: '0.3',
});

const TextModalContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  textAlign: 'left',
  padding: '0 32px',
  width: '450px',
  boxSizing: 'border-box',
  maxHeight: '640px',
});

const TextModalTitle = styled.p({
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.36',
  margin: '0',
});

const TextModalContents = styled.p({
  fontSize: '15px',
  fontWeight: '500',
  lineHeight: '1.467',
  margin: '0',
  overflow: 'auto',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

const TextModal = ({ closeModal, props }: { closeModal: () => void; props: any }) => {
  return (
    <MemoModalContainer>
      <MemoModalCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoModalCloseContainer>
      <TextModalContainer>
        <TextModalTitle>4월</TextModalTitle>
        <TextModalContents>{props.text}</TextModalContents>
      </TextModalContainer>
    </MemoModalContainer>
  );
};

const MemoText = ({ content }: { content: string }) => {
  const memoRef = useRef<HTMLParagraphElement>(null);
  const [AboutTextModal, openAboutTextModal] = useModal(TextModal, [], { text: content });
  const [activeMore, setActiveMore] = useState(false);

  useEffect(() => {
    if (!memoRef.current) return;
    setActiveMore(memoRef.current.scrollHeight > memoRef.current.clientHeight);
  }, []);

  return (
    <>
      <AboutTextModal />
      <MemoTextContainer>
        <MemoTextContents ref={memoRef}>{content}</MemoTextContents>
        {activeMore && (
          <>
            <MemoTextAboutMoreDivideLine />
            <MemoTextAboutMoreButton onClick={openAboutTextModal}>
              전체 보기
              <RightArrowSVG />
            </MemoTextAboutMoreButton>
          </>
        )}
      </MemoTextContainer>
    </>
  );
};

export default MemoText;
