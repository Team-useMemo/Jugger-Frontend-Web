import { useAddCategoryMutation, useEditCategoryMutation } from '@stores/modules/category';
import { useState } from 'react';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import {
  CategoryEditorContainer,
  CategoryEditorContents,
  CategoryEditorItemColorCircle,
  CategoryEditorItemColorContainer,
  CategoryEditorItemContainer,
  CategoryEditorItemContents,
  CategoryEditorItemInput,
  CategoryEditorLayout,
  CategoryEditorTitle,
} from './CategoryEditor.Style';

const CATEGORY_COLORS = ['#FF4242', '#00BF40', '#00AEFF', '#FF5E00', '#00BDDE', '#4F29E5', '#CB59FF', '#F553DA'];

const CategoryEditor = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isEdit = !!props;
  const { id: categoryId } = props ?? {};
  const [title, setTitle] = useState<string>(props?.title ?? '');
  const [selectedColor, setSelectedColor] = useState<string>(props?.color ?? '');
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleReset = () => {
    setTitle('');
  };

  const handleClickColor = (color: string) => {
    setSelectedColor((prev) => (color == prev ? '' : color));
  };

  const handleAddCategory = async () => {
    try {
      const result = await addCategory({
        name: title,
        color: selectedColor,
      }).unwrap();
      console.log('카테고리 생성 성공:', result);
      closeModal?.();
    } catch (error) {
      console.error('카테고리 생성 실패:', error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const result = await editCategory({
        id: categoryId,
        title: title,
        color: selectedColor,
      }).unwrap();
      console.log('카테고리 수정 성공:', result);
      closeModal?.();
    } catch (error) {
      console.error('카테고리 수정 실패:', error);
    }
  };

  const isMobile = useIsMobile();

  return (
    <CategoryEditorLayout>
      <CategoryEditorContainer maxWidth="440px" ref={modalRef}>
        <CloseSVG onClick={closeModal} />
        <CategoryEditorContents>
          {!isMobile && <CategoryEditorTitle>{!isEdit ? '카테고리 추가' : '카테고리 수정'}</CategoryEditorTitle>}
          <CategoryEditorItemContainer>
            <CategoryEditorItemContents>
              카테고리 이름
              <CategoryEditorItemInput>
                <input
                  placeholder={!isEdit ? '이름을 설정해주세요' : props?.title}
                  value={title}
                  onChange={handleTitleChange}
                />
                {title && <EndContainerSVG onClick={handleTitleReset} />}
              </CategoryEditorItemInput>
            </CategoryEditorItemContents>
            <CategoryEditorItemContents>
              카테고리 색상
              <CategoryEditorItemColorContainer>
                {CATEGORY_COLORS.map((color) => (
                  <CategoryEditorItemColorCircle
                    key={`CATEGORY_COLOR_${color}`}
                    color={color}
                    isFocused={color == selectedColor}
                    onClick={() => handleClickColor(color)}
                  />
                ))}
              </CategoryEditorItemColorContainer>
            </CategoryEditorItemContents>
          </CategoryEditorItemContainer>
          <JuggerButton
            color="primary"
            size={!isMobile ? 'medium' : 'small'}
            disabled={!title || !selectedColor || (isEdit && title == props?.title && selectedColor == props?.color)}
            onClick={!isEdit ? handleAddCategory : handleEditCategory}
          >
            {!isEdit ? '추가' : '수정'}
          </JuggerButton>
        </CategoryEditorContents>
      </CategoryEditorContainer>
    </CategoryEditorLayout>
  );
};

export default CategoryEditor;
