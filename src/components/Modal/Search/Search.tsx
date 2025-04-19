import { MemoModalContainer } from '../Modal.Style';
import { useAppSelector } from '@hooks/useRedux';
import SearchSVG from '@assets/Header/search.svg?react';
import { useState } from 'react';
import TextSVG from '@assets/Search/Text.svg?react';
import ScheduleSVG from '@assets/Search/Schedule.svg?react';
import PhotoSVG from '@assets/Search/Photo.svg?react';
import LinkSVG from '@assets/Search/Link.svg?react';
import {
  ResultItem,
  ResultIconWrapper,
  ResultText,
  LegendDot,
  Wrapper,
  InputWrapper,
  SearchInputWrapper,
  SelectedCategoryTag,
  SearchInput,
  IconWrapper,
  SectionTitle,
  TagGrid,
  CategoryTag,
  ResultLayout,
  ResultList,
  Highlight,
  Legend,
} from './Search.Style';
import { useNavigate } from 'react-router-dom';

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

const SearchResultItem = ({
  memo,
  categories,
  searchQuery,
  closeModal,
}: {
  memo: any;
  categories: any[];
  searchQuery: string;
  closeModal: () => void;
}) => {
  const category = categories.find((cat) => cat.id === memo.categoryId);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`?category=${memo.categoryId}`);
    closeModal();
  };
  return (
    <ResultItem key={memo.id} onClick={handleClick}>
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

const Search = ({ closeModal }: { closeModal: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const categories = useAppSelector((state) => state.categorySlice.value);
  const memos = useAppSelector((state) => state.memoSlice.value);

  const filteredMemos = memos.filter((memo) => {
    if (getSearchableText(memo) === null) return false; // 추후 null 처리 삭제
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
                <SearchResultItem
                  key={memo.id}
                  memo={memo}
                  categories={categories}
                  searchQuery={searchQuery}
                  closeModal={closeModal}
                />
              ))}
            </ResultList>
          </ResultLayout>
        )}
      </Wrapper>
    </MemoModalContainer>
  );
};

export default Search;
