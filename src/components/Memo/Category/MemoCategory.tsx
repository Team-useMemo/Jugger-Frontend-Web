import { CategoryProp } from '@ts/Category.Prop';
import { MemoCategoryContainer } from './MemoCategory.Style';

const MemoCategory = ({ category }: { category: CategoryProp }) => {
  return (
    <MemoCategoryContainer color={category.categoryColor}>
      <p>{category?.categoryName}</p>
    </MemoCategoryContainer>
  );
};

export default MemoCategory;
