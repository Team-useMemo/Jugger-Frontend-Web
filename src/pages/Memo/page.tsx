import { useGetCategoriesQuery } from '@stores/modules/category';
import { useGetCalendarQuery, useGetMemosQuery, useGetPhotosQuery, usePostMemoMutation } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import MemoComponent from '@components/Memo/Memo';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import MemoCollection from '@components/Modal/MemoCollection/MemoCollection';
import AddImageMemo from '@components/Modal/MemoViewer/Image/AddImageMemo';
import DetailImageMemo from '@components/Modal/MemoViewer/Image/DetailImageMemo';
import AddScheduleMemo from '@components/Modal/MemoViewer/Schedule/AddScheduleMemo';
import DetailScheduleMemo from '@components/Modal/MemoViewer/Schedule/DetailScheduleMemo';
import DetailTextMemo from '@components/Modal/MemoViewer/Text/DetailTextMemo';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import {
  MemoBottomButtonContainer,
  MemoBottomContainer,
  MemoBottomInputContainer,
  MemoDateDivideContainer,
  MemoDateDivideContents,
  MemoDateDivideLine,
  MemoDateDivideLineTip,
  MemoItemContainer,
  MemoListContainer,
  MemoPageContainer,
} from './MemoPage.Style';

const MemoList = React.memo(({ currentCategory }: { currentCategory: string }) => {
  const memoListContainerRef = useRef<HTMLDivElement>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: textMemos = [] } = useGetMemosQuery(
    { page: 0, size: 20 },
    {
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
      {memos.map((e, i, arr) => {
        return (
          <MemoItemContainer key={`memo-${e.id}-${i}`} id={`memo-${e.id}`}>
            {i + 1 < arr.length && arr[i + 1].date.toDateString() != e.date.toDateString() && (
              <MemoDateDivideContainer>
                <MemoDateDivideLineTip />
                <MemoDateDivideContents>
                  <p>{formatDate(e.date, '{YYYY}년 {MM}월 {DD}일 {W}요일')}</p>
                  <MemoDateDivideLine />
                </MemoDateDivideContents>
                <MemoDateDivideLineTip />
              </MemoDateDivideContainer>
            )}
            <MemoComponent memo={e} category={categories.find(({ uuid }) => uuid == e.categoryId)} />
          </MemoItemContainer>
        );
      })}
    </MemoListContainer>
  );
});

const MemoBottom = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const [newMemo, setNewMemo] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

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
      if (e.shiftKey) {
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

  const openAddImageMemoModal = () => {
    dispatch(setModalOpen({ name: ModalName.addImageMemo }));
  };

  const openAddScheduleMemoModal = () => {
    dispatch(setModalOpen({ name: ModalName.addScheduleMemo }));
  };

  return (
    <MemoBottomContainer>
      <MemoBottomButtonContainer>
        <PaperClipSVG onClick={openAddImageMemoModal} />
        <CalendarSVG onClick={openAddScheduleMemoModal} />
      </MemoBottomButtonContainer>
      <MemoBottomInputContainer>
        <textarea
          ref={textareaRef}
          placeholder="메시지를 입력하세요"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={newMemo}
        />
        <SendSVG onClick={handleClickSend} />
      </MemoBottomInputContainer>
    </MemoBottomContainer>
  );
};

const MemoPage = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const [MemoCollectionModal] = useParamModal(ModalName.memoCollection, ModalLayoutGray, MemoCollection);
  const [AddImageMemoModal] = useParamModal(ModalName.addImageMemo, ModalLayoutGray, AddImageMemo);
  const [AddScheduleMemoModal] = useParamModal(ModalName.addScheduleMemo, ModalLayoutGray, AddScheduleMemo);
  const [DetailTextMemoModal] = useParamModal(ModalName.detailTextMemo, ModalLayoutGray, DetailTextMemo);
  const [DetailImageMemoModal] = useParamModal(ModalName.detailImageMemo, ModalLayoutGray, DetailImageMemo);
  const [DetailScheduleMemoModal] = useParamModal(ModalName.detailScheduleMemo, ModalLayoutGray, DetailScheduleMemo);

  return (
    <MemoPageContainer>
      <MemoCollectionModal />
      <AddScheduleMemoModal />
      <AddImageMemoModal />
      <DetailTextMemoModal />
      <DetailImageMemoModal />
      <DetailScheduleMemoModal />
      <MemoList currentCategory={currentCategory || ''} />
      <MemoBottom />
    </MemoPageContainer>
  );
};

export default MemoPage;
