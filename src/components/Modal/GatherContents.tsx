import CloseSVG from '@assets/icons/close.svg?react';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { MemoModalCloseContainer } from './Modal.Style';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/useRedux';
import useModal from '@hooks/useModal';
import AboutImage from './AboutImage';
import { theme } from '@styles/theme';
import styled from '@emotion/styled';
import { CalendarDays, formatDate, getCalendarDates } from '@utils/Date';

const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const contentsTypeList = [{ Image: '사진' }, { Calendar: '캘린더' }, { Link: '링크' }];

const imageList = Array.from({ length: 30 }, () => ({
  image: '',
  date: new Date(`2024-04-0${Math.ceil(Math.random() * 9)}`),
})).sort((a: any, b: any) => b.date - a.date);

const _dateList = Array.from({ length: 50 }, (_, i) => {
  const startDate = new Date();
  startDate.setDate(Math.ceil(Math.random() * 30));
  startDate.setHours(Math.floor(Math.random() * 24));
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + Math.ceil(Math.random() * 12));

  return {
    title: i,
    startDate: startDate,
    endDate: Math.random() > 0.3 ? endDate : null,
    category: Math.ceil(Math.random() * 6),
  };
}).sort((a: any, b: any) => a.startDate - b.startDate);

const GatherImages = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [AboutPhotoModal, openAboutPhotoModal] = useModal(AboutImage, [], { image: selectedImage });

  const [images] = useState(
    Object.entries(
      imageList.reduce((acc: any, e) => {
        const dateStr = e.date.toDateString();

        return {
          ...acc,
          [dateStr]: acc[dateStr] ? [...acc[dateStr], e] : [e],
        };
      }, {}),
    ).sort(([aKey], [bKey]) => new Date(bKey).getTime() - new Date(aKey).getTime()),
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <AboutPhotoModal />
      {images.map(([key, value]: [string, any]) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <div
            style={{
              ...theme.font.label1normal.semibold,
              margin: '0',
              padding: '12px 16px',
              color: theme.color.label.neutral,
              boxShadow: theme.shadow.normal,
              borderTopLeftRadius: theme.radius[12],
              borderTopRightRadius: theme.radius[12],
            }}
          >
            {formatDate(new Date(key), '{YYYY}년 {MM}월 {DD}일 {W}요일')}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              rowGap: '12px',
              padding: '18px',
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: theme.shadow.emphasize,
              borderRadius: theme.radius[12],
              borderTopLeftRadius: '0',
            }}
          >
            {value.map(() => {
              return (
                <div
                  style={{ width: '172px', height: '172px', overflow: 'hidden', borderRadius: '8px' }}
                  onClick={() => {
                    setSelectedImage(
                      'https://plus.unsplash.com/premium_photo-1681437096361-c5f1e29d6997?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJTk3JUFDJUVCJUE2JTg0JTIwJUVCJUIwJUIwJUVBJUIyJUJEJUVEJTk5JTk0JUVCJUE5JUI0fGVufDB8fDB8fHww',
                    );
                    openAboutPhotoModal();
                  }}
                >
                  <img
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    src="https://plus.unsplash.com/premium_photo-1681437096361-c5f1e29d6997?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJTk3JUFDJUVCJUE2JTg0JTIwJUVCJUIwJUIwJUVBJUIyJUJEJUVEJTk5JTk0JUVCJUE5JUI0fGVufDB8fDB8fHww"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const GatherSchedules = () => {
  const categories = useAppSelector((state) => state.categorySlice.value);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const [dates] = useState(_dateList);

  const dateList = getCalendarDates(date);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 24px',
          width: '100%',
          boxSizing: 'border-box',
          gap: '32px',
          borderRadius: theme.radius[16],
          boxShadow: theme.shadow.emphasize,
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '0 62px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <LeftArrowSVG
            stroke="black"
            height={'24px'}
            width={'24px'}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setDate((prev) => {
                const date = new Date(prev);
                date.setMonth(date.getMonth() - 1);
                return date;
              })
            }
          />
          <p
            style={{
              ...theme.font.heading1.semibold,
              color: theme.color.label.strong,
              margin: '0',
            }}
          >
            {Month[date.getMonth()] + ' ' + date.getFullYear()}
          </p>
          <RightArrowSVG
            fill="black"
            height={'24px'}
            width={'24px'}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setDate((prev) => {
                const date = new Date(prev);
                date.setMonth(date.getMonth() + 1);
                return date;
              })
            }
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {CalendarDays.map((e) => (
              <p
                style={{
                  ...theme.font.caption1.regular,
                  color: theme.color.label.alternative,
                  margin: '0',
                }}
              >
                {e}
              </p>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {dateList.map((e) => {
              return (
                <div
                  style={{
                    ...theme.font.body1normal.medium,
                    color: theme.color.label[e.getMonth() == date.getMonth() ? 'normal' : 'assistive'],
                    margin: '0',
                    height: '38px',
                    placeContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedDate(e)}
                >
                  {e.getDate()}
                  {e.toDateString() == new Date().toDateString() && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: theme.radius.full,
                        background: theme.color.primary.normal,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        ...theme.font.body1normal.medium,
                        color: theme.color.label.inverse,
                        placeContent: 'center',
                      }}
                    >
                      {e.getDate()}
                    </div>
                  )}
                  {e.toDateString() == selectedDate.toDateString() && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: theme.radius.full,
                        border: `2px dotted ${theme.color.primary.normal}`,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxSizing: 'border-box',
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      marginLeft: '2px',
                    }}
                  >
                    {dates
                      .filter((e2) => e2.startDate.toDateString() == e.toDateString())
                      .map((e2) => {
                        return (
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              background: categories.find(({ id }) => id == e2.category).color,
                              borderRadius: theme.radius.full,
                              marginLeft: '-2px',
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {dates
          .filter(({ startDate }) => startDate.toDateString() == selectedDate.toDateString())
          .map((e) => {
            return (
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '12px 16px',
                  background: theme.color.background.alternative,
                  borderRadius: theme.radius[12],
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p
                    style={{
                      ...theme.font.label1normal.regular,
                      color: theme.color.label.alternative,
                      margin: 0,
                    }}
                  >
                    {Month[e.startDate.getMonth()].substring(0, 3)}
                  </p>
                  <p
                    style={{
                      ...theme.font.heading1.medium,
                      color: theme.color.label.alternative,
                      margin: 0,
                    }}
                  >
                    {e.startDate.getDate()}
                  </p>
                </div>
                <div
                  style={{
                    borderLeft: `1px solid ${theme.color.line.normal}`,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    ...theme.font.body1normal.semibold,
                    color: theme.color.label.normal,
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      background: categories.find(({ id }) => id == e.category).color,
                      borderRadius: theme.radius.full,
                    }}
                  />
                  {e.title}
                </div>
                <div style={{ flexGrow: '1' }} />
                <RightArrowSVG fill={theme.color.label.alternative} width={'24px'} height={'24px'} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const linkList = [
  { content: 'https://www.youtube.com/watch?v=v8zk7DECvqs', category: 1 },
  { content: 'https://www.youtube.com/watch?v=gDlfKQpQZkQ', category: 2 },
  { content: 'https://www.youtube.com/watch?v=EMLxA1P119U', category: 5 },
  { content: 'https://www.youtube.com/watch?v=f_-I4yaMfK4&pp=0gcJCb8Ag7Wk3p_U' },
  { content: 'https://www.youtube.com/watch?v=UIN8CtE6Wis', category: 4 },
];

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

const GatherLinksItem = ({ content, category }: { content: any; category?: number }) => {
  const [ogData, setOgData] = useState<OgData | null>(null);

  const _category = useAppSelector((state) => state.categorySlice.value).find((e) => e.id == category);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      setOgData(await fetchUrlPreview(content));
    };

    fetchAndUpdate();
  }, [content]);

  return (
    <div
      style={{
        width: 'auto',
        overflow: 'hidden',
        borderRadius: theme.radius[12],
        padding: '12px',
        boxShadow: theme.shadow.emphasize,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        textAlign: 'left',
        cursor: 'pointer',
      }}
      onClick={() => {
        window.open(content);
      }}
    >
      <div
        style={{
          width: '100%',
          height: '200px',
          borderRadius: theme.radius[6],
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {_category && (
          <div
            style={{
              position: 'absolute',
              background: 'white',
              left: '8px',
              top: '8px',
              borderRadius: theme.radius[48],
              padding: '6px 10px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '6px', height: '6px', background: _category.color, borderRadius: theme.radius[6] }} />
            <p
              style={{
                ...theme.font.caption1.medium,
                color: theme.color.label.normal,
                margin: '0',
              }}
            >
              {_category.title}
            </p>
          </div>
        )}
        <img
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          src={ogData?.ogImage}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p
            style={{
              ...theme.font.caption1.semibold,
              color: theme.color.label.neutral,
              margin: '0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {ogData?.ogTitle}
          </p>
          <p
            style={{
              ...theme.font.caption2.medium,
              color: theme.color.label.assistive,
              margin: '0',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {ogData?.ogDescription}
          </p>
        </div>
        <p
          style={{
            ...theme.font.caption2.medium,
            color: theme.color.label.alternative,
            margin: '0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {ogData?.ogUrl}
        </p>
      </div>
    </div>
  );
};

const GatherLinks = () => {
  const [links] = useState(linkList);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          columnGap: '12px',
          rowGap: '24px',
          width: '580px',
          boxSizing: 'border-box',
          borderRadius: theme.radius[12],
          borderTopLeftRadius: '0',
        }}
      >
        {links.map((e) => {
          return <GatherLinksItem content={e.content} category={e.category} />;
        })}
      </div>
    </div>
  );
};

const GatherContents = ({ closeModal, props }: { closeModal: () => void; props: any }) => {
  const [contentsType, setContentsType] = useState(props.contentsType);
  const [categoryId, setCategoryId] = useState(props.categoryId);

  const categories = [
    { id: null, color: '#171719', title: '전체' },
    ...useAppSelector((state) => state.categorySlice.value),
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '820px',
        height: '840px',
        background: 'white',
        borderRadius: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 0px 20px',
        }}
      >
        <MemoModalCloseContainer>
          <CloseSVG onClick={closeModal} />
        </MemoModalCloseContainer>
        <div
          style={{
            display: 'flex',
            padding: '0 32px',
            gap: '16px',
          }}
        >
          {contentsTypeList.map((e) => {
            const [[key, value]] = Object.entries(e);
            console.log(key, value);
            return (
              <p
                style={{
                  fontSize: '24px',
                  lineHeight: '1.36',
                  fontWeight: key == contentsType ? '700' : '400',
                  color: key == contentsType ? '#171719' : '#C2C4C8',
                  cursor: 'pointer',
                  margin: '0',
                }}
                onClick={() => setContentsType(key)}
              >
                {value}
              </p>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #E0E0E2',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            width: '192px',
            background: '#F7F7F8',
            height: '100%',
          }}
        >
          {categories.map((e) => (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '16px 24px',
                alignItems: 'center',
                background: categoryId == e.id ? '#E8E8EA' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => {
                setCategoryId(e.id);
              }}
            >
              <div style={{ width: '8px', height: '8px', background: e.color, borderRadius: '4px' }} />
              <p
                style={{
                  margin: '0',
                  color: '#171719',
                  fontWeight: '600',
                  fontSize: '15px',
                  lineHeight: '1.467',
                }}
              >
                {e.title}
              </p>
            </div>
          ))}
        </div>
        <GatherContetnsMainContainer>
          {categoryId && (
            <div
              style={{
                ...theme.font.headline1.semibold,
                color: theme.color.label.normal,
                paddingBottom: '20px',
                margin: '0',
                display: 'flex',
                gap: '6',
                alignItems: 'center',
              }}
            >
              {categories.find(({ id }) => id == categoryId)?.title}
              <RightArrowSVG fill="#878A93" width={'20px'} height={'20px'} />
            </div>
          )}
          {contentsType == 'Image' ? (
            <GatherImages />
          ) : contentsType == 'Calendar' ? (
            <GatherSchedules />
          ) : (
            <GatherLinks />
          )}
        </GatherContetnsMainContainer>
      </div>
    </div>
  );
};

const GatherContetnsMainContainer = styled.div({
  padding: '32px 24px',
  flexGrow: '1',
  overflow: 'auto',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },
});

export default GatherContents;
