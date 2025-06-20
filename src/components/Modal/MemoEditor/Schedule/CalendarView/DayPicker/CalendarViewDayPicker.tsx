import { CalendarDays, getCalendarDates } from '@utils/Date';
import {
  CalendarViewDayPickerContainer,
  CalendarViewDayPickerDateItem,
  CalendarViewDayPickerDayItem,
  CalendarViewDayPickerGrid,
} from './CalendarViewDayPicker.Style';

const CalendarViewDayPicker = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const dateList = getCalendarDates(date);

  return (
    <CalendarViewDayPickerContainer>
      <CalendarViewDayPickerGrid>
        {CalendarDays.map((e) => (
          <CalendarViewDayPickerDayItem key={`CALENDAR_DAY_${e}`}>{e}</CalendarViewDayPickerDayItem>
        ))}
      </CalendarViewDayPickerGrid>
      <CalendarViewDayPickerGrid>
        {dateList.map((e, i) => (
          <CalendarViewDayPickerDateItem
            color={
              e.toDateString() == date?.toDateString()
                ? 'inverse'
                : e.getMonth() == date?.getMonth()
                  ? 'normal'
                  : 'alternative'
            }
            selected={e.toDateString() == date?.toDateString()}
            today={e.toDateString() == new Date().toDateString()}
            key={`CALENDAR_DATE_${i}`}
            onClick={() => {
              setDate(e);
            }}
          >
            {e.getDate()}
          </CalendarViewDayPickerDateItem>
        ))}
      </CalendarViewDayPickerGrid>
    </CalendarViewDayPickerContainer>
  );
};

export default CalendarViewDayPicker;
