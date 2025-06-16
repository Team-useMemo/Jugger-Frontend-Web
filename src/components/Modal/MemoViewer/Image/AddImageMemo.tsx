import styled from '@emotion/styled';
import { useUploadFileMutation } from '@stores/modules/memo';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dataURLtoFile from '@utils/dataURLtoFile';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import { theme } from '@styles/theme';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';
import { MemoViewerContainer, MemoViewerContents, MemoViewerTitle } from '../MemoViewer.Style';

const AddImageMemoContainer = styled.div({
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const AddImageMemoImageContainer = styled.div({
  background: theme.color.material.dimmer,
  borderRadius: theme.radius[8],
  display: 'flex',
  overflow: 'hidden',
});

const AddImageMemoEmpty = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.color.label.inverse,
  height: '280px',
  width: '100%',
  gap: '12px',
});

const AddImageMemoImage = styled.img({
  width: '100%',
  maxHeight: '480px',
  objectFit: 'contain',
});

const AddImageMemoDescContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  textAlign: 'left',
  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,

  ['>input']: {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${theme.color.line.neutral}`,
    padding: '8px 0',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },
  },

  ['>p']: {
    ...theme.font.caption1.regular,
    color: theme.color.label.alternative,

    margin: '0',
    textAlign: 'right',
  },
});

const AddImageMemoButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  width: '100%',

  ['>button']: {
    width: '100%',
  },
});

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
