import CloseSVG from '@assets/icons/close.svg?react';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { MemoModalCloseContainer } from './Modal.Style';
import { useState } from 'react';
import { useAppSelector } from '@hooks/useRedux';
import formatDate from '@utils/Date';
import useModal from '@hooks/useModal';
import AboutImage from './AboutImage';

const contentsTypeList = [{ Image: '사진' }, { Calendar: '캘린더' }, { Link: '링크' }];

const imageList = Array.from({ length: 30 }, () => ({
  image: '',
  date: new Date(`2024-04-0${Math.ceil(Math.random() * 9)}`),
})).sort((a, b) => b.date - a.date);

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
              padding: '12px 16px',
              margin: '0',
              color: '#46474C',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '1.429',
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.03)',
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
              boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.05)',
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
  // const date = new Date();
  // const month = date.getMonth();
  // date.setDate(date.getDate() - date.getDay());
  const [date, setDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const dateList = getDateCalendar(date);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 24px',
          width: '100%',
          boxSizing: 'border-box',
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
          <p>
            {
              [
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
              ][date.getMonth()]
            }
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((e) => (
            <p style={{}}>{e}</p>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {dateList.map((e) => {
            return <p style={{ color: e.getMonth() == date.getMonth() ? 'black' : 'gray' }}>{e.getDate()}</p>;
          })}
        </div>
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
                paddingBottom: '20px',
                margin: '0',
                display: 'flex',
                gap: '6',
                alignItems: 'center',
                color: '#171719',
                fontSize: '18px',
                lineHeight: '1.445',
                fontWeight: '600',
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
