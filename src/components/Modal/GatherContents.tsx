import CloseSVG from '@assets/icons/close.svg?react';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { MemoModalCloseContainer } from './Modal.Style';
import { useState } from 'react';
import { useAppSelector } from '@hooks/useRedux';
import formatDate from '@utils/Date';
import useModal from '@hooks/useModal';
import AboutImage from './AboutImage';
import { theme } from '@styles/theme';

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

console.log(123);
const getDateCalendar = (date: Date) => {
  const dateList = [];
  const firstDate = new Date(date);
  const firstDay = firstDate.getDay() == 0 ? 7 : firstDate.getDay();
  const lastDate = new Date(firstDate);
  lastDate.setMonth(lastDate.getMonth() + 1, 0);
  const lastDay = lastDate.getDay();
  console.log(lastDate, lastDay);

  const length = firstDay + lastDate.getDate() + (lastDay == 6 ? 7 : 6 - lastDay);
  firstDate.setDate(firstDate.getDate() - firstDay);
  for (let i = 0; i < length; i++) {
    dateList.push(new Date(firstDate));
    firstDate.setDate(firstDate.getDate() + 1);
  }
  return dateList;
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

  const dateList = getDateCalendar(date);

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
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((e) => (
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
        <div style={{ padding: '32px 24px', flexGrow: '1', overflow: 'auto' }}>
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
          {contentsType == 'Image' ? <GatherImages /> : contentsType == 'Calendar' ? <GatherSchedules /> : ''}
        </div>
      </div>
    </div>
  );
};

export default GatherContents;
