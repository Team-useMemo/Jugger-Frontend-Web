import styled from '@emotion/styled';

const Home = () => {
  return (
    <Container>
      <Header>
        <Greeting>
          <Title>안녕하세요!</Title>
          <Subtitle>나는 당신을 도와줄 냉꼼이에요!</Subtitle>
          <Tip>
            냉장고만 잘 챙겨도, <br />
            탄소가 쑥쑥 줄어들어요! 💚🌱
          </Tip>
        </Greeting>
        <Mascot />
      </Header>
      <HighlightBox>
        <span>📗 오늘의 탄소배출습관 추천</span>
        <p>먹다 남긴 반찬, 다음 날 안 먹으면 그대로 폐기</p>
      </HighlightBox>
      <SectionTitle>나만의 냉장고</SectionTitle>
      <SearchBar placeholder="냉장고에 저장된 식품을 검색해보세요" />
      <CategoryTabs>
        <Tab active>전체</Tab>
        <Tab>실외</Tab>
        <Tab>냉장</Tab>
        <Tab>냉동</Tab>
        <GreenTip>소비기한임박</GreenTip>
      </CategoryTabs>
      <ItemGrid>
        <ItemCard>
          <ItemName>대파</ItemName>
          <Date>소비기한: 2025-00-00</Date>
          <Left>남은 갯수: 8</Left>
          <DDay>D-3</DDay>
        </ItemCard>
        <ItemCard>
          <ItemName>양파</ItemName>
          <Date>소비기한: 2025-00-00</Date>
          <Left>남은 갯수: 8</Left>
          <DDay>D-4</DDay>
        </ItemCard>
      </ItemGrid>
      <NavBar>
        <AddButton>＋</AddButton>
        <NavTab active>냉장고</NavTab>
        <NavTab>김한슐</NavTab>
      </NavBar>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(180deg, #bff7a2, #6cc153);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Greeting = styled.div`
  color: white;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 4px 0;
`;

const Tip = styled.p`
  font-size: 14px;
`;

const Mascot = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: lightgray;
`;

const HighlightBox = styled.div`
  background: white;
  padding: 12px;
  border-radius: 10px;
  margin: 16px 0;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 16px;
  margin-bottom: 8px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  margin-bottom: 16px;
`;

const CategoryTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Tab = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#fff' : '#ffffff99')};
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const GreenTip = styled.span`
  color: white;
  font-size: 12px;
  margin-left: auto;
`;

const ItemGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const ItemCard = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  width: 45%;
`;

const ItemName = styled.div`
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 12px;
`;

const Left = styled.div`
  font-size: 12px;
`;

const DDay = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: green;
`;

const NavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid #ccc;
`;

const AddButton = styled.button`
  background: #6cc153;
  color: white;
  font-size: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
`;

const NavTab = styled.div<{ active?: boolean }>`
  font-size: 14px;
  color: ${({ active }) => (active ? '#000' : '#888')};
`;
