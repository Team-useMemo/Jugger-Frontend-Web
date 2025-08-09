import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalOpen } from '@stores/modules/modal';
import { useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import useMenu from '@hooks/useMenu';
import { useAppDispatch } from '@hooks/useRedux';
import MemoCollectionMenu from '@components/Menu/MemoCollectionMenu';
import DetailSVG from '@assets/icons/detail.svg?react';
import MenuSVG from '@assets/icons/menu.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import {
  HeaderButtonContainer,
  HeaderContainer,
  HeaderContents,
  HeaderMenuContainer,
  HeaderTitleContainer,
} from './Header.Style';

const Header = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const category = categories.find((e) => e.categoryId == currentCategory);

  const [CollectionMenu, openCollectionMenu] = useMenu(MemoCollectionMenu);

  const onSearchClick = () => {
    dispatch(setModalOpen({ name: ModalName.searchMemo }));
  };

  const onDetailClick = () => {
    openCollectionMenu();
  };

  const handleClickOpenMenu = () => {
    dispatch(setModalOpen({ name: ModalName.sideBar }));
  };

  return (
    <HeaderContainer>
      <CollectionMenu />
      <HeaderContents>
        <HeaderMenuContainer>
          <MenuSVG onClick={handleClickOpenMenu} />
        </HeaderMenuContainer>
        {category && (
          <HeaderTitleContainer color={category.categoryColor}>
            <p>{category.categoryName}</p>
            <RightArrowSVG />
          </HeaderTitleContainer>
        )}
        <HeaderButtonContainer>
          <SearchSVG onClick={onSearchClick} />
          <DetailSVG onClick={onDetailClick} />
        </HeaderButtonContainer>
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;
