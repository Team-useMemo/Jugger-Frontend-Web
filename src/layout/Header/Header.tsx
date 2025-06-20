import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalOpen } from '@stores/modules/modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import useMemoCollectionMenu from '@components/Menu/MemoCollectionMenu';
import DetailSVG from '@assets/Header/detail.svg?react';
import SearchSVG from '@assets/Header/search.svg?react';
import MenuSVG from '@assets/icons/menu.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import {
  HeaderButtonContainer,
  HeaderContainer,
  HeaderContents,
  HeaderMenuContainer,
  HeaderTitleContainer,
} from './Header.Style';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const [searchParams] = useSearchParams();

  const [MemoCollectionMenu, openMenu] = useMemoCollectionMenu();

  const currentCategory = searchParams.get('category');
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const category = categories.find((e) => e.categoryId == currentCategory);

  const onSearchClick = () => {
    dispatch(setModalOpen({ name: ModalName.searchMemo }));
  };

  const onDetailClick = () => {
    openMenu();
  };

  const handleClickOpenMenu = () => {
    dispatch(setModalOpen({ name: ModalName.sideBar }));
  };

  return (
    <HeaderContainer>
      <MemoCollectionMenu />
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
          {!isMobile && (
            <button
              style={{ background: 'gray' }}
              onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('username');
                navigate('/');
              }}
            >
              로그아웃
            </button>
          )}
        </HeaderButtonContainer>
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;
