import { useGetCategoriesQuery } from '@stores/modules/category';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryProp } from '@ts/Category.Prop';
import { ModalName } from '@utils/Modal';
import useParamModal, { ModalComponentProps } from '@hooks/useParamModal';
import CloseSVG from '@assets/icons/close.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import ModalLayoutGray from '../Layout/ModalLayoutGray';
import DetailImageMemo from '../MemoViewer/Image/DetailImageMemo';
import DetailScheduleMemo from '../MemoViewer/Schedule/DetailScheduleMemo';
import MemoCollectionImage from './Image/MemoCollectionImage';
import MemoCollectionLink from './Link/MemoCollectionLink';
import {
  MemoCollectionBodyContainer,
  MemoCollectionBodyLayout,
  MemoCollectionBodyTitle,
  MemoCollectionContainer,
  MemoCollectionContents,
  MemoCollectionHeader,
  MemoCollectionHeaderContents,
  MemoCollectionHeaderItem,
  MemoCollectionSideBar,
  MemoCollectionSideBarItemContainer,
} from './MemoCollection.Style';
import MemoCollectionSchedule from './Schedule/MemoCollectionSchedule';

const MemoCollection = ({ closeModal, props }: ModalComponentProps) => {
  const [collectionType, setCollectionType] = useState(props.type);

  const [searchParams] = useSearchParams();
  const [currentCategory] = useState(searchParams.get('category') ?? '');
  const { data: _categories = [] } = useGetCategoriesQuery();
  const categories: CategoryProp[] = useMemo(() => {
    return [
      {
        categoryId: '',
        categoryColor: '#171719',
        categoryName: '전체',
        isPinned: false,
        recentMessage: '',
        updateAt: new Date(),
      },
      ..._categories,
    ];
  }, [_categories]);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const typeList = [{ image: '사진' }, { schedule: '캘린더' }, { link: '링크' }];

  const handleClickCollectionType = (type: string) => {
    setCollectionType(type);
  };

  const [DetailImageMemoModal] = useParamModal(ModalName.detailImageMemoCollection, ModalLayoutGray, DetailImageMemo);
  const [DetailScheduleMemoModal] = useParamModal(
    ModalName.detailScheduleMemoCollection,
    ModalLayoutGray,
    DetailScheduleMemo,
  );

  return (
    <MemoCollectionContainer>
      <DetailImageMemoModal />
      <DetailScheduleMemoModal />
      <MemoCollectionHeader>
        <CloseSVG onClick={closeModal} />
        <MemoCollectionHeaderContents>
          {typeList.map((e) => {
            const [[key, value]] = Object.entries(e);
            return (
              <MemoCollectionHeaderItem
                key={`COLLECTION_TYPE_${key}`}
                isFocused={key == collectionType}
                onClick={() => handleClickCollectionType(key)}
              >
                {value}
              </MemoCollectionHeaderItem>
            );
          })}
        </MemoCollectionHeaderContents>
      </MemoCollectionHeader>
      <MemoCollectionContents>
        <MemoCollectionSideBar>
          {categories.map(({ categoryId, categoryColor, categoryName }) => (
            <MemoCollectionSideBarItemContainer
              key={`COLLECTION_CATEGORY_${categoryId}`}
              isFocused={categoryId == selectedCategory}
              color={categoryColor}
              onClick={() => setSelectedCategory(categoryId)}
            >
              <p>{categoryName}</p>
            </MemoCollectionSideBarItemContainer>
          ))}
        </MemoCollectionSideBar>
        <MemoCollectionBodyLayout>
          <MemoCollectionBodyContainer>
            <MemoCollectionBodyTitle>
              <p>{categories.find(({ categoryId }) => categoryId == selectedCategory)?.categoryName}</p>
              <RightArrowSVG />
            </MemoCollectionBodyTitle>
            {collectionType == 'image' && <MemoCollectionImage category={selectedCategory} />}
            {collectionType == 'schedule' && <MemoCollectionSchedule category={selectedCategory} />}
            {collectionType == 'link' && <MemoCollectionLink category={selectedCategory} />}
          </MemoCollectionBodyContainer>
        </MemoCollectionBodyLayout>
      </MemoCollectionContents>
    </MemoCollectionContainer>
  );
};

export default MemoCollection;
