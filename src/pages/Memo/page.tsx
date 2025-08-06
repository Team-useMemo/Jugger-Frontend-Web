import { ChatLoaderProvider, useChatContext } from '@providers/ChatContext';
import { categoryApi, useGetCategoriesQuery } from '@stores/modules/category';
import { usePostMemoMutation } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import useMenu from '@hooks/useMenu';
import useParamModal from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import MemoComponent from '@components/Memo/Memo';
import MemoBottomButtonMenu from '@components/Menu/MemoBottomButtonMenu';
import EditMemoCategory from '@components/Modal/EditMemoCategory/EditMemoCategory';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import MemoCollection from '@components/Modal/MemoCollection/MemoCollection';
import MemoDetailImageExpand from '@components/Modal/MemoDetail/Image/Expand/MemoDetailImageExpand';
import MemoDetailImage from '@components/Modal/MemoDetail/Image/MemoDetailImage';
import MemoDetailSchedule from '@components/Modal/MemoDetail/Schedule/MemoDetailSchedule';
import MemoDetailText from '@components/Modal/MemoDetail/Text/MemoDetailText';
import AddImageMemo from '@components/Modal/MemoEditor/Image/AddImageMemo';
import AddScheduleMemo from '@components/Modal/MemoEditor/Schedule/MemoEditorSchedule';
import SearchMemo from '@components/Modal/SearchMemo/SearchMemo';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import PlusSVG from '@assets/icons/plus.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import {
  MemoItemContainer,
  MemoItemDateContainer,
  MemoItemDateContents,
  MemoListContainer,
  MemoPageBottomButtonContainer,
  MemoPageBottomContainer,
  MemoPageBottomContents,
  MemoPageBottomInputContainer,
  MemoPageContainer,
} from './MemoPage.Style';

const MemoList = React.memo(() => {
  const memoListContainerRef = useRef<HTMLDivElement>(null);

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: memos = [], fetchBefore } = useChatContext();
  const [recentMemoDate, setRecentMemoDate] = useState<Date>();
  // console.log(memos);

  useEffect(() => {
    loadBeforeMemos();
    if (recentMemoDate && memos?.[0]?.date.getTime() !== recentMemoDate.getTime()) {
      memoListContainerRef.current?.scrollTo({ top: 0 });
    }
    setRecentMemoDate(memos?.[0]?.date);
  }, [memos]);

  const loadBeforeMemos = () => {
    const el = memoListContainerRef.current;
    if (!el) return;

    if (el.scrollHeight + el.scrollTop === el.offsetHeight) {
      fetchBefore();
    }
  };

  return (
    <MemoListContainer ref={memoListContainerRef} onScroll={loadBeforeMemos}>
      {memos.map((memo, i, arr) => {
        return (
          <MemoItemContainer key={`memo-${memo.chatId}-${memo.updatedAt.getTime()}`} id={`memo-${memo.chatId}`}>
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
  const { fetchAfter } = useChatContext();

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
          categoryUuid: currentCategory || undefined,
          text: newMemo,
        }).unwrap();
        dispatch(categoryApi.util.invalidateTags([{ type: 'Category', id: 'LIST' }]));
        fetchAfter();
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

    Array.from(items).some((e) => {
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
    dispatch(setModalOpen({ name: ModalName.addImageMemo }));
  };

  const openAddScheduleMemoModal = () => {
    dispatch(setModalOpen({ name: ModalName.addScheduleMemo }));
  };

  const [BottomButtonMenu, openBottomButtonMenu] = useMenu(MemoBottomButtonMenu);

  return (
    <MemoPageBottomContainer>
      <MemoPageBottomContents>
        <BottomButtonMenu />
        <MemoPageBottomButtonContainer>
          {!isMobile ? (
            <>
              <PaperClipSVG onClick={openAddImageMemoModal} />
              <CalendarSVG onClick={openAddScheduleMemoModal} />
            </>
          ) : (
            <PlusSVG onClick={openBottomButtonMenu} />
          )}
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
      </MemoPageBottomContents>
    </MemoPageBottomContainer>
  );
};

const MemoPage = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') ?? undefined;

  const [SearchMemoModal] = useParamModal(ModalName.searchMemo, ModalLayoutGray, SearchMemo);
  const [MemoCollectionModal] = useParamModal(ModalName.memoCollection, ModalLayoutGray, MemoCollection);
  const [AddImageMemoModal] = useParamModal(ModalName.addImageMemo, ModalLayoutGray, AddImageMemo);
  const [AddScheduleMemoModal] = useParamModal(ModalName.addScheduleMemo, ModalLayoutGray, AddScheduleMemo);
  const [EditScheduleMemoModal] = useParamModal(ModalName.editScheduleMemo, ModalLayoutGray, AddScheduleMemo);
  const [DetailTextMemoModal] = useParamModal(ModalName.detailTextMemo, ModalLayoutGray, MemoDetailText);
  const [DetailImageMemoModal] = useParamModal(ModalName.detailImageMemo, ModalLayoutGray, MemoDetailImage);
  const [DetailImageMemoExpandModal] = useParamModal(
    ModalName.detailImageMemoExpand,
    ModalLayoutGray,
    MemoDetailImageExpand,
  );
  const [DetailScheduleMemoModal] = useParamModal(ModalName.detailScheduleMemo, ModalLayoutGray, MemoDetailSchedule);
  const [EditMemoCategoryModal] = useParamModal(ModalName.editMemoCategory, ModalLayoutGray, EditMemoCategory);

  return (
    <MemoPageContainer>
      <ChatLoaderProvider categoryId={currentCategory}>
        <MemoCollectionModal />
        <SearchMemoModal />
        <AddScheduleMemoModal />
        <EditScheduleMemoModal />
        <AddImageMemoModal />
        <DetailTextMemoModal />
        <DetailImageMemoModal />
        <DetailImageMemoExpandModal />
        <DetailScheduleMemoModal />
        <MemoList />
        <MemoPageBottom />
        <EditMemoCategoryModal />
      </ChatLoaderProvider>
    </MemoPageContainer>
  );
};

export default MemoPage;
