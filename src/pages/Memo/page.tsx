// import { useParams } from 'react-router-dom';
import PaperClipSVG from '@assets/icons/paperclip.svg?react';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import SendSVG from '@assets/icons/send.svg?react';
import TimeCircleSVG from '@assets/icons/time_circle.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import AddPhotoPNG from '@assets/icons/tmp_add_photo.png';

type userMemoType = 'text' | 'schedule' | 'link' | 'photo';

interface scheduleProp {
  title: string;
  startDate: Date;
  endDate: Date | null;
}

interface userMemoProp {
  id: number;
  type: userMemoType;
  content: string | scheduleProp;
  date: Date;
  category: string | null;
}

const categoryColor = {
  '4월 여행 계획': '#F553DA',
  Jugger: '#00BDDE',
  Daily: '#00AEFF',
  독서록: '#4F29E5',
};

const userMemoMock: userMemoProp[] = [
  {
    id: 1,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-24T04:32:00'),
    category: '4월 여행 계획',
  },
  {
    id: 2,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-24T04:33:00'),
    category: '4월 여행 계획',
  },
  {
    id: 3,
    type: 'schedule',
    content: {
      title: '호핑 투어 예약',
      startDate: new Date('2025-04-19T14:00:00'),
      endDate: null,
    },
    date: new Date('2025-03-25T04:33:00'),
    category: '4월 여행 계획',
  },
  {
    id: 4,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-25T04:33:00'),
    category: 'Jugger',
  },
  {
    id: 5,
    type: 'link',
    content: 'https://www.youtube.com/watch?v=9kfx7itbcbc',
    date: new Date('2025-03-25T04:33:00'),
    category: 'Daily',
  },
  {
    id: 6,
    type: 'photo',
    content:
      'https://png.pngtree.com/background/20250103/original/pngtree-pink-pastel-background-with-pink-aesthetic-sky-picture-image_15151458.jpg',
    date: new Date('2025-03-25T04:33:00'),
    category: '독서록',
  },
  {
    id: 7,
    type: 'schedule',
    content: {
      title: '호핑 투어 예약',
      startDate: new Date('2025-04-19T14:00:00'),
      endDate: null,
    },
    date: new Date('2025-03-26T04:33:00'),
    category: '4월 여행 계획',
  },
  {
    id: 8,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-26T04:33:00'),
    category: '4월 여행 계획',
  },
];

const formatDateToScheduleEdit = (date: Date) => {
  const _year = date.getFullYear();
  const _month = (date.getMonth() + 1).toString().padStart(2, '0');
  const _date = date.getDate().toString().padStart(2, '0');
  const _hour = date.getHours();
  const _meridiem = ~~(_hour / 12);
  const _minute = date.getMinutes().toString().padStart(2, '0');

  return `${_year}.${_month}.${_date} ${_meridiem ? '오후' : '오전'} ${_hour % 12}:${_minute}`;
};

const formatDateToSchedule = (date: Date) => {
  const _month = date.getMonth() + 1;
  const _date = date.getDate();
  const _hour = date.getHours().toString().padStart(2, '0');
  const _minute = date.getMinutes().toString().padStart(2, '0');

  return `${_month}월 ${_date}일 ${_hour}:${_minute}`;
};

const formatDateToString = (date: Date) => {
  const _year = date.getFullYear();
  const _month = date.getMonth() + 1;
  const _date = date.getDate();
  const _day = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  return `${_year}년 ${_month}월 ${_date}일 ${_day}요일`;
};

const MemoContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '0 24px',
  gap: '6px',
  alignItems: 'end',
  width: '100%',
  maxWidth: '1080px',
  boxSizing: 'border-box',
});

const MemoCategoryContainer = styled.div(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: '500',
  lineHeight: '1.27',
  color: '#878A93',

  ['span']: {
    padding: '4px',
    background: color,
    margin: '0',
    borderRadius: '32px',
  },
}));

const MemoCategory = ({ category }: { category: string }) => {
  return (
    <MemoCategoryContainer color={categoryColor[category as keyof typeof categoryColor]}>
      <span />
      {category}
    </MemoCategoryContainer>
  );
};

const MemoContent = styled.div({
  borderRadius: '12px',
  overflow: 'hidden',
});

const MemoMainText = styled.p({
  margin: '0',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: '15px',
  fontWeight: '500',
  padding: '8px 16px',
  background: '#0054D1',
  textAlign: 'start',
});

const MemoText = ({ content }: { content: string }) => {
  return <MemoMainText>{content}</MemoMainText>;
};

const MemoFlexContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: '#EAF2FE',
  cursor: 'pointer',
});

const MemoScheduleContainer = styled.div({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  margin: '0',
  color: '#171719',
  fontSize: '15px',
  fontWeight: '500',
});

const MemoSchedule = ({ content }: { content: scheduleProp }) => {
  return (
    <MemoFlexContainer>
      <MemoMainText>{content.title}</MemoMainText>
      <MemoScheduleContainer>
        <TimeCircleSVG />
        {formatDateToSchedule(content.startDate)}
      </MemoScheduleContainer>
    </MemoFlexContainer>
  );
};

const MemoPhotoContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',
  ['img']: {
    maxWidth: '320px',
    maxHeight: '240px',
  },
});

const AboutPhotoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  background: 'white',
  borderRadius: '16px',
  padding: '12px',
  gap: '8px',
  ['img']: {
    maxWidth: '640px',
    maxHeight: '480px',
    borderRadius: '12px',
  },
});

const AboutPhotoComponent = ({ closeModal, props }: { closeModal: () => void; props: { image: string } }) => {
  return (
    <AboutPhotoContainer>
      <CloseSVG onClick={closeModal} />
      <img src={props.image} />
    </AboutPhotoContainer>
  );
};

const MemoPhoto = ({ content }: { content: string }) => {
  const [AboutPhotoModal, openAboutPhotoModal] = useModal(AboutPhotoComponent, [], { image: content });

  return (
    <MemoPhotoContainer>
      <AboutPhotoModal />
      <img src={content} onClick={openAboutPhotoModal} />
    </MemoPhotoContainer>
  );
};

const fetchUrlPreview = async (url: string) => {
  const res = await fetch(`https://og-meta-data-api.vercel.app/api/preview?url=${url}`);
  const data = await res.json();
  return data;
};

interface OgData {
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

const MemoLinkTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 16px',
  gap: '4px',
  textAlign: 'left',
  width: '288px',

  ['p']: {
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',

    ['&.title']: {
      color: '#171719',
      WebkitLineClamp: '1',
    },
    ['&.desc']: {
      color: '#46474C',
      WebkitLineClamp: '2',
    },
    ['&.url']: {
      color: '#C2C4C8',
      WebkitLineClamp: '1',
    },
  },
});

const MemoLink = ({ content }: { content: string }) => {
  const [ogData, setOgData] = useState<OgData | null>(null);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      setOgData(await fetchUrlPreview(content));
    };

    fetchAndUpdate();
  }, [content]);

  if (!ogData) return <MemoMainText>{content}</MemoMainText>;

  return (
    <MemoFlexContainer
      onClick={() => {
        window.open(content);
      }}
    >
      {ogData.ogImage && (
        <img
          src={ogData.ogImage}
          style={{
            width: '320px',
            height: '180px',
            objectFit: 'cover',
          }}
        />
      )}
      <MemoLinkTextContainer>
        {ogData.ogTitle && (
          <p
            className="title"
            style={{
              fontWeight: '600',
              fontSize: '15px',
              lineHeight: '1.47',
              margin: '0',
            }}
          >
            {ogData.ogTitle}
          </p>
        )}
        {ogData.ogDescription && (
          <p
            className="desc"
            style={{
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '1.33',
              margin: '0',
            }}
          >
            {ogData.ogDescription}
          </p>
        )}
        <p
          className="url"
          style={{
            fontWeight: '500',
            fontSize: '11px',
            lineHeight: '1.27',
            margin: '0',
          }}
        >
          {ogData.ogUrl || content}
        </p>
      </MemoLinkTextContainer>
    </MemoFlexContainer>
  );
};

const MemoComponent = ({ memo }: { memo: userMemoProp }) => {
  return (
    <MemoContainer>
      {memo.category && <MemoCategory category={memo.category} />}
      <MemoContent>
        {memo.type == 'text' ? (
          <MemoText content={memo.content as string} />
        ) : memo.type == 'schedule' ? (
          <MemoSchedule content={memo.content as scheduleProp} />
        ) : memo.type == 'photo' ? (
          <MemoPhoto content={memo.content as string} />
        ) : memo.type == 'link' ? (
          <MemoLink content={memo.content as string} />
        ) : (
          ''
        )}
      </MemoContent>
    </MemoContainer>
  );
};

const isUrl = (text: string): boolean => {
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
  return pattern.test(text);
};

const ModalBackground = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '0',
  top: '0',
  background: '#989BA288',
  width: '100%',
  height: '100%',
});

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
              <p>{formatDateToScheduleEdit(startDate)}</p>
            </div>
          </AddScheduleItem>
          <AddScheduleItem>
            <p style={{ margin: '0', fontSize: '16px', fontWeight: '600', lineHeight: '1.5' }}>종료</p>
            <div>
              <p>{formatDateToScheduleEdit(endDate)}</p>
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

const useModal = (
  Component: ({
    closeModal,
    actions,
    props,
  }: {
    closeModal: () => void;
    actions: ((...args: any[]) => void)[];
    props: any;
  }) => ReactNode,
  actions: ((...args: any[]) => void)[],
  props?: any,
): [() => ReactNode, any, any] => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState(false);

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  });

  const modal = () =>
    activeModal ? (
      <ModalBackground>
        <div ref={modalRef}>
          <Component closeModal={closeModal} actions={actions} props={props} />
        </div>
      </ModalBackground>
    ) : (
      ''
    );

  return [modal, openModal, closeModal];
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

const MemoPage = () => {
  // const { username } = useParams();

  const [memos, setMemos] = useState(userMemoMock);
  const [newMemo, setNewMemo] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const addSchedule = (title: string, startDate: Date, endDate: Date | null) => {
    setMemos((prev) => [
      ...prev,
      {
        id: memos.length + 1,
        type: 'schedule',
        content: {
          title,
          startDate,
          endDate,
        },
        date: new Date(),
        category: null,
      },
    ]);
  };

  const addPhoto = (image: string) => {
    setMemos((prev) => [
      ...prev,
      {
        id: memos.length + 1,
        type: 'photo',
        content: image,
        date: new Date(),
        category: null,
      },
    ]);
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

    setMemos((prev) => [
      ...prev,
      {
        id: memos.length + 1,
        type: isUrl(newMemo) ? 'link' : 'text',
        content: newMemo,
        date: new Date(),
        category: null,
      },
    ]);
    setNewMemo('');
    setTimeout(() => {
      changeTextAreaSize();
    }, 1);
  };

  if (!memos) return <div>Loading</div>;

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <AddScheduleModal />
      <AddPhotoModal />
      <MemoListContainer>
        {[...memos].reverse().map((e, i, arr) => {
          return (
            <div key={e.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              {i + 1 < arr.length && arr[i + 1].date.toDateString() != e.date.toDateString() && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                    boxSizing: 'border-box',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      borderBottom: '1px solid #E0E0E2',
                      margin: '0',
                      height: '0',
                      minWidth: '20px',
                      flexGrow: '1',
                    }}
                  />
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '1080px',
                      boxSizing: 'content-box',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <p
                      style={{
                        margin: '0 12px',
                        color: '#C2C4C8',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                    >
                      {formatDateToString(e.date)}
                    </p>
                    <span
                      style={{
                        borderBottom: '1px solid #E0E0E2',
                        flexGrow: '1',
                        margin: '0',
                        height: '0',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      borderBottom: '1px solid #E0E0E2',
                      margin: '0',
                      height: '0',
                      minWidth: '20px',
                      flexGrow: '1',
                    }}
                  />
                </div>
              )}
              <MemoComponent memo={e} />
            </div>
          );
        })}
      </MemoListContainer>
      <div
        style={{
          maxWidth: '1080px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px 24px',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <PaperClipSVG onClick={openAddPhotoModal} />
          <CalendarSVG onClick={openAddScheduleModal} />
        </div>
        <div
          style={{
            background: '#F7F7F8',
            width: '100%',
            display: 'flex',
            borderRadius: '12px',
            padding: '10px 20px',
            alignItems: 'center',
          }}
        >
          <textarea
            ref={textareaRef}
            placeholder="메시지를 입력하세요"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={newMemo}
            style={{
              fontSize: '15px',
              fontFamily: 'Pretendard',
              height: '22px',
              padding: '0',
              lineHeight: '1.47',
              margin: '0',
              width: '100%',
              textAlign: 'left',
              border: 'none',
              outline: 'none',
              background: 'none',
              resize: 'none',
              color: '#171719',
            }}
          />
          <SendSVG onClick={handleClickSend} />
        </div>
      </div>
    </div>
  );
};

export default MemoPage;
