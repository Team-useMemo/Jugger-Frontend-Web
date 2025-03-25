// import { StyledHeader, HeaderContainer, IconContainer } from './Header.Style';
import SearchSVG from '@assets/Header/search.svg?react';
import DetailSVG from '@assets/Header/detail.svg?react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledHeader = styled.div({
  display: 'flex',
  padding: '28px 24px 20px',
  borderBottom: '1px solid #E0E0E2',
  justifyContent: 'space-between',
});

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
      <div
        style={{
          textAlign: 'left',
          color: '#000000',
          fontSize: '22px',
          fontWeight: '600',
          lineHeight: '1.32',
        }}
      >
        title
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <SearchSVG />
        <DetailSVG />
      </div>
    </StyledHeader>
    // <StyledHeader>
    //   <HeaderContainer>
    //     <div
    //       style={{
    //         textAlign: 'left',
    //         color: '#000000',
    //         fontSize: '22px',
    //         fontWeight: '600',
    //         lineHeight: '1.36',
    //       }}
    //     >
    //       title
    //     </div>
    //     <IconContainer>
    //       <SearchSVG onClick={onSearchClick} />
    //       <DetailSVG onClick={onDetailClick} />
    //     </IconContainer>
    //   </HeaderContainer>
    // </StyledHeader>
  );
};

export default Header;
