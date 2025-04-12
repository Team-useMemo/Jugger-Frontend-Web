import { MemoModalContainer } from './Modal.Style';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks/useRedux';
import SearchSVG from '@assets/Header/search.svg?react';
import { useState } from 'react';
import TextSVG from '@assets/Search/Text.svg?react';
import ScheduleSVG from '@assets/Search/Schedule.svg?react';
import PhotoSVG from '@assets/Search/Photo.svg?react';
import LinkSVG from '@assets/Search/Link.svg?react';
import { media } from '@styles/theme';

const getSearchableText = (memo: any): string => {
  if (memo.type === 'text') return memo.content;
  if (memo.type === 'schedule') return memo.content.title;
  if (memo.type === 'photo') return memo.content;
  if (memo.type === 'link') return memo.content;

  return '';
};

const highlightText = (text: string, keyword: string) => {
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? <Highlight key={i}>{part}</Highlight> : part,
  );
};

const SearchResultItem = ({ memo, categories, searchQuery }: { memo: any; categories: any[]; searchQuery: string }) => {
  const category = categories.find((cat) => cat.id === memo.categoryId);
  return (
    <ResultItem key={memo.id}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ResultIconWrapper>
          {memo.type === 'text' && <TextSVG />}
          {memo.type === 'schedule' && <ScheduleSVG />}
          {memo.type === 'photo' && <PhotoSVG />}
          {memo.type === 'link' && <LinkSVG />}
        </ResultIconWrapper>
        <ResultText>{highlightText(getSearchableText(memo), searchQuery)}</ResultText>
      </div>
      {category && (
        <Legend>
          <LegendDot color={category.color} />
          {category.title}
        </Legend>
      )}
    </ResultItem>
  );
};

const SearchCategory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const categories = useAppSelector((state) => state.categorySlice.value);
  const memos = useAppSelector((state) => state.memoSlice.value);

  const filteredMemos = memos.filter((memo) => {
    const matchesQuery = getSearchableText(memo).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryId === null || memo.categoryId === selectedCategoryId;
    return matchesQuery && matchesCategory;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <MemoModalContainer>
      <Wrapper>
        <InputWrapper>
          <SearchInputWrapper>
            {selectedCategoryId && (
              <SelectedCategoryTag color={categories.find((cat) => cat.id === selectedCategoryId)?.color || '#ccc'}>
                {categories.find((cat) => cat.id === selectedCategoryId)?.title}
              </SelectedCategoryTag>
            )}
            <SearchInput
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconWrapper>
              <SearchSVG />
            </IconWrapper>
          </SearchInputWrapper>
        </InputWrapper>

        <SectionTitle>카테고리 선택</SectionTitle>

        <TagGrid>
          {categories.map((cat) => (
            <CategoryTag key={cat.id} color={cat.color} onClick={() => handleCategoryClick(cat.id)}>
              {cat.title}
            </CategoryTag>
          ))}
        </TagGrid>

        {searchQuery && (
          <ResultLayout>
            <ResultList>
              {filteredMemos.map((memo) => (
                <SearchResultItem key={memo.id} memo={memo} categories={categories} searchQuery={searchQuery} />
              ))}
            </ResultList>
          </ResultLayout>
        )}
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
  width: '100%',
});

const IconWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  pointerEvents: 'none',
});

const SearchInputWrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  backgroundColor: '#F7F7F8',
  borderRadius: '8px',
  border: '1px solid #ccc',
  padding: '8px 12px',
  gap: '8px',
  width: 'auto',
  '&:focus-within': {
    borderColor: '#0054D1',
  },
});

const SearchInput = styled.input({
  flex: 1,
  padding: '12px 0',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '15px',
  transition: 'border 0.2s',
  backgroundColor: 'transparent',
  minWidth: 0,
});

const SelectedCategoryTag = styled.div<{ color: string }>(({ color }) => ({
  padding: '4px 8px',
  backgroundColor: `${color}1A`,
  borderRadius: '999px',
  fontSize: '13px',
  fontWeight: 500,
  color: '#2D2D2D',
  minWidth: 0,
  maxWidth: '160px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  '&::before': {
    content: "''",
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: color,
  },
}));

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
  border: '1px solid transparent',

  '&::before': {
    content: "''",
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
  },
}));

const ResultLayout = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '32px',
  marginTop: '20px',
  paddingBottom: '8px',
  borderTop: '1px solid #E0E0E0',
  paddingTop: '16px',
});

const ResultList = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  flex: 1,
});

const ResultItem = styled.li({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
  color: '#222',
  lineHeight: 1.4,
  gap: '6px',
});

const ResultIconWrapper = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  marginRight: '4px',
});

const ResultText = styled.span({
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '300px',

  [media[0]]: {
    maxWidth: '100px',
  },
});

const Highlight = styled.span({
  color: '#0054D1',
  fontWeight: 500,
});

const Legend = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#333',
});

const LegendDot = styled.div<{ color: string }>(({ color }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
}));
