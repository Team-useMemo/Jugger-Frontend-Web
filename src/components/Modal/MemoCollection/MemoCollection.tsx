import { MemoViewerCloseContainer } from '../MemoViewer/MemoViewer.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { useState } from 'react';
import {
  MemoCollectionBodyContainer,
  MemoCollectionBodyContents,
  MemoCollectionBodyTitle,
  MemoCollectionCategories,
  MemoCollectionCategoryItem,
  MemoCollectionContainer,
  MemoCollectionContents,
  MemoCollectionHeader,
  MemoCollectionTitle,
  MemoCollectionTitleItem,
} from './MemoCollection.Style';
import MemoCollectionImage from './Image/MemoCollectionImage';
import MemoCollectionLink from './Link/MemoCollectionLink';
import MemoCollectionSchedule from './Schedule/MemoCollectionSchedule';
import { useGetCategoriesQuery } from '@stores/modules/category';

const contentsTypeList = [{ Image: '사진' }, { Calendar: '캘린더' }, { Link: '링크' }];

const MemoCollection = ({ closeModal, props }: { closeModal: () => void; props: any }) => {
  const [contentsType, setContentsType] = useState(props.contentsType);
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const { data: _categories = [] } = useGetCategoriesQuery();
  const categories = [{ uuid: '', color: '#171719', name: '전체' }, ..._categories];
  // 추후 수정 필요
  return (
    <MemoCollectionContainer>
      <MemoCollectionHeader>
        <MemoViewerCloseContainer>
          <CloseSVG onClick={closeModal} />
        </MemoViewerCloseContainer>
        <MemoCollectionTitle>
          {contentsTypeList.map((e) => {
            const [[key, value]] = Object.entries(e);
            return (
              <MemoCollectionTitleItem
                isFocus={contentsType == key}
                key={`CONTENTS_${key}`}
                onClick={() => setContentsType(key)}
              >
                {value}
              </MemoCollectionTitleItem>
            );
          })}
        </MemoCollectionTitle>
      </MemoCollectionHeader>
      <MemoCollectionContents>
        <MemoCollectionCategories>
          {categories.map((e, i) => (
            <MemoCollectionCategoryItem
              isFocus={categoryId == e.uuid}
              color={e.color}
              key={`COLLECTION_${i}`}
              onClick={() => {
                setCategoryId(e.uuid);
              }}
            >
              <span />
              {e.name}
            </MemoCollectionCategoryItem>
          ))}
        </MemoCollectionCategories>
        <MemoCollectionBodyContainer>
          {categoryId && (
            <MemoCollectionBodyTitle>
              {categories.find(({ uuid }) => uuid == categoryId)?.name}
              <RightArrowSVG />
            </MemoCollectionBodyTitle>
          )}
          <MemoCollectionBodyContents>
            {contentsType == 'Image' ? (
              <MemoCollectionImage />
            ) : contentsType == 'Calendar' ? (
              <MemoCollectionSchedule categoryId={categoryId} />
            ) : contentsType == 'Link' ? (
              <MemoCollectionLink />
            ) : (
              ''
            )}
          </MemoCollectionBodyContents>
        </MemoCollectionBodyContainer>
      </MemoCollectionContents>
    </MemoCollectionContainer>
  );
};

export default MemoCollection;
