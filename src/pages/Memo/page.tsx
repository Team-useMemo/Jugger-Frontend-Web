import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useModal from '@hooks/useModal';
import MemoComponent from '@components/Memo/Memo';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { addMemos, loadMemos } from '@stores/modules/memo';
import { useParams, useSearchParams } from 'react-router-dom';
import isUrl from '@utils/isUrl';
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
import { postCalendar, postMemo, postPhoto } from '@controllers/api';

import { shallowEqual } from 'react-redux';

const MemoList = ({ category }: { category: string | null }) => {
  const memoListContainerRef = useRef<HTMLDivElement>(null);

  const categories = useAppSelector((state) => state.categorySlice.value);

  const memos = useAppSelector(
    (state) =>
      state.memoSlice.value.filter((e) => {
        if (!category) return true;
        return category === e.categoryId;
      }),
    shallowEqual,
  );
  useEffect(() => {
    memoListContainerRef.current?.scrollTo({ top: 0 });
  }, [memos]);

  return (
    <MemoListContainer ref={memoListContainerRef}>
      {[...memos].reverse().map((e, i, arr) => {
        return (
          <MemoItemContainer key={e.id}>
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
            <MemoComponent memo={e} category={categories.find(({ id }) => id == e.categoryId)} />
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
  const dispatch = useAppDispatch();

  const [newMemo, setNewMemo] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

    dispatch(
      addMemos({
        type: isUrl(newMemo) ? 'link' : 'text',
        content: newMemo,
        categoryId: category,
      }),
    );

    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setNewMemo('');
    postMemo('username', newMemo, category || '');
    changeTextAreaSize();
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
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');

  const addSchedule = (title: string, startDate: Date, endDate: Date) => {
    dispatch(
      addMemos({
        type: 'schedule',
        content: {
          title,
          startDate,
          endDate,
        },
        categoryId: currentCategory,
      }),
    );
    postCalendar('username', title, currentCategory || '', startDate.toISOString(), endDate.toISOString());
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
    const file = dataURLtoFile(image, 'image.png'); // base64 string → Fil
    dispatch(
      addMemos({
        type: 'photo',
        content: image,
        categoryId: currentCategory,
      }),
    );
    postPhoto('username', file, currentCategory || '');
  };

  const [MemoAddScheduleModal, openMemoAddScheduleModal] = useModal('addSchedule', FullScreenGray, MemoAddSchedule, [
    addSchedule,
  ]);
  const [MemoAddImageModal, openMemoAddImageModal] = useModal('addImage', FullScreenGray, MemoAddImage, [addImage]);

  useEffect(() => {
    if (!username) return;
    dispatch(loadMemos(username));
  }, [dispatch, username]);

  // if (!memos) return <div>Loading</div>;

  return (
    <MemoPageContainer>
      <MemoAddScheduleModal />
      <MemoAddImageModal />
      <MemoList category={currentCategory} />
      <MemoBottom
        category={currentCategory}
        openAddPhotoModal={openMemoAddImageModal}
        openAddScheduleModal={openMemoAddScheduleModal}
      />
    </MemoPageContainer>
  );
};

export default MemoPage;
