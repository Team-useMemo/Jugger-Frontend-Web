import { CalendarMonths } from '@utils/Date';
import useScrollSelect from '@hooks/useScrollSelect';
import {
  CalendarViewYearMonthPickerContainer,
  CalendarViewYearMonthPickerContents,
  CalendarViewYearMonthPickerFocus,
  CalendarViewYearMonthPickerScroll,
  CalendarViewYearMonthPickerScrollItem,
} from './CalendarViewYearMonthPicker.Style';

const CalendarViewYearMonthPicker = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const ScrollItemHeight = 48;

  const selectedMonth = date.getMonth();
  const selectedYear = date.getFullYear();

  const setCurrentMonth = (month: number) => {
    setDate((prev) => {
      if (prev?.getMonth() == month) return prev;
      const date = new Date(prev ?? '');
      date.setMonth(month);
      return date;
    });
  };

  const setCurrentYear = (year: number) => {
    setDate((prev) => {
      if (prev?.getFullYear() == year + 1970) return prev;
      const date = new Date(prev ?? '');
      date.setFullYear(year + 1970);
      return date;
    });
  };

  const [monthContainerRef, monthList, handleClickMonthItem] = useScrollSelect({
    scrollItems: CalendarMonths,
    isInfinite: true,
    scrollItemHeight: ScrollItemHeight,
    selected: selectedMonth,
    setSelected: setCurrentMonth,
  });

  const [yearContainerRef, yearList, handleClickYearItem] = useScrollSelect({
    scrollItems: Array.from({ length: (new Date().getFullYear() - 1970) * 2 + 1 }, (_, i) => 1970 + i),
    isInfinite: true,
    scrollItemHeight: ScrollItemHeight,
    selected: selectedYear - 1970,
    setSelected: setCurrentYear,
  });

  return (
    <CalendarViewYearMonthPickerContainer>
      <CalendarViewYearMonthPickerFocus />
      <CalendarViewYearMonthPickerContents>
        <CalendarViewYearMonthPickerScroll ref={monthContainerRef}>
          {monthList.map((e, i) => (
            <CalendarViewYearMonthPickerScrollItem
              key={`CALENDER_MONTH_${i}`}
              height={ScrollItemHeight}
              isFocused={e == CalendarMonths[selectedMonth]}
              onClick={() => handleClickMonthItem(i)}
            >
              {e}
            </CalendarViewYearMonthPickerScrollItem>
          ))}
        </CalendarViewYearMonthPickerScroll>
        <CalendarViewYearMonthPickerScroll ref={yearContainerRef}>
          {yearList.map((e, i) => (
            <CalendarViewYearMonthPickerScrollItem
              key={`CALENDER_YEAR_${i}`}
              height={ScrollItemHeight}
              isFocused={e == selectedYear}
              onClick={() => handleClickYearItem(i)}
            >
              {e}
            </CalendarViewYearMonthPickerScrollItem>
          ))}
        </CalendarViewYearMonthPickerScroll>
      </CalendarViewYearMonthPickerContents>
    </CalendarViewYearMonthPickerContainer>
  );
};

export default CalendarViewYearMonthPicker;
