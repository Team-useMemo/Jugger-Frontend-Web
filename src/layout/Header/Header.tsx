import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import { useSearchParams } from 'react-router-dom';
import { HeaderButtonContainer, HeaderTitle, HeaderTitleCircle, StyledHeader } from './Header.Style';

const Header = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  console.log(category);

  const onSearchClick = () => alert('검색');
  const onDetailClick = () => alert('상세');
  return (
    <StyledHeader>
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
