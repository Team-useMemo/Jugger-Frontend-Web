import { useEffect, useRef, useState } from 'react';
import CloseSVG from '@assets/icons/close.svg?react';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';
import { MemoModalButton, MemoModalCloseContainer, MemoModalContainer, MemoModalTitle } from '../../Modal.Style';
import { MemoAddImageContainer, MemoAddImageContents, MemoAddImageEmptyContents } from './MemoViewerImage.Style';

const MemoAddImage = ({ closeModal, actions }: { closeModal: () => void; actions: ((...args: any[]) => void)[] }) => {
  const [addImage] = actions;

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      <MemoAddImageContainer>
        <MemoModalTitle>사진 추가</MemoModalTitle>
        <MemoAddImageContents>
          {image ? (
            <img src={image as string} style={{ width: '100%' }} />
          ) : (
            <MemoAddImageEmptyContents onClick={handleUploadLocalFile}>
              <img src={AddPhotoPNG} />
              이미지 업로드 또는 클립보드 붙여넣기
            </MemoAddImageEmptyContents>
          )}
        </MemoAddImageContents>
        {image && (
          <MemoModalButton
            onClick={() => {
              addImage(image);
              closeModal();
            }}
          >
            추가
          </MemoModalButton>
        )}
      </MemoAddImageContainer>
    </MemoModalContainer>
  );
};

export default MemoAddImage;
