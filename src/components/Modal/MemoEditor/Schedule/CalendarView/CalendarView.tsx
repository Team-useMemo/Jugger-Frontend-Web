import { useEffect, useRef, useState } from 'react';
import { CalendarMonths, formatDate } from '@utils/Date';
import JuggerSwitch from '@components/Common/JuggerSwitch';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import { CalendarViewContainer, CalendarViewFooter, CalendarViewHeader, CalendarViewTitle } from './CalendarView.Style';
import CalendarViewDayPicker from './DayPicker/CalendarViewDayPicker';
import CalendarViewTimePicker from './TimePicker/CalendarViewTimePicker';
import CalendarViewYearMonthPicker from './YearMonthPicker/CalendarViewYearMonthPicker';

type PickerType = 'yearMonth' | 'day' | 'time';

const CalendarView = ({
  date,
  setDate,
  closeCalendar,
}: {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  closeCalendar: () => void;
}) => {
  const [isTimeEnabled, setIsTimeEnabled] = useState(false);
  const [activePicker, setActivePicker] = useState<PickerType>('day');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      const container = containerRef.current;
      if (!container || container.contains(e.target as Node)) return;

      closeCalendar();
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  if (!date) return null;

  const selectedDate = formatDate(date, '{YYYY}.{MM}.{DD}');
  const selectedTime = formatDate(date, '{AP} {APh}:{mm}');

  const handleToggleTimeEnabled = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTimeEnabled(e.target.checked);
  };

  const handleToggleActivePicker = () => {
    setActivePicker((prev) => (prev == 'day' ? 'yearMonth' : 'day'));
  };

  const handleClickHeaderDay = () => {
    if (activePicker === 'time') setActivePicker('day');
  };

  return (
    <CalendarViewContainer ref={containerRef}>
      <CalendarViewHeader>
        {isTimeEnabled ? (
          <p onClick={handleClickHeaderDay}>{`${selectedDate} ${selectedTime}`}</p>
        ) : (
          <>
            <p onClick={handleClickHeaderDay}>{selectedDate}</p>
            <p onClick={() => setActivePicker('time')}>{selectedTime}</p>
          </>
        )}
      </CalendarViewHeader>
      <CalendarViewTitle onClick={handleToggleActivePicker}>
        {`${CalendarMonths[date.getMonth()]} ${date.getFullYear()}`}
        <RightArrowSVG />
      </CalendarViewTitle>
      {activePicker === 'yearMonth' && <CalendarViewYearMonthPicker date={date} setDate={setDate} />}
      {activePicker === 'day' && <CalendarViewDayPicker date={date} setDate={setDate} />}
      {activePicker === 'time' && <CalendarViewTimePicker date={date} setDate={setDate} />}

      <CalendarViewFooter>
        시간 추가
        <JuggerSwitch toggleSize="20px" type="checkbox" onChange={handleToggleTimeEnabled} />
      </CalendarViewFooter>
    </CalendarViewContainer>
  );
};

export default CalendarView;
