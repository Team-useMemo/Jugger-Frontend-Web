import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useModal from '@hooks/useModal';
import MemoComponent from '@components/Memo/Memo';
import formatDate from '@utils/Date';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { addMemos, loadMemos } from '@stores/modules/memo';
import { useParams, useSearchParams } from 'react-router-dom';
import ScheduleModal from '@components/Modal/ScheduleModal';
import AddImageModal from '@components/Modal/AddImageModal';
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

const MemoList = ({ category }: { category: string | null }) => {
  const categories = useAppSelector((state) => state.categorySlice.value);

  const memos = useAppSelector((state) => state.memoSlice.value).filter((e) => {
    if (!category) return true;
    if (category == e.category) return true;
    return false;
  });

  return (
    <MemoListContainer>
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
            <MemoComponent memo={e} category={categories.find(({ id }) => id == e.category)} />
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
        category: category,
      }),
    );

    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setNewMemo('');

    changeTextAreaSize();
  };

  return (
    <MemoBottomContainer>
      <MemoBottomButtonContainer>
        <PaperClipSVG onClick={openAddPhotoModal} />
        <CalendarSVG onClick={openAddScheduleModal} />
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

  const addSchedule = (title: string, startDate: Date, endDate: Date | null) => {
    dispatch(
      addMemos({
        type: 'schedule',
        content: {
          title,
          startDate,
          endDate,
        },
        category: currentCategory,
      }),
    );
  };

  const addPhoto = (image: string) => {
    dispatch(
      addMemos({
        type: 'photo',
        content: image,
        category: currentCategory,
      }),
    );
  };

  const [AddScheduleModal, openAddScheduleModal] = useModal(ScheduleModal, [addSchedule], { add: true });
  const [AddPhotoModal, openAddPhotoModal] = useModal(AddImageModal, [addPhoto]);

  useEffect(() => {
    dispatch(loadMemos(username));
  }, []);

  // if (!memos) return <div>Loading</div>;

  return (
    <MemoPageContainer>
      <AddScheduleModal />
      <AddPhotoModal />
      <MemoList category={currentCategory} />
      <MemoBottom
        category={currentCategory}
        openAddPhotoModal={openAddPhotoModal}
        openAddScheduleModal={openAddScheduleModal}
      />
    </MemoPageContainer>
  );
};

export default MemoPage;
