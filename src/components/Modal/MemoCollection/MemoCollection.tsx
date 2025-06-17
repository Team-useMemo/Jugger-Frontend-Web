import styled from '@emotion/styled';
import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetLinksQuery, useGetPhotosQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useOgData } from '@hooks/useOgData';
import useParamModal, { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { theme } from '@styles/theme';
import LoadingGIF from '@assets/Loading.gif';
import CloseSVG from '@assets/icons/close.svg?react';
import MoreSVG from '@assets/icons/more.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import ModalLayoutGray from '../Layout/ModalLayoutGray';
import DetailImageMemo from '../MemoViewer/Image/DetailImageMemo';
import DetailScheduleMemo from '../MemoViewer/Schedule/DetailScheduleMemo';
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
  borderTopLeftRadius: '0',
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

const MemoCollectionLinkContainer = styled.div({
  display: 'grid',
  gridAutoFlow: 'row',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  columnGap: '12px',
  rowGap: '24px',
});

const MemoCollectionLinkItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.radius[12],
  padding: '12px',
  boxShadow: theme.shadow.emphasize,
  gap: '12px',
});

const MemoCollectionLinkItemImageContainer = styled.div({
  aspectRatio: '4 / 3',
  borderRadius: theme.radius[6],
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',

  ['>img']: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    objectFit: 'cover',
  },

  ['>svg']: {
    position: 'absolute',
    background: theme.color.material.dimmer,
    borderRadius: theme.radius[4],
    right: '0',
    margin: '10px',
    display: 'none',

    [':hover']: {
      background: theme.color.label.alternative,
    },
  },

  [':hover']: {
    ['>svg']: {
      display: 'block',
    },
  },
});

const MemoCollectionLinkItemTextContainer = styled.div({
  width: '100%',
  overflow: 'hidden',

  ['>p']: {
    margin: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',

    ['&.title']: {
      ...theme.font.caption1.semibold,
      color: theme.color.label.neutral,
    },
    ['&.desc']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.assistive,
      margin: '2px 0px 4px',
    },
    ['&.url']: {
      ...theme.font.caption2.medium,
      color: theme.color.label.alternative,
    },
  },
});

const MemoCollectionLinkItemCategoryContainer = styled.div(
  ({ color }: { color?: string }) => ({
    ['>span']: {
      background: color,
    },

    ['::before']: {
      background: color,
    },
  }),
  {
    background: 'white',
    padding: '6px 10px',
    position: 'absolute',
    margin: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: theme.radius[48],
    overflow: 'hidden',
    zIndex: '1',

    ...theme.font.caption1.medium,
    color: theme.color.label.normal,

    ['>span']: {
      width: '6px',
      aspectRatio: '1 / 1',
      borderRadius: theme.radius.full,
    },

    ['::before']: {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: '0.1',
      left: 0,
      zIndex: '-1',
    },
  },
);

const MemoCollectionLinkItem = ({ link, category }: any) => {
  const { content } = link;
  const ogData = useOgData(content);
  const { ogImage, ogTitle, ogDescription, ogUrl } = ogData || {};

  const handleClickLinkItemMore = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
  };

  const handleClickLinkItem = () => {
    window.open(content);
  };

  return (
    <MemoCollectionLinkItemContainer>
      <MemoCollectionLinkItemImageContainer onClick={handleClickLinkItem}>
        <img src={ogImage || LoadingGIF} />
        <MemoCollectionLinkItemCategoryContainer color={category.color}>
          <span />
          {category.name}
        </MemoCollectionLinkItemCategoryContainer>
        <MoreSVG onClick={handleClickLinkItemMore} />
      </MemoCollectionLinkItemImageContainer>
      <MemoCollectionLinkItemTextContainer>
        <p className="title">{ogTitle}</p>
        <p className="desc">{ogDescription}</p>
        <p className="url">{ogUrl}</p>
      </MemoCollectionLinkItemTextContainer>
    </MemoCollectionLinkItemContainer>
  );
};

const MemoCollectionLink = ({ category }: { category: string }) => {
  const { data: linkList = [] } = useGetLinksQuery({ categoryId: category });
  const { data: _categories = [] } = useGetCategoriesQuery();
  const categories = [{ uuid: '', color: '#171719', name: '전체' }, ..._categories];
  console.log(linkList);

  return (
    <MemoCollectionLinkContainer>
      {linkList.map((e) => (
        <MemoCollectionLinkItem
          key={`LINK_COLLECTION_${category}_${e.content}`}
          link={e}
          category={categories.find((category) => category.uuid == e.categoryId)}
        />
      ))}
    </MemoCollectionLinkContainer>
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
