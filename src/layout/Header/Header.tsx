import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import { useSearchParams } from 'react-router-dom';
import { HeaderButtonContainer, HeaderTitle, HeaderTitleCircle, StyledHeader } from './Header.Style';
import MenuSVG from '@assets/icons/menu.svg?react';
import { useAppSelector } from '@hooks/useRedux';

const Header = ({ activeMenu }: { activeMenu: () => void }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const categories = useAppSelector((state) => state.categorySlice.value);
  const category = categories.find((e) => e.id == categoryId);

  const onSearchClick = () => alert('검색');
  const onDetailClick = () => alert('상세');
  return (
    <StyledHeader>
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
  );
};

export default Header;
