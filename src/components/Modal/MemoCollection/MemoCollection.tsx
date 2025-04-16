import { MemoViewerCloseContainer } from '../MemoViewer/MemoViewer.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { useState } from 'react';
import { useAppSelector } from '@hooks/useRedux';
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

const contentsTypeList = [{ Image: '사진' }, { Calendar: '캘린더' }, { Link: '링크' }];

const MemoCollection = ({ closeModal, props }: { closeModal: () => void; props: any }) => {
  const [contentsType, setContentsType] = useState(props.contentsType);
  const [categoryId, setCategoryId] = useState(props.categoryId);

  const categories = [
    { id: null, color: '#171719', title: '전체' },
    ...useAppSelector((state) => state.categorySlice.value),
  ];

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
              isFocus={categoryId == e.id}
              color={e.color}
              key={`COLLECTION_${i}`}
              onClick={() => {
                setCategoryId(e.id);
              }}
            >
              <span />
              {e.title}
            </MemoCollectionCategoryItem>
          ))}
        </MemoCollectionCategories>
        <MemoCollectionBodyContainer>
          {categoryId && (
            <MemoCollectionBodyTitle>
              {categories.find(({ id }) => id == categoryId)?.title}
              <RightArrowSVG />
            </MemoCollectionBodyTitle>
          )}
          <MemoCollectionBodyContents>
            {contentsType == 'Image' ? (
              <MemoCollectionImage />
            ) : contentsType == 'Calendar' ? (
              <MemoCollectionSchedule />
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
