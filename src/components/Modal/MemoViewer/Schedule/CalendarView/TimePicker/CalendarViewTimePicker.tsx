import { useEffect, useRef, useState } from 'react';
import useScrollSelect from '@hooks/useScrollSelect';
import { theme } from '@styles/theme';
import {
  CalendarViewYearMonthPickerContainer,
  CalendarViewYearMonthPickerContents,
  CalendarViewYearMonthPickerFocus,
  CalendarViewYearMonthPickerScroll,
  CalendarViewYearMonthPickerScrollItem,
} from './CalendarViewTimePicker.Style';

const CalendarViewTimePicker = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const ScrollItemHeight = 48;

  const meridiemContainerRef = useRef<HTMLDivElement>(null);
  const Meridiems = ['오전', '오후'];

  const selectedMeridiems = ~~(date.getHours() / 12);
  const selectedHour = date.getHours();
  const selectedMinute = date.getMinutes();

  const [detailMinute] = useState(true);
  const minuteItems = Array.from({ length: detailMinute ? 60 : 12 }, (_, i) => i * (detailMinute ? 1 : 5));

  const setCurrentHours = (hour: number) => {
    setDate((prev) => {
      if (prev?.getHours() == hour) return prev;
      const date = new Date(prev ?? '');
      date.setHours(hour);
      return date;
    });
  };

  const setCurrentMinutes = (minute: number) => {
    setDate((prev) => {
      if (!prev || prev.getMinutes() == minuteItems[minute]) return prev;
      const date = new Date(prev);
      date.setMinutes(minuteItems[minute]);
      return date;
    });
  };

  const [hourContainerRef, hourList, handleClickHour] = useScrollSelect({
    scrollItems: Array.from({ length: 24 }, (_, i) => (~~(i / 12) ? 'P' : 'A') + (i % 12)),
    isInfinite: true,
    scrollItemHeight: ScrollItemHeight,
    selected: date.getHours(),
    setSelected: setCurrentHours,
  });

  const [minuteContainerRef, minuteList, handleClickMinute] = useScrollSelect({
    scrollItems: minuteItems,
    isInfinite: true,
    scrollItemHeight: ScrollItemHeight,
    selected: date.getMinutes(),
    setSelected: setCurrentMinutes,
  });

  useEffect(() => {
    const meridiemContainer = meridiemContainerRef.current;
    if (!meridiemContainer) return;

    meridiemContainer.scrollTo({
      top: selectedMeridiems * ScrollItemHeight + ScrollItemHeight / 2,
      behavior: 'smooth',
    });
  }, [selectedMeridiems]);

  const handleClickMeridiem = (meridiem: number) => {
    const meridiemContainer = meridiemContainerRef.current;
    if (!meridiemContainer) return;

    if (meridiem == selectedMeridiems) return;
    const newHour = (date.getHours() + 12) % 24;

    setDate((prev) => {
      if (!prev) return prev;
      const date = new Date(prev);
      date.setHours(newHour);
      return date;
    });
    meridiemContainer.scrollTo({
      top: meridiem * ScrollItemHeight + ScrollItemHeight / 2,
      behavior: 'smooth',
    });

    const hourContainer = hourContainerRef.current;
    if (!hourContainer) return;
    const hourBaseY = ~~(hourList.length / 24 / 2) * 24 * ScrollItemHeight + ScrollItemHeight / 2;
    hourContainer.scrollTo({ top: hourBaseY + newHour * ScrollItemHeight });
  };

  return (
    <CalendarViewYearMonthPickerContainer>
      <CalendarViewYearMonthPickerFocus />
      <CalendarViewYearMonthPickerContents>
        <CalendarViewYearMonthPickerScroll ref={meridiemContainerRef}>
          {Meridiems.map((e, i) => (
            <CalendarViewYearMonthPickerScrollItem
              key={i}
              height={ScrollItemHeight}
              isFocused={i == selectedMeridiems}
              onClick={() => handleClickMeridiem(i)}
            >
              {e}
            </CalendarViewYearMonthPickerScrollItem>
          ))}
        </CalendarViewYearMonthPickerScroll>
        <CalendarViewYearMonthPickerScroll ref={hourContainerRef}>
          {hourList.map((e, i) => (
            <CalendarViewYearMonthPickerScrollItem
              key={i}
              height={ScrollItemHeight}
              isFocused={e == (~~(selectedHour / 12) ? 'P' : 'A') + (selectedHour % 12)}
              onClick={() => handleClickHour(i)}
            >
              {`${e}`.substring(1)}
            </CalendarViewYearMonthPickerScrollItem>
          ))}
        </CalendarViewYearMonthPickerScroll>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            color: theme.color.label.normal,
            ...theme.font.heading1.semibold,
            margin: 0,
          }}
        >
          :
        </p>
        <div style={{ width: '100%', position: 'relative' }}>
          <CalendarViewYearMonthPickerScroll ref={minuteContainerRef}>
            {minuteList.map((e, i) => (
              <CalendarViewYearMonthPickerScrollItem
                key={i}
                height={ScrollItemHeight}
                isFocused={e == selectedMinute}
                onClick={() => handleClickMinute(i)}
              >
                {e}
              </CalendarViewYearMonthPickerScrollItem>
            ))}
          </CalendarViewYearMonthPickerScroll>
          {/* <input
            type="text"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translate(0, -50%)',
              width: '100%',
              textAlign: 'center',

              color: theme.color.label.normal,
              ...theme.font.heading1.semibold,
              border: 'none',
              background: 'transparent',
              padding: '0',
            }}
            value={selectedMinute}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (isNaN(value) || value < 0 || value > 59) return;

              if (value % 5) {
                setDetailMinute(true);
              }

              setDate((prev) => {
                if (!prev) return prev;
                const date = new Date(prev);
                date.setMinutes(value);
                return date;
              });
            }}
          ></input> */}
        </div>
      </CalendarViewYearMonthPickerContents>
    </CalendarViewYearMonthPickerContainer>
  );
};

export default CalendarViewTimePicker;
