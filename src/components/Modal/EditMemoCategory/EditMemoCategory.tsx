import { useGetCategoriesQuery } from '@stores/modules/category';
import { useState } from 'react';
import { CategoryProp } from '@ts/Category.Prop';
import JuggerButton from '@components/Common/JuggerButton';

import { ModalComponentProps } from '@hooks/useParamModal';

import CloseSVG from '@assets/icons/close.svg?react';
import { DefaultModalLayout } from '../DefaultModal.Style';
import {
  CategoryContainer,
  CategoryContents,
  CategoryItem,
  Container,
  CategoryLabel,
  MemoLabel,
  MemoLabelBar,
  MemoLabelText,
  MemoContent,
  CloseButtonWrapper,
  MemoImage,
} from './EditMemoCategory.Style';
import { theme } from '@styles/theme';
import { formatDate } from '@utils/Date';
import { useOgData } from '@hooks/useOgData';

const EditMemoCategory = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const { chatId, categoryId, type, content } = props ?? {};
  const [selectedCategory, setSelectedCategory] = useState<CategoryProp | null>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const ogData = useOgData(content);
  const { ogDescription } = ogData || {};
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 6;
  const handleNext = () => {
    if (selectedCategory) {
      setCurrentPage((prev) => Math.min(prev + 1, maxPage));
      // 실제 사용 시 props.onNextStep(selectedCategory) 호출 등
    }
  };
  console.log(chatId, categoryId);

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
                {type === 'TEXT'
                  ? content
                  : type === 'LINK'
                    ? ogDescription
                    : type === 'CALENDAR'
                      ? content.title
                      : type === 'PHOTO'
                        ? <MemoImage src={content} />
                        : content}
              </MemoContent>
            </MemoLabelText>
          </MemoLabel>
          <CategoryContents>
            {categories.map((e, i) => {
              const isSelected = selectedCategory?.categoryId === e.categoryId;
              return (
                <CategoryItem
                  key={`SEARCH_CATEGORY_${i}`}
                  color={e.categoryColor}
                  onClick={() => setSelectedCategory(e)}
                  style={{
                    backgroundColor: isSelected ? `${e.categoryColor}1A` : undefined,
                    border: isSelected ? `1.5px solid ${e.categoryColor}` : 'none',
                  }}
                >
                  <span />
                  <p>{e.categoryName}</p>
                </CategoryItem>
              );
            })}
          </CategoryContents>
        </CategoryContainer>
        <JuggerButton
          color="primary"
          size="medium"
          onClick={handleNext}
        >
          다음
        </JuggerButton>
        <p style={{ textAlign: 'center', marginTop: '8px', color: theme.color.label.alternative, ...theme.font.caption1.medium }}>
          {currentPage} of {maxPage}
        </p>

      </Container>
    </DefaultModalLayout>
  );
};


export default EditMemoCategory;
