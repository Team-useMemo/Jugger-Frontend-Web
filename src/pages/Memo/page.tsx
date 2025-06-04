import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useModal from '@hooks/useModal';
import MemoComponent from '@components/Memo/Memo';
import { useSearchParams } from 'react-router-dom';
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
import MemoAddSchedule from '@components/Modal/MemoViewer/Schedule/MemoAddSchedule';
import { formatDate } from '@utils/Date';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoAddImage from '@components/Modal/MemoViewer/Image/MemoAddImage';
import { usePostMemoMutation, useGetMemosQuery, usePostCalendarMutation, useUploadFileMutation } from '@stores/modules/memo';

import { useGetCategoriesQuery } from '@stores/modules/category';


const MemoList = ({ currentCategory }: { currentCategory: string }) => {
  const memoListContainerRef = useRef<HTMLDivElement>(null);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: memos = [] } = useGetMemosQuery({ page: 0, size: 20, });

  const filteredMemos = currentCategory ? memos.filter((memo) => memo.categoryId === currentCategory) : memos;

  useEffect(() => {
    memoListContainerRef.current?.scrollTo({ top: 0 });
  }, [memos]);

  return (
    <MemoListContainer ref={memoListContainerRef}>
      {[...filteredMemos].reverse().map((e, i, arr) => {
        return (
          <MemoItemContainer key={e.id} id={`memo-${e.id}`}>
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
};

const MemoBottom = ({
  category,
  openAddPhotoModal,
  openAddScheduleModal,
}: {
  category: string | null;
  openAddPhotoModal: any;
  openAddScheduleModal: any;
}) => {

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
          categoryUuid: category || '',
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

  return (
    <MemoBottomContainer>
      <MemoBottomButtonContainer>
        <PaperClipSVG onClick={() => openAddPhotoModal()} />
        <CalendarSVG onClick={() => openAddScheduleModal()} />
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

  const [postCalendar] = usePostCalendarMutation();
  const [postPhoto] = useUploadFileMutation();

  const addSchedule = async (title: string, startDate: Date, endDate: Date) => {
    try {
      await postCalendar({
        name: title,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        categoryId: currentCategory || '',
      }).unwrap();
    } catch (error) {
      console.error('일정 전송 실패:', error);
    }
  };

  const addImage = (image: string) => {
    const dataURLtoFile = (dataUrl: string, filename: string): File => {
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || '';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    };
    const file = dataURLtoFile(image, 'image.png');
    postPhoto({ file, category_uuid: currentCategory || '' });
  };

  const [MemoAddScheduleModal, openMemoAddScheduleModal] = useModal('addSchedule', FullScreenGray, MemoAddSchedule, [
    addSchedule,
  ]);
  const [MemoAddImageModal, openMemoAddImageModal] = useModal('addImage', FullScreenGray, MemoAddImage, [addImage]);

  return (
    <MemoPageContainer>
      <MemoAddScheduleModal />
      <MemoAddImageModal />
      <MemoList currentCategory={currentCategory || ''} />
      <MemoBottom
        category={currentCategory}
        openAddPhotoModal={openMemoAddImageModal}
        openAddScheduleModal={openMemoAddScheduleModal}
      />
    </MemoPageContainer>
  );
};

export default MemoPage;
