import styled from '@emotion/styled';
import { MemoModalButton, MemoModalCloseContainer, MemoModalContainer, MemoModalTitle } from './Modal.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import { useState } from 'react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { addCategory } from '@stores/modules/category';
import { useNavigate } from 'react-router-dom';
import { media } from '@styles/theme';

const AddCategoryContainer = styled.div({
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

const AddCategorylItemList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const AddCategoryItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const AddCategoryItemTitle = styled.p({
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
});

const AddCategoryItemContent = styled.div({
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

const AddCategory = ({ closeModal }: { closeModal: () => void; props: any }) => {
  const [title, setTitle] = useState('');
  const colors = ['#FF4242', '#00BF40', '#00AEFF', '#FF5E00', '#00BDDE', '#4F29E5', '#CB59FF', '#F553DA'];
  const [selected, setSelected] = useState(-1);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categorySlice.value);

  return (
    <MemoModalContainer>
      <MemoModalCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoModalCloseContainer>
      <AddCategoryContainer>
        <MemoModalTitle>카테고리 추가</MemoModalTitle>
        <AddCategorylItemList>
          <AddCategoryItem>
            <AddCategoryItemTitle>카테고리 이름</AddCategoryItemTitle>
            <AddCategoryItemContent>
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
            </AddCategoryItemContent>
          </AddCategoryItem>
          <AddCategoryItem>
            <AddCategoryItemTitle>카테고리 색상</AddCategoryItemTitle>
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
          </AddCategoryItem>
        </AddCategorylItemList>
        <MemoModalButton
          onClick={() => {
            if (!title || selected == -1) return;

            dispatch(
              addCategory({
                title: title,
                color: colors[selected],
              }),
            );
            closeModal();
            const id =
              categories.reduce((acc, e) => {
                return Math.max(acc, e.id);
              }, 0) + 1;

            navigate(`?category=${id}`);
          }}
        >
          추가
        </MemoModalButton>
      </AddCategoryContainer>
    </MemoModalContainer>
  );
};

export default AddCategory;
