import { useUploadFileMutation } from '@stores/modules/memo';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dataURLtoFile from '@utils/dataURLtoFile';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';
import { MemoViewerContainer, MemoViewerContents, MemoViewerTitle } from '../MemoViewer.Style';
import {
  AddImageMemoButtonContainer,
  AddImageMemoContainer,
  AddImageMemoDescContainer,
  AddImageMemoEmpty,
  AddImageMemoImage,
  AddImageMemoImageContainer,
} from './ViewerImageMemo.Style';

const AddImageMemo = ({ closeModal }: ModalComponentProps) => {
  const MAX_LENGTH = 50;

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [desc, setDesc] = useState('');

  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');

  const containerRef = useRef<HTMLDivElement>(null);

  const [uploadFile] = useUploadFileMutation();

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

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH) return;
    setDesc(e.target.value);
  };

  const handleAddImage = () => {
    const file = dataURLtoFile(image as string, 'image.png');

    (async () => {
      try {
        await uploadFile({
          file: file,
          category_uuid: currentCategory ?? '',
        }).unwrap();

        closeModal();
      } catch (error) {
        console.error('사진 전송 실패:', error);
      }
    })();
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <MemoViewerContainer ref={containerRef} tabIndex={-1} onPaste={handlePasteClipboard}>
      <MemoViewerContents>
        <MemoViewerTitle>파일 추가</MemoViewerTitle>
        <AddImageMemoContainer>
          <AddImageMemoImageContainer onClick={handleUploadLocalFile}>
            {!image ? (
              <AddImageMemoEmpty>
                <img src={AddPhotoPNG} />
                이미지 업로드 또는 클립보드 붙여넣기
              </AddImageMemoEmpty>
            ) : (
              <AddImageMemoImage src={image as string} />
            )}
          </AddImageMemoImageContainer>
          {image && (
            <>
              <AddImageMemoDescContainer>
                설명 추가
                <input type="text" placeholder="간단한 설명을 입력해주세요" value={desc} onChange={handleDescChange} />
                <p>
                  {desc.length}/{MAX_LENGTH}
                </p>
              </AddImageMemoDescContainer>
              <AddImageMemoButtonContainer>
                <JuggerButton color="secondary" size="medium" onClick={closeModal}>
                  취소
                </JuggerButton>
                <JuggerButton color="primary" size="medium" onClick={handleAddImage}>
                  추가
                </JuggerButton>
              </AddImageMemoButtonContainer>
            </>
          )}
        </AddImageMemoContainer>
      </MemoViewerContents>
    </MemoViewerContainer>
  );
};

export default AddImageMemo;
