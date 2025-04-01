import { useEffect, useRef, useState } from 'react';
import CloseSVG from '@assets/icons/close.svg?react';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';
import { MemoModalButton, MemoModalCloseContainer, MemoModalContainer, MemoModalTitle } from './Modal.Style';
import styled from '@emotion/styled';

const AddImageModalContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  padding: '0 32px',
  width: '450px',
  boxSizing: 'border-box',
  textAlign: 'left',
});

const AddImageModal = ({ closeModal, actions }: { closeModal: () => void; actions: ((...args: any[]) => void)[] }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handlePasteClipboard = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();

        reader.onload = () => {
          setImage(reader.result);
        };

        if (blob) {
          reader.readAsDataURL(blob);
        }
        break;
      }
    }
  };

  const handleUploadLocalFile = async () => {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'Image Files',
            accept: {
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            },
          },
        ],
        multiple: false,
      });

      const file = await fileHandle.getFile();

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (err) {
      console.error('파일 선택 취소 또는 실패:', err);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <MemoModalContainer
      ref={containerRef}
      tabIndex={0}
      onPaste={handlePasteClipboard}
      onKeyDown={(e) => {
        if (e.key == 'Enter' && image) {
          actions[0](image);
          closeModal();
        }
      }}
    >
      <MemoModalCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoModalCloseContainer>

      <AddImageModalContents>
        <MemoModalTitle>사진 추가</MemoModalTitle>
        <div
          style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {image ? (
            <img src={image as string} style={{ width: '100%' }} />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'gray',
                color: 'white',
                height: '320px',
                gap: '12px',
              }}
              onClick={handleUploadLocalFile}
            >
              <img src={AddPhotoPNG} />
              이미지 업로드 또는 클립보드 붙여넣기
            </div>
          )}
        </div>
        {image && (
          <MemoModalButton
            onClick={() => {
              actions[0](image);
              closeModal();
            }}
          >
            추가하기
          </MemoModalButton>
        )}
      </AddImageModalContents>
    </MemoModalContainer>
  );
};

export default AddImageModal;
