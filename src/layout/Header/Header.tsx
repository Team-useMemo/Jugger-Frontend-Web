import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HeaderButtonContainer, HeaderTitle, HeaderTitleCircle, StyledHeader } from './Header.Style';
import MenuSVG from '@assets/icons/menu.svg?react';

import useModal from '@hooks/useModal';
import Search from '@components/Modal/Search/Search';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import { useEffect, useRef } from 'react';
import { useGetCategoriesQuery } from '@stores/modules/category';

const Header = ({ activeMenu, closeMenu }: { activeMenu: () => void; closeMenu: () => void }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [], } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const category = categories.find((e) => e.uuid == categoryId);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [SearchCategoryModal, openSearchCategoryModal] = useModal(
    'search',
    FullScreenGray,
    ({ closeModal }) => <Search closeModal={closeModal} />,
    [],
    {},
  );

  const onSearchClick = () => {
    openSearchCategoryModal();
  };

  const onDetailClick = () => alert('상세');

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInsideModal = target.closest('.modal-container');

      if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isInsideModal) {
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [closeMenu]);

  return (
    <>
      <SearchCategoryModal />
      <StyledHeader ref={modalRef}>
        <MenuSVG onClick={activeMenu} />
        <HeaderTitle>
          {category && (
            <>
              <HeaderTitleCircle color={category.color} />
              {category.name}
            </>
          )}
        </HeaderTitle>
        <HeaderButtonContainer>
          <SearchSVG onClick={onSearchClick} />
          <DetailSVG onClick={onDetailClick} />
          <button
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('username');
              navigate('/login');
            }}
          >
            TEST 로그아웃
          </button>
        </HeaderButtonContainer>
      </StyledHeader>
    </>
  );
};

export default Header;
