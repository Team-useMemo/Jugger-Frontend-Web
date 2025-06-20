import styled from '@emotion/styled';
import { useUploadFileMutation } from '@stores/modules/memo';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dataURLtoFile from '@utils/dataURLtoFile';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import { media, theme } from '@styles/theme';
import CloseSVG from '@assets/icons/close.svg?react';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';
import { DefaultModalContainer, DefaultModalHeader, DefaultModalLayout } from '../DefaultModal.Style';

const AddImageMemoContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflow: 'hidden',

  [media[480]]: {
    padding: '20px',
    height: '100%',
  },
});

const AddImageMemoImageContainer = styled.div({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[8],
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  [media[480]]: {
    flexGrow: '1',
    justifyContent: 'center',
  },
});

const AddImageMemoEmptyImageContents = styled.label({
  background: theme.color.material.dimmer,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.color.label.inverse,
  aspectRatio: '5 / 4',
  gap: '12px',
  padding: '48px',

  ...theme.font.label1normal.medium,
  whiteSpace: 'nowrap',

  ['>input']: {
    display: 'none',
  },
});

const AddImageMemoImageContents = styled.div({
  overflow: 'hidden',
  display: 'flex',

  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',

  ['>img']: {
    objectFit: 'contain',
    width: 'auto',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '240px',
    minHeight: '240px',
  },
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

  ['>button']: {
    width: '100%',
  },
});

const AddImageMemo = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const MAX_LENGTH = 50;
  const isMobile = useIsMobile();

  const [image, setImage] = useState<string | null>(props?.image);
  const [desc, setDesc] = useState('');

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const [uploadFile] = useUploadFileMutation();

  const handlePasteClipboard = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;

    Array.from(items).some((e) => {
      console.log(e);
      if (e.type.indexOf('image') === -1) return false;

      const blob = e.getAsFile();
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result as string);
      };

      if (blob) {
        reader.readAsDataURL(blob);
      }

      return true;
    });
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > MAX_LENGTH) return;
    setDesc(e.target.value);
  };

  const handleAddImage = () => {
    const file = dataURLtoFile(image, 'image.png');

    (async () => {
      try {
        await uploadFile({
          file: file,
          category_uuid: currentCategory ?? '',
        }).unwrap();

        closeModal?.();
      } catch (error) {
        console.error('사진 전송 실패:', error);
      }
    })();
  };

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <DefaultModalLayout>
      <DefaultModalContainer ref={modalRef} tabIndex={-1} onPaste={handlePasteClipboard}>
        {!isMobile ? (
          <p
            style={{
              margin: '0 0 24px',

              textAlign: 'left',
              ...theme.font.title3.bold,
              color: theme.color.text.onView,
            }}
          >
            파일 추가
          </p>
        ) : (
          <DefaultModalHeader>
            <CloseSVG onClick={closeModal} />
            <span className="grow" />
            {/* <p onClick={handleAddImage}>추가</p> */}
          </DefaultModalHeader>
        )}
        <AddImageMemoContents>
          <AddImageMemoImageContainer>
            {!image ? (
              <AddImageMemoEmptyImageContents>
                <img src={AddPhotoPNG} />
                이미지 업로드 또는 클립보드 붙여넣기
                <input type="file" accept="image/*" onChange={handleChangeFile} />
              </AddImageMemoEmptyImageContents>
            ) : (
              <AddImageMemoImageContents>
                <img src={image} />
              </AddImageMemoImageContents>
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
                {!isMobile && (
                  <JuggerButton color="secondary" size="medium" onClick={closeModal}>
                    취소
                  </JuggerButton>
                )}
                <JuggerButton color="primary" size="medium" onClick={handleAddImage}>
                  추가
                </JuggerButton>
              </AddImageMemoButtonContainer>
            </>
          )}
        </AddImageMemoContents>
      </DefaultModalContainer>
    </DefaultModalLayout>
  );
};

export default AddImageMemo;
