import styled from '@emotion/styled';
import { usePostCalendarMutation } from '@stores/modules/memo';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import { theme } from '@styles/theme';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import CalendarView from './CalendarView/CalendarView';

const AddScheduleMemoContainer = styled.div({
  background: theme.color.background.normal,
  padding: '32px 32px 40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  width: '460px',
  boxSizing: 'border-box',
  textAlign: 'left',
  borderRadius: theme.radius[16],

  ['>svg']: { cursor: 'pointer' },
});

const AddScheduleMemoContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  width: '100%',
});

const AddScheduleMemoTitle = styled.p({
  ...theme.font.title3.bold,
  color: theme.color.text.onView,
  margin: '0',
});

const AddScheduleMemoItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const AddScheduleMemoItemContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const AddScheduleMemoItemTitle = styled.p({
  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,
  margin: '0',
});

const AddScheduleMemoItemInput = styled.label({
  background: theme.color.background.alternative,
  borderRadius: theme.radius[4],
  padding: '11px 14px',
  display: 'flex',
  alignItems: 'center',
  height: '32px',

  ['input']: {
    flexGrow: '1',
    background: 'transparent',
    border: 'none',
    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },

    ['&[readonly]']: {
      cursor: 'pointer',
    },
  },

  [':has(input:focus)']: {
    outline: `1.5px solid ${theme.color.primary.normal}`,
  },

  [':has(input[readonly])']: {
    cursor: 'pointer',
  },

  ['svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },
});

const AddScheduleMemo = ({ closeModal }: ModalComponentProps) => {
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const startDateCalendarRef = useRef<HTMLDivElement>(null);
  const endDateCalendarRef = useRef<HTMLDivElement>(null);

  const [postCalendar] = usePostCalendarMutation();

  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');

  const handleClickSend = () => {
    if (!startDate) return;

    (async () => {
      try {
        await postCalendar({
          name: title,
          startTime: startDate.toISOString(),
          endTime: endDate?.toISOString(),
          categoryId: currentCategory || '',
        }).unwrap();

        closeModal();
      } catch (error) {
        console.error('메모 전송 실패:', error);
      }
    })();
  };

  const startDatePlaceHolder = (() => {
    const date = new Date();
    date.setHours(9, 0);

    return date;
  })();

  const endDatePlaceHolder = (() => {
    const date = startDate ? new Date(startDate) : new Date(startDatePlaceHolder);
    date.setHours(date.getHours() + 1);

    return date;
  })();

  const toDateString = (date: Date) => {
    return formatDate(date, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleReset = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setTitle('');
  };

  const [isOpenStartDateCalendar, setIsOpenStartDateCalendar] = useState(false);
  const [isOpenEndDateCalendar, setIsOpenEndDateCalendar] = useState(false);

  const handleClickStartDate = () => {
    if (!startDate) setStartDate(startDatePlaceHolder);
    setIsOpenStartDateCalendar(true);
    setIsOpenEndDateCalendar(false);
  };

  const handleClickEndDate = () => {
    if (!endDate) setStartDate(startDatePlaceHolder);
    setEndDate(endDatePlaceHolder);
    setIsOpenEndDateCalendar(true);
    setIsOpenStartDateCalendar(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        startDateCalendarRef.current &&
        endDateCalendarRef.current &&
        !startDateCalendarRef.current.contains(e.target as Node) &&
        !endDateCalendarRef.current.contains(e.target as Node)
      ) {
        setIsOpenStartDateCalendar(false);
        setIsOpenEndDateCalendar(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <AddScheduleMemoContainer>
      <CloseSVG onClick={closeModal} />
      <AddScheduleMemoContents>
        <AddScheduleMemoTitle>일정 추가</AddScheduleMemoTitle>
        <AddScheduleMemoItemContainer>
          <AddScheduleMemoItemContents>
            <AddScheduleMemoItemTitle>일정 제목</AddScheduleMemoItemTitle>
            <AddScheduleMemoItemInput>
              <input placeholder="입력" value={title} onChange={handleTitleChange} />
              {title && <EndContainerSVG onClick={handleTitleReset} />}
            </AddScheduleMemoItemInput>
          </AddScheduleMemoItemContents>
          <AddScheduleMemoItemContents>
            <AddScheduleMemoItemTitle>시작</AddScheduleMemoItemTitle>
            <div ref={startDateCalendarRef}>
              {isOpenStartDateCalendar ? (
                <CalendarView date={startDate} setDate={setStartDate} />
              ) : (
                <AddScheduleMemoItemInput onClick={handleClickStartDate}>
                  <input
                    placeholder={toDateString(startDatePlaceHolder)}
                    value={startDate ? toDateString(startDate) : ''}
                    onChange={handleTitleChange}
                    readOnly
                  />
                </AddScheduleMemoItemInput>
              )}
            </div>
          </AddScheduleMemoItemContents>
          <AddScheduleMemoItemContents>
            <AddScheduleMemoItemTitle>종료</AddScheduleMemoItemTitle>
            <div ref={endDateCalendarRef}>
              {isOpenEndDateCalendar ? (
                <CalendarView date={endDate} setDate={setEndDate} />
              ) : (
                <AddScheduleMemoItemInput onClick={handleClickEndDate}>
                  <input
                    placeholder={toDateString(endDatePlaceHolder)}
                    value={endDate ? toDateString(endDate) : ''}
                    onChange={handleTitleChange}
                    readOnly
                  />
                </AddScheduleMemoItemInput>
              )}
            </div>
          </AddScheduleMemoItemContents>
        </AddScheduleMemoItemContainer>
        <JuggerButton color="primary" size="medium" disabled={!(title && startDate)} onClick={handleClickSend}>
          추가
        </JuggerButton>
      </AddScheduleMemoContents>
    </AddScheduleMemoContainer>
  );
};

export default AddScheduleMemo;
