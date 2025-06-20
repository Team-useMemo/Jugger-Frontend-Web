import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetMemosQuery } from '@stores/modules/memo';
import { setModalClose } from '@stores/modules/modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp, scheduleProp } from '@ts/Memo.Prop';
import { ModalName } from '@utils/Modal';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import LinkSVG from '@assets/Search/Link.svg?react';
import PhotoSVG from '@assets/Search/Photo.svg?react';
import ScheduleSVG from '@assets/Search/Schedule.svg?react';
import TextSVG from '@assets/Search/Text.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import { DefaultModalLayout } from '../DefaultModal.Style';
import {
  SearchMemoCategoryContainer,
  SearchMemoCategoryContents,
  SearchMemoCategoryItem,
  SearchMemoContainer,
  SearchMemoInputCategory,
  SearchMemoInputContainer,
  SearchMemoInputContents,
  SearchMemoResultContainer,
  SearchMemoResultItemCategory,
  SearchMemoResultItemContainer,
  SearchMemoResultItemContents,
} from './SearchMemo.Style';

const getMemoSearchText = (memo: MemoProp): string => {
  if (memo.type === 'schedule') return (memo.content as scheduleProp)?.title ?? '';
  return String(memo.content ?? '');
};

type MatchedSegment = {
  matched: boolean;
  text: string;
};

const isSubsequence = (source: string, target: string): boolean => {
  const targetChars = Array.from(target.toLowerCase());

  const matched = Array.from(source.toLowerCase()).reduce((i, char) => (char === targetChars[i] ? i + 1 : i), 0);

  return matched === targetChars.length;
};

const extractMatchedSegments = (source: string, keyword: string): MatchedSegment[] => {
  const keywordChars = Array.from(keyword.toLowerCase());

  return Array.from(source).reduce<{ segments: MatchedSegment[]; keywordIndex: number }>(
    ({ segments, keywordIndex }, char) => {
      const isMatched = char.toLowerCase() === keywordChars[keywordIndex];
      const updatedIndex = isMatched ? keywordIndex + 1 : keywordIndex;
      const last = segments[segments.length - 1];

      if (!last || last.matched !== isMatched) {
        segments.push({ matched: isMatched, text: char });
      } else {
        last.text += char;
      }

      return { segments, keywordIndex: updatedIndex };
    },
    { segments: [], keywordIndex: 0 },
  ).segments;
};

const SearchMemo = ({ closeModal, modalRef }: ModalComponentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryProp | null>(null);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: memos = [] } = useGetMemosQuery({
    page: 0,
    size: 20,
  });

  const filteredMemos = memos.filter((memo) => {
    const matchesQuery = isSubsequence(getMemoSearchText(memo), searchQuery);
    const matchesCategory = selectedCategory === null || memo.categoryId === selectedCategory?.categoryId;
    return matchesQuery && matchesCategory;
  });

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResetSearchQuery = () => {
    setSearchQuery('');
  };

  const handleChangeSelectedCategory = (category: CategoryProp) => {
    if (selectedCategory && selectedCategory.categoryId == category.categoryId) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(category);
  };

  const handleResetSelectedCategory = () => {
    setSelectedCategory(null);
  };

  const handleSearch = () => {};

  const isMobile = useIsMobile();

  return (
    <DefaultModalLayout>
      <SearchMemoContainer ref={modalRef}>
        <SearchMemoInputContainer>
          {isMobile && <LeftArrowSVG onClick={closeModal} />}
          <SearchMemoInputContents>
            {!selectedCategory && !(isMobile && searchQuery) && <SearchSVG />}
            {selectedCategory && (
              <SearchMemoInputCategory
                color={selectedCategory.categoryColor}
                onClick={isMobile ? handleResetSelectedCategory : () => {}}
              >
                <span />
                <p>{selectedCategory.categoryName}</p>
                <EndContainerSVG onClick={handleResetSelectedCategory} />
              </SearchMemoInputCategory>
            )}
            <input placeholder="검색어를 입력하세요" value={searchQuery} onChange={handleChangeSearchQuery} />
            {searchQuery && <EndContainerSVG onClick={handleResetSearchQuery} />}
            {isMobile && searchQuery && <SearchSVG onClick={handleSearch} />}
          </SearchMemoInputContents>
        </SearchMemoInputContainer>
        {(!isMobile || !searchQuery) && (
          <SearchMemoCategoryContainer>
            {!isMobile && '카테고리 선택'}
            <SearchMemoCategoryContents>
              {categories.map((e, i) => (
                <SearchMemoCategoryItem
                  key={`SEARCH_CATEGORY_${i}`}
                  color={e.categoryColor}
                  onClick={() => handleChangeSelectedCategory(e)}
                >
                  <span />
                  <p>{e.categoryName}</p>
                </SearchMemoCategoryItem>
              ))}
            </SearchMemoCategoryContents>
          </SearchMemoCategoryContainer>
        )}

        {!!(searchQuery && filteredMemos.length) && (
          <SearchMemoResultContainer>
            {filteredMemos.map((memo) => (
              <SearchMemoResult
                searchQuery={searchQuery}
                memo={memo}
                category={categories.find((category) => category.categoryId == memo.categoryId)}
              />
            ))}
          </SearchMemoResultContainer>
        )}
      </SearchMemoContainer>
    </DefaultModalLayout>
  );
};

const SearchMemoResult = ({
  searchQuery,
  memo,
  category,
}: {
  searchQuery: string;
  memo: MemoProp;
  category?: CategoryProp;
}) => {
  const searchedResult = getMemoSearchText(memo);
  const matchedResult = extractMatchedSegments(searchedResult, searchQuery);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickResultItem = () => {
    navigate(`?category=${memo.categoryId}`, { replace: false });
    dispatch(setModalClose({ name: ModalName.searchMemo }));

    setTimeout(() => {
      const memoElement = document.getElementById(`memo-${memo.memoId}`);
      if (memoElement) {
        memoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  return (
    <SearchMemoResultItemContainer onClick={handleClickResultItem}>
      <SearchMemoResultItemContents>
        {memo.type == 'text' && <TextSVG />}
        {memo.type == 'link' && <LinkSVG />}
        {memo.type == 'schedule' && <ScheduleSVG />}
        {memo.type == 'image' && <PhotoSVG />}
        <p>
          {matchedResult.map((e, i) => (e.matched ? <span key={`TMP_${memo.memoId}_${i}`}>{e.text}</span> : e.text))}
        </p>
      </SearchMemoResultItemContents>
      {category && (
        <SearchMemoResultItemCategory color={category.categoryColor}>
          <p>{category.categoryName}</p>
        </SearchMemoResultItemCategory>
      )}
    </SearchMemoResultItemContainer>
  );
};

export default SearchMemo;
