import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalOpen } from '@stores/modules/modal';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import SearchMemo from '@components/Modal/SearchMemo/SearchMemo';
import DetailSVG from '@assets/Header/detail.svg?react';
import SearchSVG from '@assets/Header/search.svg?react';
import MenuSVG from '@assets/icons/menu.svg?react';
import { HeaderButtonContainer, HeaderTitle, HeaderTitleCircle, StyledHeader } from './Header.Style';

const Header = ({ activeMenu }: { activeMenu: () => void }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const category = categories.find((e) => e.uuid == categoryId);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSearchClick = () => {
    dispatch(setModalOpen({ name: ModalName.searchMemo }));
  };

  const onDetailClick = () => alert('상세');

  const [SearchMemoModal] = useParamModal(ModalName.searchMemo, ModalLayoutGray, SearchMemo);

  return (
    <StyledHeader ref={modalRef}>
      <SearchMemoModal />
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
            navigate('/');
          }}
        >
          로그아웃
        </button>
      </HeaderButtonContainer>
    </StyledHeader>
  );
};

export default Header;
