import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalOpen, setModalValue } from '@stores/modules/modal';
import { useMemo } from 'react';
import { CategoryProp } from '@ts/Category.Prop';
import { ModalName } from '@utils/Modal';
import useMenu from '@hooks/useMenu';
import useParamModal, { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import MemoCollectionCategoryMenu from '@components/Menu/MemoCollectionCategoryMenu';
import CloseSVG from '@assets/icons/close.svg?react';
import DetailSVG from '@assets/icons/detail.svg?react';
import MenuSVG from '@assets/icons/menu.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import { DefaultModalHeader, DefaultModalHeaderTitle } from '../DefaultModal.Style';
import ModalLayoutGray from '../Layout/ModalLayoutGray';
import MemoDetailImage from '../MemoDetail/Image/MemoDetailImage';
import MemoDetailSchedule from '../MemoDetail/Schedule/MemoDetailSchedule';
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
  MemoCollectionLayout,
  MemoCollectionSideBar,
  MemoCollectionSideBarItemContainer,
} from './MemoCollection.Style';
import MemoCollectionSchedule from './Schedule/MemoCollectionSchedule';

type CollectionType = 'image' | 'schedule' | 'link';
const typeList: { key: CollectionType; title: string }[] = [
  { key: 'image', title: '사진' },
  { key: 'schedule', title: '캘린더' },
  { key: 'link', title: '링크' },
];

const MemoCollection = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isMobile = useIsMobile();

  const { type: collectionType, categoryId: selectedCategoryId } = props ?? {};

  // const [collectionType, setCollectionType] = useState<CollectionType>(props?.type);
  // const [currentCategory] = useState(props?.categoryId);
  const { data: _categories = [] } = useGetCategoriesQuery();
  const categories: CategoryProp[] = useMemo(
    () => [
      {
        categoryId: '',
        categoryColor: '#171719',
        categoryName: '전체',
        isPinned: false,
        recentMessage: '',
        updateAt: new Date(),
      },
      ..._categories,
    ],
    [_categories],
  );
  const selectedCategory = categories.find((category) => category.categoryId == selectedCategoryId);

  const dispatch = useAppDispatch();

  const handleClickCollectionType = (type: CollectionType) => {
    dispatch(
      setModalValue({
        name: ModalName.memoCollection,
        value: {
          type: type,
          categoryId: selectedCategoryId,
        },
      }),
    );
  };

  const handleChangeCategory = (category: string) => {
    dispatch(
      setModalValue({
        name: ModalName.memoCollection,
        value: {
          type: collectionType,
          categoryId: category,
        },
      }),
    );
  };

  const [DetailImageMemoModal] = useParamModal(ModalName.detailImageMemoCollection, ModalLayoutGray, MemoDetailImage);
  const [DetailScheduleMemoModal] = useParamModal(
    ModalName.detailScheduleMemoCollection,
    ModalLayoutGray,
    MemoDetailSchedule,
  );

  const [CategoryMenu, openCategoryMenu] = useMenu(
    MemoCollectionCategoryMenu,
    {
      currentCategory: selectedCategoryId,
      categories: categories,
    },
    [handleChangeCategory],
  );

  const onSearchClick = () => {
    dispatch(setModalOpen({ name: ModalName.searchMemo }));
  };

  const onDetailClick = () => {};

  const handleClickOpenMenu = () => {
    dispatch(setModalOpen({ name: ModalName.sideBar }));
  };

  return (
    <MemoCollectionLayout>
      <DetailImageMemoModal />
      <DetailScheduleMemoModal />
      <MemoCollectionContainer ref={modalRef}>
        {isMobile && (
          <DefaultModalHeader>
            <MenuSVG onClick={handleClickOpenMenu} />
            <span className="grow" />
            <SearchSVG onClick={onSearchClick} />
            <DetailSVG onClick={onDetailClick} />
            <DefaultModalHeaderTitle color={selectedCategory?.categoryColor} onClick={openCategoryMenu}>
              <CategoryMenu />
              <p>{selectedCategory?.categoryName}</p>
              <RightArrowSVG />
            </DefaultModalHeaderTitle>
          </DefaultModalHeader>
        )}
        <MemoCollectionHeader>
          {!isMobile && <CloseSVG onClick={closeModal} />}
          <MemoCollectionHeaderContents>
            {typeList.map(({ key, title }) => (
              <MemoCollectionHeaderItem
                key={`COLLECTION_TYPE_${key}`}
                isFocused={key == collectionType}
                onClick={() => handleClickCollectionType(key)}
              >
                {title}
              </MemoCollectionHeaderItem>
            ))}
          </MemoCollectionHeaderContents>
        </MemoCollectionHeader>
        <MemoCollectionContents>
          {!isMobile && (
            <MemoCollectionSideBar>
              {categories.map(({ categoryId, categoryColor, categoryName }) => (
                <MemoCollectionSideBarItemContainer
                  key={`COLLECTION_CATEGORY_${categoryId}`}
                  isFocused={categoryId == selectedCategory?.categoryId}
                  color={categoryColor}
                  onClick={() => handleChangeCategory(categoryId)}
                >
                  <p>{categoryName}</p>
                </MemoCollectionSideBarItemContainer>
              ))}
            </MemoCollectionSideBar>
          )}
          <MemoCollectionBodyLayout>
            <MemoCollectionBodyContainer>
              {!isMobile && (
                <MemoCollectionBodyTitle>
                  <p>{selectedCategory?.categoryName}</p>
                  <RightArrowSVG />
                </MemoCollectionBodyTitle>
              )}
              {collectionType == 'image' && <MemoCollectionImage category={selectedCategory} />}
              {collectionType == 'schedule' && <MemoCollectionSchedule category={selectedCategory} />}
              {collectionType == 'link' && <MemoCollectionLink category={selectedCategory} />}
            </MemoCollectionBodyContainer>
          </MemoCollectionBodyLayout>
        </MemoCollectionContents>
      </MemoCollectionContainer>
    </MemoCollectionLayout>
  );
};

export default MemoCollection;
