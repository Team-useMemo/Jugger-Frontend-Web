import { useGetCategoriesQuery } from '@stores/modules/category';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const categories = [{ uuid: '', color: '#171719', name: '전체' }, ..._categories];
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
          {categories.map((e) => (
            <MemoCollectionSideBarItemContainer
              key={`COLLECTION_CATEGORY_${e.uuid}`}
              isFocused={e.uuid == selectedCategory}
              color={e.color}
              onClick={() => setSelectedCategory(e.uuid)}
            >
              <span />
              {e.name}
            </MemoCollectionSideBarItemContainer>
          ))}
        </MemoCollectionSideBar>
        <MemoCollectionBodyLayout>
          <MemoCollectionBodyContainer>
            <MemoCollectionBodyTitle>
              {categories.find((e) => e.uuid == selectedCategory)?.name}
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
