// import { useParams } from 'react-router-dom';
import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import MemoComponent from '@components/Memo/Memo';
import formatDate from '@utils/Date';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { addMemos, loadMemos } from '@stores/modules/memo';
import { useParams, useSearchParams } from 'react-router-dom';
import ScheduleModal from '@components/Modal/ScheduleModal';
import AddImageModal from '@components/Modal/AddImageModal';

const isUrl = (text: string): boolean => {
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
  return pattern.test(text);
};

const MemoListContainer = styled.div({
  gap: '16px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '24px 0',
  overflowY: 'scroll',
  width: '100%',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

const MemoDateDivideContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  boxSizing: 'border-box',
  width: '100%',
});

const MemoDateDivideContents = styled.div({
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'content-box',
  display: 'flex',
  alignItems: 'center',

  ['p']: {
    margin: '0 12px',
    color: '#C2C4C8',
    fontSize: '14px',
    fontWeight: '500',
  },
});

const MemoDateDivideLine = styled.span({
  borderBottom: '1px solid #E0E0E2',
  margin: '0',
  height: '0',
  flexGrow: '1',
});
const MemoDateDivideLineTip = styled.span({
  borderBottom: '1px solid #E0E0E2',
  margin: '0',
  height: '0',
  minWidth: '20px',
  flexGrow: '1',
});

const MemoItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
});

const MemoPage = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const categories = useAppSelector((state) => state.categorySlice.value);
  const memos = useAppSelector((state) => state.memoSlice.value).filter((e) => {
    const category = searchParams.get('category');
    if (!category) return true;
    if (category == e.category) return true;
    return false;
  });
  const [newMemo, setNewMemo] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dispatch = useAppDispatch();

  const addSchedule = (title: string, startDate: Date, endDate: Date | null) => {
    dispatch(
      addMemos({
        id: memos.length + 1,
        type: 'schedule',
        content: {
          title,
          startDate,
          endDate,
        },
        date: new Date(),
        category: null,
      }),
    );
  };

  const addPhoto = (image: string) => {
    dispatch(
      addMemos({
        id: memos.length + 1,
        type: 'photo',
        content: image,
        date: new Date(),
        category: null,
      }),
    );
  };

  const [AddScheduleModal, openAddScheduleModal] = useModal(ScheduleModal, [addSchedule], { add: true });
  const [AddPhotoModal, openAddPhotoModal] = useModal(AddImageModal, [addPhoto]);

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
    console.log(e.target.value);
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
        id: memos.length + 1,
        type: isUrl(newMemo) ? 'link' : 'text',
        content: newMemo,
        date: new Date(),
        category: null,
      }),
    );

    setNewMemo('');
    setTimeout(() => {
      changeTextAreaSize();
    }, 1);
  };

  useEffect(() => {
    dispatch(loadMemos(username));
  }, []);

  if (!memos) return <div>Loading</div>;

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <AddScheduleModal />
      <AddPhotoModal />
      <MemoListContainer>
        {[...memos].reverse().map((e, i, arr) => {
          return (
            <MemoItemContainer key={e.id}>
              {i + 1 < arr.length && arr[i + 1].date.toDateString() != e.date.toDateString() && (
                <MemoDateDivideContainer>
                  <MemoDateDivideLineTip />
                  <MemoDateDivideContents>
                    <p>{formatDate(e.date, '{YYYY}년 {MM}월 {DD}일 {W}요일')}</p>
                    {/* <p>{formatDateToString(e.date)}</p> */}
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
    </div>
  );
};

const MemoBottomContainer = styled.div({
  maxWidth: '1080px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px 24px',
  gap: '12px',
});

const MemoBottomButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',

  ['svg']: {
    cursor: 'pointer',
  },
});

const MemoBottomInputContainer = styled.div({
  background: '#F7F7F8',
  width: '100%',
  display: 'flex',
  borderRadius: '12px',
  padding: '10px 20px',
  alignItems: 'center',

  ['textarea']: {
    fontSize: '15px',
    height: '22px',
    padding: '0',
    lineHeight: '1.47',
    margin: '0',
    flexGrow: '1',
    textAlign: 'left',
    border: 'none',
    outline: 'none',
    background: 'none',
    resize: 'none',
    color: '#171719',
    maxHeight: '160px',

    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  },

  ['svg']: {
    cursor: 'pointer',
  },
});

export default MemoPage;
