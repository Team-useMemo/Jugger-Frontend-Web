import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import { useSearchParams } from 'react-router-dom';
import { HeaderButtonContainer, HeaderTitle, HeaderTitleCircle, StyledHeader } from './Header.Style';
import MenuSVG from '@assets/icons/menu.svg?react';

const Header = ({ activeMenu }: { activeMenu: () => void }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  console.log(category);

  const onSearchClick = () => alert('검색');
  const onDetailClick = () => alert('상세');
  return (
    <StyledHeader>
      <MenuSVG onClick={activeMenu} />
      <HeaderTitle>
        {category && (
          <>
            <HeaderTitleCircle color={'#F553DA'} />
            {category}
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
