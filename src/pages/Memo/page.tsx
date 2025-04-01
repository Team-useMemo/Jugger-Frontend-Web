// import { useParams } from 'react-router-dom';
import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';
import useModal from '@hooks/useModal';
import MemoComponent from '@components/Memo/Memo';
import formatDate from '@utils/Date';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { addMemos, loadMemos } from '@stores/modules/memo';
import { useParams, useSearchParams } from 'react-router-dom';

const isUrl = (text: string): boolean => {
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
  return pattern.test(text);
};

const AddScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  background: 'white',
  borderRadius: '16px',
  padding: '32px 32px 40px',

  [':focus']: {
    outline: 'none',
  },
});

const AddScheduleContent = styled.div({
  gap: '36px',
  width: '384px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

const AddScheduleTitle = styled.p({
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.36',
  margin: '0',
});

const AddScheduleButton = styled.p({
  width: '100%',
  background: '#0054D1',
  fontSize: '18px',
  color: 'white',
  fontWeight: '500',
  lineHeight: '1.45',
  borderRadius: '6px',
  padding: '12px',
  boxSizing: 'border-box',
  margin: '0',
});

const AddScheduleItemList = styled.div({
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const AddScheduleItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  textAlign: 'left',

  ['>div']: {
    boxSizing: 'border-box',
    background: '#F7F7F8',
    padding: '11px 14px',
    width: '100%',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',

    ['>p,>input']: {
      background: 'none',
      outline: 'none',
      border: 'none',
      margin: '0',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '1.5',
      width: '100%',
      color: '#171719',
    },
  },
});

const AddScheduleComponent = ({
  closeModal,
  actions,
}: {
  closeModal: () => void;
  actions: ((...args: any[]) => void)[];
}) => {
  const [title, setTitle] = useState('');

  const startDate = new Date();
  startDate.setMinutes(0);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);

  return (
    <AddScheduleContainer>
      <CloseSVG onClick={closeModal} />
      <AddScheduleContent>
        <AddScheduleTitle>일정 추가</AddScheduleTitle>
        <AddScheduleItemList>
          <AddScheduleItem>
            <p style={{ margin: '0', fontSize: '16px', fontWeight: '600', lineHeight: '1.5' }}>일정 제목</p>
            <div>
              <input
                type="text"
                placeholder="입력"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {title && (
                <EndContainerSVG
                  onClick={() => {
                    setTitle('');
                  }}
                />
              )}
            </div>
          </AddScheduleItem>
          <AddScheduleItem>
            <p style={{ margin: '0', fontSize: '16px', fontWeight: '600', lineHeight: '1.5' }}>시작</p>
            <div>
              <p>{formatDate(startDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
            </div>
          </AddScheduleItem>
          <AddScheduleItem>
            <p style={{ margin: '0', fontSize: '16px', fontWeight: '600', lineHeight: '1.5' }}>종료</p>
            <div>
              <p>{formatDate(endDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
            </div>
          </AddScheduleItem>
        </AddScheduleItemList>
        <AddScheduleButton
          onClick={() => {
            if (!title.trim()) return;

            actions[0](title, startDate, endDate);
            closeModal();
          }}
        >
          추가하기
        </AddScheduleButton>
      </AddScheduleContent>
    </AddScheduleContainer>
  );
};

const AddPhotoComponent = ({
  closeModal,
  actions,
}: {
  closeModal: () => void;
  actions: ((...args: any[]) => void)[];
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handlePasteClipboard = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();

        reader.onload = () => {
          setImage(reader.result);
        };

        if (blob) {
          reader.readAsDataURL(blob);
        }
        break;
      }
    }
  };

  const handleUploadLocalFile = async () => {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'Image Files',
            accept: {
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            },
          },
        ],
        multiple: false,
      });

      const file = await fileHandle.getFile();

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (err) {
      console.error('파일 선택 취소 또는 실패:', err);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <AddScheduleContainer
      ref={containerRef}
      tabIndex={0}
      onPaste={handlePasteClipboard}
      onKeyDown={(e) => {
        if (e.key == 'Enter' && image) {
          actions[0](image);
          closeModal();
        }
      }}
    >
      <CloseSVG onClick={closeModal} />
      <AddScheduleContent>
        <AddScheduleTitle>사진 추가</AddScheduleTitle>
        <div
          style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {image ? (
            <img src={image as string} style={{ width: '100%' }} />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'gray',
                color: 'white',
                height: '320px',
                gap: '12px',
              }}
              onClick={handleUploadLocalFile}
            >
              <img src={AddPhotoPNG} />
              이미지 업로드 또는 클립보드 붙여넣기
            </div>
          )}
        </div>
        {image && (
          <AddScheduleButton
            onClick={() => {
              actions[0](image);
              closeModal();
            }}
          >
            추가하기
          </AddScheduleButton>
        )}
      </AddScheduleContent>
    </AddScheduleContainer>
  );
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

  const [AddScheduleModal, openAddScheduleModal] = useModal(AddScheduleComponent, [addSchedule]);
  const [AddPhotoModal, openAddPhotoModal] = useModal(AddPhotoComponent, [addPhoto]);

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
  },

  ['svg']: {
    cursor: 'pointer',
  },
});

export default MemoPage;
