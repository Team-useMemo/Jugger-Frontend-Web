import styled from '@emotion/styled';
import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetPhotosQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import useParamModal, { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { theme } from '@styles/theme';
import CloseSVG from '@assets/icons/close.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import ModalLayoutGray from '../Layout/ModalLayoutGray';
import DetailImageMemo from '../MemoViewer/Image/DetailImageMemo';
import {
  MemoCollectionBodyContainer,
  MemoCollectionBodyTitle,
  MemoCollectionContainer,
  MemoCollectionContents,
  MemoCollectionHeader,
  MemoCollectionHeaderContents,
  MemoCollectionHeaderItem,
  MemoCollectionSideBar,
  MemoCollectionSideBarItemContainer,
} from './MemoCollection.Style';

const MemoCollectionImageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

const MemoCollectionImageListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MemoCollectionImageListTitle = styled.p({
  padding: '12px 16px',
  borderTopLeftRadius: theme.radius[12],
  borderTopRightRadius: theme.radius[12],
  boxShadow: theme.shadow.normal,

  ...theme.font.label1normal.semibold,
  color: theme.color.label.neutral,
  margin: '0',
  marginRight: 'auto',
});

const MemoCollectionImageListContents = styled.div({
  display: 'grid',
  gridAutoFlow: 'row',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  padding: '18px',
  columnGap: '16px',
  rowGap: '16px',

  boxShadow: theme.shadow.emphasize,
  borderRadius: theme.radius[12],
  borderTopLeftRadius: '',
  background: theme.color.background.normal,
});

const MemoCollectionImageItem = styled.div({
  display: 'flex',
  width: 'auto',
  aspectRatio: '1 / 1',
  borderRadius: theme.radius[8],
  position: 'relative',
  overflow: 'hidden',

  ['>img']: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const MemoCollectionImage = ({ category }: { category: string }) => {
  const { data: imageLists = [] } = useGetPhotosQuery({ category_uuid: category });

  const images = Object.entries(
    [...imageLists].reverse().reduce((acc: any, e) => {
      const dateStr = new Date(e.timestamp).toDateString();
      return {
        ...acc,
        [dateStr]: acc[dateStr] ? [...acc[dateStr], e] : [e],
      };
    }, {}),
  );

  const dispatch = useAppDispatch();

  const handleClickImage = (image: { url: string }) => {
    dispatch(setModalOpen({ name: ModalName.detailImageMemoCollection, value: { image: image.url } }));
  };

  return (
    <MemoCollectionImageContainer>
      {images.map(([date, imageArr]: [string, any]) => (
        <MemoCollectionImageListContainer key={`IMAGE_COLLECTION_${date}`}>
          <MemoCollectionImageListTitle>
            {formatDate(new Date(date), '{YYYY}년 {MM}월 {DD}일 {W}요일')}
          </MemoCollectionImageListTitle>
          <MemoCollectionImageListContents>
            {imageArr.map((image: { url: string }, i: number) => (
              <MemoCollectionImageItem key={`IMAGE_COLLECTION_${date}_${i}`} onClick={() => handleClickImage(image)}>
                <img src={image.url} />
              </MemoCollectionImageItem>
            ))}
          </MemoCollectionImageListContents>
        </MemoCollectionImageListContainer>
      ))}
    </MemoCollectionImageContainer>
  );
};

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

  return (
    <MemoCollectionContainer>
      <DetailImageMemoModal />
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
        <MemoCollectionBodyContainer>
          {selectedCategory && (
            <MemoCollectionBodyTitle>
              {categories.find((e) => e.uuid == selectedCategory)?.name}
              <RightArrowSVG />
            </MemoCollectionBodyTitle>
          )}
          {collectionType}
          {collectionType == 'image' && <MemoCollectionImage category={selectedCategory} />}
        </MemoCollectionBodyContainer>
      </MemoCollectionContents>
    </MemoCollectionContainer>
  );
};

export default MemoCollection;

// import { useGetCategoriesQuery } from '@stores/modules/category';
// import { useState } from 'react';
// import CloseSVG from '@assets/icons/close.svg?react';
// import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
// import MemoCollectionImage from './Image/MemoCollectionImage';
// import MemoCollectionLink from './Link/MemoCollectionLink';
// import {
//   MemoCollectionBodyContainer,
//   MemoCollectionBodyContents,
//   MemoCollectionBodyTitle,
//   MemoCollectionCategories,
//   MemoCollectionCategoryItem,
//   MemoCollectionContainer,
//   MemoCollectionContents,
//   MemoCollectionHeader,
//   MemoCollectionTitle,
//   MemoCollectionTitleItem,
// } from './MemoCollection.Style';
// import MemoCollectionSchedule from './Schedule/MemoCollectionSchedule';
// import { ModalComponentProps } from '@hooks/useParamModal';

// const contentsTypeList = [{ Image: '사진' }, { Calendar: '캘린더' }, { Link: '링크' }];

// const MemoCollection = ({ closeModal, props }: ModalComponentProps) => {
//   const [contentsType, setContentsType] = useState(props.contentsType);
//   const [categoryId, setCategoryId] = useState(props.categoryId);
//   const { data: _categories = [] } = useGetCategoriesQuery();
//   const categories = [{ uuid: '', color: '#171719', name: '전체' }, ..._categories];
//   // 추후 수정 필요
//   return (
//     <MemoCollectionContainer>
//       <MemoCollectionHeader>
//         {/* <MemoViewerCloseContainer>
//           <CloseSVG onClick={closeModal} />
//         </MemoViewerCloseContainer> */}
//         <MemoCollectionTitle>
//           {contentsTypeList.map((e) => {
//             const [[key, value]] = Object.entries(e);
//             return (
//               <MemoCollectionTitleItem
//                 isFocus={contentsType == key}
//                 key={`CONTENTS_${key}`}
//                 onClick={() => setContentsType(key)}
//               >
//                 {value}
//               </MemoCollectionTitleItem>
//             );
//           })}
//         </MemoCollectionTitle>
//       </MemoCollectionHeader>
//       <MemoCollectionContents>
//         <MemoCollectionCategories>
//           {categories.map((e, i) => (
//             <MemoCollectionCategoryItem
//               isFocus={categoryId == e.uuid}
//               color={e.color}
//               key={`COLLECTION_${i}`}
//               onClick={() => {
//                 setCategoryId(e.uuid);
//               }}
//             >
//               <span />
//               {e.name}
//             </MemoCollectionCategoryItem>
//           ))}
//         </MemoCollectionCategories>
//         <MemoCollectionBodyContainer>
//           {categoryId && (
//             <MemoCollectionBodyTitle>
//               {categories.find(({ uuid }) => uuid == categoryId)?.name}
//               <RightArrowSVG />
//             </MemoCollectionBodyTitle>
//           )}
//           <MemoCollectionBodyContents>
//             {contentsType == 'Image' ? (
//               <MemoCollectionImage categoryId={categoryId} />
//             ) : contentsType == 'Calendar' ? (
//               <MemoCollectionSchedule categoryId={categoryId} />
//             ) : contentsType == 'Link' ? (
//               <MemoCollectionLink categoryId={categoryId} />
//             ) : (
//               ''
//             )}
//           </MemoCollectionBodyContents>
//         </MemoCollectionBodyContainer>
//       </MemoCollectionContents>
//     </MemoCollectionContainer>
//   );
// };

// export default MemoCollection;
