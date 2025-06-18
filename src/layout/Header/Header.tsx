import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalOpen } from '@stores/modules/modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import DetailSVG from '@assets/Header/detail.svg?react';
import SearchSVG from '@assets/Header/search.svg?react';
import MenuSVG from '@assets/icons/menu.svg?react';
import { HeaderButtonContainer, HeaderContainer, HeaderMenuContainer, HeaderTitleContainer } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const category = categories.find((e) => e.categoryId == currentCategory);

  const onSearchClick = () => {
    dispatch(setModalOpen({ name: ModalName.searchMemo }));
  };

  const onDetailClick = () => alert('상세');

  const handleClickOpenMenu = () => {
    dispatch(setModalOpen({ name: ModalName.sideBar }));
  };

  return (
    <HeaderContainer>
      <HeaderMenuContainer>
        <MenuSVG onClick={handleClickOpenMenu} />
      </HeaderMenuContainer>
      {category && (
        <HeaderTitleContainer color={category.categoryColor}>
          <p>{category.categoryName}</p>
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
    </HeaderContainer>
  );
};

export default Header;
