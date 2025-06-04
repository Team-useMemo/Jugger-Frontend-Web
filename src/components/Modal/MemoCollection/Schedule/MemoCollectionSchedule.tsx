import { CalendarDays, CalendarMonths, getCalendarDates } from '@utils/Date';
import { useState } from 'react';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import useModal from '@hooks/useModal';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoDetailSchedule from '@components/Modal/MemoViewer/Schedule/MemoDetailSchedule';
import {
  MemoCollectionScheduleCalendarContainer,
  MemoCollectionScheduleCalendarContents,
  MemoCollectionScheduleCalendarDateGrid,
  MemoCollectionScheduleCalendarDateItem,
  MemoCollectionScheduleCalendarDateItemContents,
  MemoCollectionScheduleCalendarDateItemContentsDot,
  MemoCollectionScheduleCalendarDateItemText,
  MemoCollectionScheduleCalendarDayGrid,
  MemoCollectionScheduleCalendarDayItem,
  MemoCollectionScheduleCalendarTitle,
  MemoCollectionScheduleContainer,
  MemoCollectionScheduleItemContainer,
  MemoCollectionScheduleItemDateContents,
  MemoCollectionScheduleItemDateContentsButton,
  MemoCollectionScheduleItemDateTitle,
  MemoCollectionScheduleItemListContainer,
} from './MemoCollectionSchedule.Style';
import { useGetCalendarQuery } from '@stores/modules/memo';


const MemoCollectionSchedule = ({ categoryId }: { categoryId: string }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const [MemoDetailScheduleModal, openMemoDetailScheduleModal] = useModal(
    `memoDetailSchedule`,
    FullScreenGray,
    MemoDetailSchedule,
    [],
  );

  const { data: _dates = [] } = useGetCalendarQuery({});
  const dates = categoryId ? _dates.filter((date) => date.categoryId === categoryId) : _dates;

  const dateList = getCalendarDates(date);

  return (
    <MemoCollectionScheduleContainer>
      <MemoDetailScheduleModal />
      <MemoCollectionScheduleCalendarContainer>
        <MemoCollectionScheduleCalendarTitle>
          <LeftArrowSVG
            onClick={() =>
              setDate((prev) => {
                const date = new Date(prev);
                date.setMonth(date.getMonth() - 1);
                return date;
              })
            }
          />
          {CalendarMonths[date.getMonth()] + ' ' + date.getFullYear()}
          <RightArrowSVG
            onClick={() =>
              setDate((prev) => {
                const date = new Date(prev);
                date.setMonth(date.getMonth() + 1);
                return date;
              })
            }
          />
        </MemoCollectionScheduleCalendarTitle>
        <MemoCollectionScheduleCalendarContents>
          <MemoCollectionScheduleCalendarDayGrid>
            {CalendarDays.map((e) => (
              <MemoCollectionScheduleCalendarDayItem key={e}>{e}</MemoCollectionScheduleCalendarDayItem>
            ))}
          </MemoCollectionScheduleCalendarDayGrid>
          <MemoCollectionScheduleCalendarDateGrid>
            {dateList.map((e) => (
              <MemoCollectionScheduleCalendarDateItem key={e.toDateString()} onClick={() => setSelectedDate(e)}>
                <MemoCollectionScheduleCalendarDateItemText
                  isCurrentMonth={e.getMonth() == date.getMonth()}
                  isToday={e.toDateString() == new Date().toDateString()}
                  isSelected={e.toDateString() == selectedDate.toDateString()}
                >
                  {e.getDate()}
                </MemoCollectionScheduleCalendarDateItemText>
                <MemoCollectionScheduleCalendarDateItemContents>
                  {dates
                    .filter((e2) => new Date(e2.startDateTime).toDateString() == e.toDateString())
                    .map((e2, i) => (
                      <MemoCollectionScheduleCalendarDateItemContentsDot
                        key={e.toDateString() + i}
                        color={e2.categoryColor}
                      />
                    ))}
                </MemoCollectionScheduleCalendarDateItemContents>
              </MemoCollectionScheduleCalendarDateItem>
            ))}
          </MemoCollectionScheduleCalendarDateGrid>
        </MemoCollectionScheduleCalendarContents>
      </MemoCollectionScheduleCalendarContainer>
      <MemoCollectionScheduleItemListContainer>
        {dates
          .filter(({ startDateTime }) => new Date(startDateTime).toDateString() == selectedDate.toDateString())
          .map((e) => {
            return (
              <MemoCollectionScheduleItemContainer
                onClick={() => {
                  openMemoDetailScheduleModal({ isEdit: false, e });
                }}
              >
                <MemoCollectionScheduleItemDateTitle>
                  <p className="month">{CalendarMonths[new Date(e.startDateTime).getMonth()].substring(0, 3)}</p>
                  <p className="date">{new Date(e.startDateTime).getDate()}</p>
                </MemoCollectionScheduleItemDateTitle>
                <span className="divider" />
                <MemoCollectionScheduleItemDateContents
                  color={e.categoryColor}
                >
                  <span />
                  {e.title}
                </MemoCollectionScheduleItemDateContents>
                <MemoCollectionScheduleItemDateContentsButton>
                  <RightArrowSVG />
                </MemoCollectionScheduleItemDateContentsButton>
              </MemoCollectionScheduleItemContainer>
            );
          })}
      </MemoCollectionScheduleItemListContainer>
    </MemoCollectionScheduleContainer>
  );
};

export default MemoCollectionSchedule;
