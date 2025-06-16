import { useEffect, useRef, useState } from 'react';
import { CalendarDays, CalendarMonths, getCalendarDates } from '@utils/Date';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import {
  SelectCalendarContainer,
  SelectCalendarDateGrid,
  SelectCalendarDateItem,
  SelectCalendarDayItem,
  SelectCalendarMonthContent,
  SelectCalendarMonthFlexContainer,
  SelectCalendarMonthFocus,
  SelectCalendarMonthScrollContainer,
  SelectCalendarMonthScrollItem,
  SelectCalendarTitle,
} from './SelectCalendar.Style';

const SelectCalendarMonth = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) => {
  const ScrollItemHeight = 48;

  const monthContainerRef = useRef<HTMLDivElement>(null);
  const yearContainerRef = useRef<HTMLDivElement>(null);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear() - 1970);

  const CalendarYears = Array.from({ length: (selectedDate.getFullYear() - 1970) * 2 + 1 }, (_, i) => 1970 + i);

  const handleScrollMonth = () => {
    if (!monthContainerRef.current) return;

    const children = Array.from(monthContainerRef.current.children);
    const viewportCenter =
      monthContainerRef.current.getBoundingClientRect().top + monthContainerRef.current.clientHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    children
      .filter((e) => e.tagName == 'P')
      .forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

    setSelectedMonth(closestIndex);
  };

  const handleScrollYear = () => {
    if (!yearContainerRef.current) return;

    const children = Array.from(yearContainerRef.current.children);
    const viewportCenter =
      yearContainerRef.current.getBoundingClientRect().top + yearContainerRef.current.clientHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    children
      .filter((e) => e.tagName == 'P')
      .forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

    setSelectedYear(closestIndex);
  };

  useEffect(() => {
    const monthContainer = monthContainerRef.current;
    const yearContainer = yearContainerRef.current;
    monthContainer?.addEventListener('scroll', handleScrollMonth, { passive: true });
    monthContainer?.scrollTo({ top: selectedMonth * ScrollItemHeight + ScrollItemHeight / 2 });
    yearContainer?.addEventListener('scroll', handleScrollYear, { passive: true });
    yearContainer?.scrollTo({ top: selectedYear * ScrollItemHeight + ScrollItemHeight / 2 });

    return () => {
      monthContainer?.removeEventListener('scroll', handleScrollMonth);
      yearContainer?.removeEventListener('scroll', handleScrollYear);
    };
  }, []);

  return (
    <>
      <SelectCalendarTitle
        onClick={() => {
          const date = new Date(selectedDate);
          date.setDate(1);
          date.setFullYear(CalendarYears[selectedYear]);
          date.setMonth(selectedMonth);

          setSelectedDate(date);
        }}
      >
        {`${CalendarMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
        <RightArrowSVG />
        {selectedMonth != selectedDate.getMonth() || CalendarYears[selectedYear] != selectedDate.getFullYear()
          ? `${CalendarMonths[selectedMonth]} ${CalendarYears[selectedYear]}`
          : ''}
      </SelectCalendarTitle>

      <SelectCalendarMonthContent>
        <SelectCalendarMonthFocus />
        <SelectCalendarMonthFlexContainer>
          <SelectCalendarMonthScrollContainer ref={monthContainerRef}>
            <div />
            {CalendarMonths.map((e, i) => (
              <SelectCalendarMonthScrollItem
                key={`CALENDER_MONTH_${i}`}
                height={ScrollItemHeight}
                isFocused={i == selectedMonth}
                onClick={() => {
                  monthContainerRef.current?.scrollTo({
                    top: i * ScrollItemHeight + ScrollItemHeight / 2,
                    behavior: 'smooth',
                  });
                }}
              >
                {e}
              </SelectCalendarMonthScrollItem>
            ))}
            <div />
          </SelectCalendarMonthScrollContainer>
          <SelectCalendarMonthScrollContainer ref={yearContainerRef}>
            <div />
            {CalendarYears.map((e, i) => (
              <SelectCalendarMonthScrollItem
                key={`CALENDER_YEAR_${i}`}
                height={ScrollItemHeight}
                isFocused={i == selectedYear}
                onClick={() => {
                  yearContainerRef.current?.scrollTo({
                    top: i * ScrollItemHeight + ScrollItemHeight / 2,
                    behavior: 'smooth',
                  });
                }}
              >
                {e}
              </SelectCalendarMonthScrollItem>
            ))}
            <div />
          </SelectCalendarMonthScrollContainer>
        </SelectCalendarMonthFlexContainer>
      </SelectCalendarMonthContent>
    </>
  );
};

const SelectCalendarDate = ({
  selectedDate,
  setSelectedDate,
  setSelectMode,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setSelectMode: React.Dispatch<React.SetStateAction<'time' | 'month' | 'date'>>;
}) => {
  const dateList = getCalendarDates(
    (() => {
      const date = new Date(selectedDate);
      date.setDate(1);
      return date;
    })(),
  );

  return (
    <>
      <SelectCalendarTitle onClick={() => setSelectMode('month')}>
        {`${CalendarMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
        <RightArrowSVG />
      </SelectCalendarTitle>
      <SelectCalendarDateGrid>
        {CalendarDays.map((e) => (
          <SelectCalendarDayItem key={`CALENDAR_DAY_${e}`}>{e}</SelectCalendarDayItem>
        ))}
      </SelectCalendarDateGrid>
      <SelectCalendarDateGrid>
        {dateList.map((e, i) => (
          <SelectCalendarDateItem
            color={
              e.toDateString() == selectedDate?.toDateString()
                ? 'inverse'
                : e.getMonth() == selectedDate?.getMonth()
                  ? 'normal'
                  : 'alternative'
            }
            selected={e.toDateString() == selectedDate?.toDateString()}
            key={`CALENDAR_DATE_${i}`}
            onClick={() => {
              setSelectedDate(e);
            }}
          >
            {e.getDate()}
          </SelectCalendarDateItem>
        ))}
      </SelectCalendarDateGrid>
    </>
  );
};

const SelectCalendar = ({
  actions,
  props,
}: {
  closeModal: () => void;
  actions: ((...args: any[]) => void)[];
  props: any;
}) => {
  const [setDate] = actions;
  const { nowDate, date } = props;

  const [selectMode, setSelectMode] = useState<'month' | 'date' | 'time'>('date');

  // const [selectedDate, _setSelectedDate] = useState<Date>(date ?? nowDate);

  const [selectedDate, _setSelectedDate] = useState<Date>(() => {
    if (date instanceof Date) return date;
    if (nowDate instanceof Date) return nowDate;
    return new Date();
  });

  const setSelectedDate = (date: Date) => {
    _setSelectedDate(date);
    setDate(date);
  };

  // useEffect(() => {
  //   if (date) return;
  //   setDate(nowDate);
  // });

  return (
    <SelectCalendarContainer>
      {selectMode == 'month' ? (
        <SelectCalendarMonth selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      ) : (
        <SelectCalendarDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setSelectMode={setSelectMode}
        />
      )}
    </SelectCalendarContainer>
  );
};

export default SelectCalendar;
