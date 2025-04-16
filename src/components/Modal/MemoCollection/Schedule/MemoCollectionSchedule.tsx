import { useAppSelector } from '@hooks/useRedux';
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
    category: Math.ceil(Math.random() * 6).toString(),
  };
}).sort((a: any, b: any) => a.startDate - b.startDate);

const MemoCollectionSchedule = () => {
  const categories = useAppSelector((state) => state.categorySlice.value);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const [modalProp, setModalProp] = useState({});

  const [MemoDetailScheduleModal, openMemoDetailScheduleModal] = useModal(
    `memoDetailSchedule`,
    FullScreenGray,
    MemoDetailSchedule,
    [],
    modalProp,
  );

  const [dates] = useState(_dateList);

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
                    .filter((e2) => e2.startDate.toDateString() == e.toDateString())
                    .map((e2, i) => (
                      <MemoCollectionScheduleCalendarDateItemContentsDot
                        key={e.toDateString() + i}
                        color={categories.find(({ id }) => id == e2.category)?.color}
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
          .filter(({ startDate }) => startDate.toDateString() == selectedDate.toDateString())
          .map((e) => {
            return (
              <MemoCollectionScheduleItemContainer
                onClick={() => {
                  setModalProp({
                    isEdit: false,
                    ...e,
                  });
                  openMemoDetailScheduleModal();
                }}
              >
                <MemoCollectionScheduleItemDateTitle>
                  <p className="month">{CalendarMonths[e.startDate.getMonth()].substring(0, 3)}</p>
                  <p className="date">{e.startDate.getDate()}</p>
                </MemoCollectionScheduleItemDateTitle>
                <span className="divider" />
                <MemoCollectionScheduleItemDateContents color={categories.find(({ id }) => id == e.category)?.color}>
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
