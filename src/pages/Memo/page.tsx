import { categoryApi, useGetCategoriesQuery } from '@stores/modules/category';
import { useGetCalendarQuery, useGetMemosQuery, useGetPhotosQuery, usePostMemoMutation } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { setStorageItem } from '@utils/LocalStorage';
import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import MemoComponent from '@components/Memo/Memo';
import AddImageMemo from '@components/Modal/AddImageMemo/AddImageMemo';
import AddScheduleMemo from '@components/Modal/AddScheduleMemo/AddScheduleMemo';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import MemoCollection from '@components/Modal/MemoCollection/MemoCollection';
import MemoDetailImage from '@components/Modal/MemoDetail/Image/MemoDetailImage';
import MemoDetailSchedule from '@components/Modal/MemoDetail/Schedule/MemoDetailSchedule';
import MemoDetailText from '@components/Modal/MemoDetail/Text/MemoDetailText';
import SearchMemo from '@components/Modal/SearchMemo/SearchMemo';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import {
  MemoItemContainer,
  MemoItemDateContainer,
  MemoItemDateContents,
  MemoListContainer,
  MemoPageBottomButtonContainer,
  MemoPageBottomButtonLabel,
  MemoPageBottomContainer,
  MemoPageBottomInputContainer,
  MemoPageContainer,
} from './MemoPage.Style';

const MemoList = React.memo(({ currentCategory }: { currentCategory: string }) => {
  const memoListContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: textMemos = [] } = useGetMemosQuery(
    {
      page: page,
      //  size: 20
      size: 200,
    },
    {
      skip: false,
      selectFromResult: ({ data }) => ({
        data: currentCategory ? data?.filter((memo) => memo.categoryId === currentCategory) : data,
      }),
    },
  );

  const { data: scheduleMemos = [] } = useGetCalendarQuery(
    { start: '2025-01-01T11:24:37.506Z', end: '2025-12-31T11:24:37.506Z' },
    {
      selectFromResult: ({ data }) => ({
        data: currentCategory ? data?.filter((memo) => memo.categoryId === currentCategory) : data,
      }),
    },
  );

  const { data: imageMemos = [] } = useGetPhotosQuery(
    { category_uuid: currentCategory },
    {
      selectFromResult: ({ data }) => ({
        data: data?.map((e) => ({ ...e, categoryId: currentCategory })),
      }),
    },
  );

  const memos = [...textMemos, ...scheduleMemos, ...imageMemos].sort((a, b) => b.date.getTime() - a.date.getTime());

  useEffect(() => {
    memoListContainerRef.current?.scrollTo({ top: 0 });
  }, [memos]);

  return (
    <MemoListContainer ref={memoListContainerRef}>
      <div
        onClick={() => {
          console.log(page);
          setPage((prev) => prev + 1);
        }}
      >
        asd
      </div>
      {memos.map((memo, i, arr) => {
        return (
          <MemoItemContainer key={`memo-${memo.memoId}-${i}`} id={`memo-${memo.memoId}`}>
            {(i == arr.length - 1 ||
              (i + 1 < arr.length && arr[i + 1].date.toDateString() != memo.date.toDateString())) && (
              <MemoItemDateContainer>
                <MemoItemDateContents>{formatDate(memo.date, '{YYYY}년 {MM}월 {DD}일 {W}요일')}</MemoItemDateContents>
              </MemoItemDateContainer>
            )}
            <MemoComponent memo={memo} category={categories.find(({ categoryId }) => categoryId == memo.categoryId)} />
          </MemoItemContainer>
        );
      })}
    </MemoListContainer>
  );
});

const MemoPageBottom = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const [newMemo, setNewMemo] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [postMemo] = usePostMemoMutation();

  const changeTextAreaSize = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMemo(e.target.value);
    changeTextAreaSize();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey || isMobile) {
        return;
      }
      e.preventDefault();
      handleClickSend();
    }
  };

  const handleClickSend = () => {
    if (!newMemo.trim()) return;

    (async () => {
      try {
        await postMemo({
          categoryUuid: currentCategory || '',
          text: newMemo,
        }).unwrap();
        dispatch(categoryApi.util.invalidateTags([{ type: 'Category', id: 'LIST' }]));
      } catch (error) {
        console.error('메모 전송 실패:', error);
      }

      if (textareaRef.current) {
        textareaRef.current.value = '';
      }
      setNewMemo('');
      changeTextAreaSize();
    })();
  };

  const handlePasteClipboardImage = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;

    [...items].some((e) => {
      if (e.type.indexOf('image') === -1) return false;

      const blob = e.getAsFile();
      const reader = new FileReader();

      reader.onload = () => {
        dispatch(
          setModalOpen({
            name: ModalName.addImageMemo,
            value: { image: reader.result as string },
          }),
        );
      };

      if (blob) {
        reader.readAsDataURL(blob);
      }

      return true;
    });
  };

  const openAddImageMemoModal = () => {
    if (isMobile) return;
    dispatch(setModalOpen({ name: ModalName.addImageMemo }));
  };

  const openAddScheduleMemoModal = () => {
    dispatch(setModalOpen({ name: ModalName.addScheduleMemo }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(
        setModalOpen({
          name: ModalName.addImageMemo,
          value: { image: reader.result as string },
        }),
      );
    };
  };

  return (
    <MemoPageBottomContainer>
      <MemoPageBottomButtonContainer>
        <MemoPageBottomButtonLabel>
          <PaperClipSVG onClick={openAddImageMemoModal} />
          {isMobile && <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChangeFile} />}
        </MemoPageBottomButtonLabel>
        <CalendarSVG onClick={openAddScheduleMemoModal} />
      </MemoPageBottomButtonContainer>
      <MemoPageBottomInputContainer>
        <textarea
          ref={textareaRef}
          placeholder="메시지를 입력하세요"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onPaste={handlePasteClipboardImage}
          value={newMemo}
        />
        <SendSVG onClick={handleClickSend} />
      </MemoPageBottomInputContainer>
    </MemoPageBottomContainer>
  );
};

const MemoPage = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const [SearchMemoModal] = useParamModal(ModalName.searchMemo, ModalLayoutGray, SearchMemo);
  const [MemoCollectionModal] = useParamModal(ModalName.memoCollection, ModalLayoutGray, MemoCollection);
  const [AddImageMemoModal] = useParamModal(ModalName.addImageMemo, ModalLayoutGray, AddImageMemo);
  const [AddScheduleMemoModal] = useParamModal(ModalName.addScheduleMemo, ModalLayoutGray, AddScheduleMemo);
  const [EditScheduleMemoModal] = useParamModal(ModalName.editScheduleMemo, ModalLayoutGray, AddScheduleMemo);
  const [DetailTextMemoModal] = useParamModal(ModalName.detailTextMemo, ModalLayoutGray, MemoDetailText);
  const [DetailImageMemoModal] = useParamModal(ModalName.detailImageMemo, ModalLayoutGray, MemoDetailImage);
  const [DetailScheduleMemoModal] = useParamModal(ModalName.detailScheduleMemo, ModalLayoutGray, MemoDetailSchedule);

  useEffect(() => {
    console.log(
      setStorageItem('tmp', {
        tmp: {
          content: {
            date: new Date(),
            title: 1233,
          },
        },
      }),
    );
  }, []);

  return (
    <MemoPageContainer>
      <SearchMemoModal />
      <MemoCollectionModal />
      <AddScheduleMemoModal />
      <EditScheduleMemoModal />
      <AddImageMemoModal />
      <DetailTextMemoModal />
      <DetailImageMemoModal />
      <DetailScheduleMemoModal />
      <MemoList currentCategory={currentCategory || ''} />
      <MemoPageBottom />
    </MemoPageContainer>
  );
};

export default MemoPage;
