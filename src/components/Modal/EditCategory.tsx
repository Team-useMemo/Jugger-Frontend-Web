import {
  CategoryContainer,
  CategoryItem,
  CategoryItemContent,
  CategoryItemTitle,
  CategorylItemList,
  MemoModalButton,
  MemoModalCloseContainer,
  MemoModalContainer,
  MemoModalTitle,
} from './Modal.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import { useState } from 'react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { useEditCategoryMutation } from '@stores/modules/category';

const EditCategory = ({
  id,
  name,
  initialColor,
  closeModal,
}: {
  id: string;
  name: string;
  initialColor: string;
  closeModal: () => void;
}) => {
  const [title, setTitle] = useState(name);
  const colors = ['#FF4242', '#00BF40', '#00AEFF', '#FF5E00', '#00BDDE', '#4F29E5', '#CB59FF', '#F553DA'];
  const [selected, setSelected] = useState(colors.findIndex((color) => color === initialColor));
  const [editCategory] = useEditCategoryMutation();

  return (
    <MemoModalContainer>
      <MemoModalCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoModalCloseContainer>
      <CategoryContainer>
        <MemoModalTitle>카테고리 변경</MemoModalTitle>
        <CategorylItemList>
          <CategoryItem>
            <CategoryItemTitle>카테고리 이름</CategoryItemTitle>
            <CategoryItemContent>
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
            </CategoryItemContent>
          </CategoryItem>
          <CategoryItem>
            <CategoryItemTitle>카테고리 색상</CategoryItemTitle>
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
          </CategoryItem>
        </CategorylItemList>
        <MemoModalButton
          onClick={() => {
            if (!title || selected === -1) return;
            // Call RTK Query mutation
            editCategory({
              id,
              title,
              color: colors[selected],
            }).then(() => {
              closeModal();
            });
          }}
        >
          변경
        </MemoModalButton>
      </CategoryContainer>
    </MemoModalContainer>
  );
};

export default EditCategory;
