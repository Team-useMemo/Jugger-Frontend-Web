import { useEditCategoryMutation } from '@stores/modules/category';
import { useState } from 'react';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import {
  CategoryViewerContainer,
  CategoryViewerContents,
  CategoryViewerItemColorCircle,
  CategoryViewerItemColorContainer,
  CategoryViewerItemContainer,
  CategoryViewerItemInput,
  CategoryViewerTitle,
} from './CategoryViewer.Style';

const CATEGORY_COLORS = ['#FF4242', '#00BF40', '#00AEFF', '#FF5E00', '#00BDDE', '#4F29E5', '#CB59FF', '#F553DA'];

const EditCategory = ({ closeModal, props }: ModalComponentProps) => {
  const { id: categoryId } = props;
  const [title, setTitle] = useState(props.title);
  const [selectedColor, setSelectedColor] = useState<string>(props.color);

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
      const result = await editCategory({
        id: categoryId,
        title: title,
        color: selectedColor,
      }).unwrap();
      console.log('카테고리 생성 성공:', result);
      closeModal();
    } catch (error) {
      console.error('카테고리 생성 실패:', error);
    }
  };

  return (
    <CategoryViewerContainer>
      <CloseSVG onClick={closeModal} />
      <CategoryViewerTitle>카테고리 추가</CategoryViewerTitle>
      <CategoryViewerContents>
        <CategoryViewerItemContainer>
          카테고리 이름
          <CategoryViewerItemInput>
            <input placeholder={props.title} value={title} onChange={handleTitleChange} />
            {title && <EndContainerSVG onClick={handleTitleReset} />}
          </CategoryViewerItemInput>
        </CategoryViewerItemContainer>
        <CategoryViewerItemContainer>
          카테고리 색상
          <CategoryViewerItemColorContainer>
            {CATEGORY_COLORS.map((color) => (
              <CategoryViewerItemColorCircle
                key={`CATEGORY_COLOR_${color}`}
                color={color}
                isFocused={color == selectedColor}
                onClick={() => handleClickColor(color)}
              />
            ))}
          </CategoryViewerItemColorContainer>
        </CategoryViewerItemContainer>
      </CategoryViewerContents>
      <JuggerButton
        color="primary"
        size="medium"
        disabled={!title || !selectedColor || (title == props.title && selectedColor == props.color)}
        onClick={handleAddCategory}
      >
        변경
      </JuggerButton>
    </CategoryViewerContainer>
  );
};

export default EditCategory;
