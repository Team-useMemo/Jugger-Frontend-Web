import styled from '@emotion/styled';
import { MemoModalButton, MemoModalCloseContainer, MemoModalContainer, MemoModalTitle } from './Modal.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import { useState } from 'react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { useAppDispatch } from '@hooks/useRedux';
import { editCategory } from '@stores/modules/category';
import { media } from '@styles/theme';

const EditCategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  width: '450px',
  textAlign: 'left',
  padding: '0 32px',
  boxSizing: 'border-box',

  [media[0]]: {
    width: '100%',
    padding: '0 24px',
  },
});

const EditCategorylItemList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const EditCategoryItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const EditCategoryItemTitle = styled.p({
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
});

const EditCategoryItemContent = styled.div({
  boxSizing: 'border-box',
  background: '#F7F7F8',
  padding: '11px 14px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',

  ['>input']: {
    background: 'none',
    outline: 'none',
    border: 'none',
    margin: '0',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '1.5',
    width: '100%',
    color: '#171719',
  },
});

const EditCategory = ({
  id,
  name,
  initialColor,
  closeModal,
}: {
  id: number;
  name: string;
  initialColor: string;
  closeModal: () => void;
}) => {
  const [title, setTitle] = useState(name);
  const colors = ['#FF4242', '#00BF40', '#00AEFF', '#FF5E00', '#00BDDE', '#4F29E5', '#CB59FF', '#F553DA'];
  const [selected, setSelected] = useState(colors.findIndex((color) => color === initialColor));
  const dispatch = useAppDispatch();

  return (
    <MemoModalContainer>
      <MemoModalCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoModalCloseContainer>
      <EditCategoryContainer>
        <MemoModalTitle>카테고리 변경</MemoModalTitle>
        <EditCategorylItemList>
          <EditCategoryItem>
            <EditCategoryItemTitle>카테고리 이름</EditCategoryItemTitle>
            <EditCategoryItemContent>
              <input
                type="text"
                placeholder="입력"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {title && (
                <EndContainerSVG
                  onClick={() => {
                    setTitle('');
                  }}
                />
              )}
            </EditCategoryItemContent>
          </EditCategoryItem>
          <EditCategoryItem>
            <EditCategoryItemTitle>카테고리 색상</EditCategoryItemTitle>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '4px 0',
                justifyContent: 'flex-start',
              }}
            >
              {colors.map((e, i) => (
                <div
                  onClick={() => {
                    setSelected((prev) => (prev == i ? -1 : i));
                  }}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: e,
                    borderRadius: '18px',
                    boxSizing: 'border-box',
                    border: `2px solid ${i == selected ? 'black' : 'transparent'}`,
                  }}
                />
              ))}
            </div>
          </EditCategoryItem>
        </EditCategorylItemList>
        <MemoModalButton
          onClick={() => {
            if (!title || selected == -1) return;

            dispatch(
              editCategory({
                id: id,
                title: title,
                color: colors[selected],
              }),
            );
            closeModal();
          }}
        >
          변경
        </MemoModalButton>
      </EditCategoryContainer>
    </MemoModalContainer>
  );
};

export default EditCategory;
