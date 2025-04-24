import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import { useSearchParams } from 'react-router-dom';
import { HeaderButtonContainer, HeaderTitle, HeaderTitleCircle, StyledHeader } from './Header.Style';
import MenuSVG from '@assets/icons/menu.svg?react';
import { useAppSelector } from '@hooks/useRedux';
import useModal from '@hooks/useModal';
import Search from '@components/Modal/Search/Search';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import { useEffect, useRef } from 'react';

const Header = ({ activeMenu, closeMenu }: { activeMenu: () => void; closeMenu: () => void }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const categories = useAppSelector((state) => state.category.value);
  const category = categories.find((e) => e.id == categoryId);
  const modalRef = useRef<HTMLDivElement>(null);

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
              {category.title}
            </>
          )}
        </HeaderTitle>
        <HeaderButtonContainer>
          <SearchSVG onClick={onSearchClick} />
          <DetailSVG onClick={onDetailClick} />
        </HeaderButtonContainer>
      </StyledHeader>
    </>
  );
};

export default Header;
