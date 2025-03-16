import { StyledHeader, HeaderContainer, HeaderLogo, IconContainer } from './Header.Style';
import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import LogoSVG from '@assets/Header/logo.svg?react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const onSearchClick = () => {
    alert('검색');
  };
  const onDetailClick = () => {
    alert('상세');
  };
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderLogo onClick={() => navigate('/')}>
          <LogoSVG />
          Jugger
        </HeaderLogo>
        <div style={{ flex: 1, textAlign: 'left' }}>title</div>
        <IconContainer>
          <SearchSVG onClick={onSearchClick} />
          <DetailSVG onClick={onDetailClick} />
        </IconContainer>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
