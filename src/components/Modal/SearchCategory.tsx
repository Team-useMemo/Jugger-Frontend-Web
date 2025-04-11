import { MemoModalContainer } from './Modal.Style';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks/useRedux';
import SearchSVG from '@assets/Header/search.svg?react';

const SearchCategory = () => {
  const categories = useAppSelector((state) => state.categorySlice.value);
  return (
    <MemoModalContainer>
      <Wrapper>
        <InputWrapper>
          <IconWrapper>
            <SearchSVG />
          </IconWrapper>
          <SearchInput placeholder="검색어를 입력하세요" />
        </InputWrapper>

        <SectionTitle>카테고리 선택</SectionTitle>

        <TagGrid>
          {categories.map((cat) => (
            <CategoryTag key={cat.id} color={cat.color}>
              {cat.title}
            </CategoryTag>
          ))}
        </TagGrid>
      </Wrapper>
    </MemoModalContainer>
  );
};

export default SearchCategory;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 24px 24px',
});

const InputWrapper = styled.div({
  position: 'relative',
  width: '90%',
});

const IconWrapper = styled.div({
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
});

const SearchInput = styled.input({
  width: '100%',
  padding: '12px 16px 12px 40px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  outline: 'none',
  fontSize: '15px',
  transition: 'border 0.2s',

  backgroundColor: '#F7F7F8',
  '&:focus': {
    borderColor: '#0054D1',
  },
});

const SectionTitle = styled.div({
  fontSize: '15px',
  fontWeight: 600,
  marginBottom: '4px',
  textAlign: 'left',
});

const TagGrid = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const CategoryTag = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 14px',
  fontSize: '15px',
  fontWeight: 500,
  backgroundColor: `${color}1A`,
  borderRadius: '999px',
  cursor: 'pointer',
  color: '#2D2D2D',
  userSelect: 'none',
  gap: '8px',
  lineHeight: '1.2',
  whiteSpace: 'nowrap',

  '&::before': {
    content: "''",
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
  },
}));
