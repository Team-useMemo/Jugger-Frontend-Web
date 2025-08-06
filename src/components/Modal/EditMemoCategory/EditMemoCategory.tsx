import { useGetCategoriesQuery } from '@stores/modules/category';
import { useState } from 'react';
import { formatDate } from '@utils/Date';
import { useEditCategoryMemo } from '@hooks/memo/useMemoActions';
import { useOgData } from '@hooks/useOgData';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import CloseSVG from '@assets/icons/close.svg?react';
import { DefaultModalLayout } from '../DefaultModal.Style';
import {
  CategoryContainer,
  CategoryContents,
  CategoryItem,
  CategoryLabel,
  CloseButtonWrapper,
  Container,
  MemoContent,
  MemoImage,
  MemoLabel,
  MemoLabelBar,
  MemoLabelText,
} from './EditMemoCategory.Style';

const EditMemoCategory = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const { chatId, categoryId, type, content } = props ?? {};
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categoryId);
  const { data: categories = [] } = useGetCategoriesQuery();
  const ogData = useOgData(type === 'LINK' ? content : '');
  const { ogDescription } = ogData || {};

  const { editCategoryMemo } = useEditCategoryMemo();

  const handleEditMemoCategory = () => {
    editCategoryMemo(chatId, selectedCategoryId);

    closeModal?.();
  };
  console.log(content);

  return (
    <DefaultModalLayout>
      <Container ref={modalRef}>
        <CloseButtonWrapper>
          <CloseSVG onClick={closeModal} />
        </CloseButtonWrapper>
        <CategoryContainer>
          <CategoryLabel>카테고리 선택</CategoryLabel>
          <MemoLabel>
            <MemoLabelBar />
            <MemoLabelText>
              <div>
                {type === 'TEXT'
                  ? '메모'
                  : type === 'LINK'
                    ? content
                    : type === 'CALENDAR'
                      ? formatDate(content.startDate, '{M}.{DD} {hh}:{mm}')
                      : type === 'PHOTO'
                        ? '사진'
                        : ''}
              </div>
              <MemoContent>
                {type === 'TEXT' ? (
                  content
                ) : type === 'LINK' ? (
                  ogDescription
                ) : type === 'CALENDAR' ? (
                  content.title
                ) : type === 'PHOTO' ? (
                  <MemoImage src={content.imgUrl} />
                ) : (
                  content
                )}
              </MemoContent>
            </MemoLabelText>
          </MemoLabel>
          <CategoryContents>
            {categories.map((category, i) => {
              const isSelected = selectedCategoryId === category.categoryId;
              return (
                <CategoryItem
                  key={`SEARCH_CATEGORY_${i}`}
                  color={category.categoryColor}
                  onClick={() => setSelectedCategoryId(category.categoryId)}
                  style={{
                    backgroundColor: isSelected ? `${category.categoryColor}1A` : undefined,
                    border: isSelected ? `1.5px solid ${category.categoryColor}` : 'none',
                  }}
                >
                  <span />
                  <p>{category.categoryName}</p>
                </CategoryItem>
              );
            })}
          </CategoryContents>
        </CategoryContainer>
        <JuggerButton color="primary" size="medium" onClick={handleEditMemoCategory}>
          변경하기
        </JuggerButton>
      </Container>
    </DefaultModalLayout>
  );
};

export default EditMemoCategory;
