import { useGetCalendarQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { useMemo, useState } from 'react';
import { MemoResponseProp, scheduleProp } from '@ts/Memo.Prop';
import { CalendarDays, formatDate, getCalendarDates } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import LeftArrowSVG from '@assets/icons/left_arrow.svg?react';
import RightArrowSVG from '@assets/icons/right_arrow.svg?react';
import {
  MemoCollectionScheduleCalendarContainer,
  MemoCollectionScheduleCalendarContents,
  MemoCollectionScheduleCalendarContentsBody,
  MemoCollectionScheduleCalendarContentsBodyItem,
  MemoCollectionScheduleCalendarContentsBodyItemSubContainer,
  MemoCollectionScheduleCalendarContentsBodyItemSubItem,
  MemoCollectionScheduleCalendarContentsHeader,
  MemoCollectionScheduleCalendarContentsHeaderItem,
  MemoCollectionScheduleCalendarHeader,
  MemoCollectionScheduleContainer,
  MemoCollectionScheduleListContainer,
  MemoCollectionScheduleListItemContainer,
  MemoCollectionScheduleListItemDate,
  MemoCollectionScheduleListItemTitle,
} from './MemoCollectionSchedule.Style';

const MemoCollectionSchedule = ({ category }: { category: string }) => {
  const dispatch = useAppDispatch();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date(new Date().setDate(1)));

  const dateList = useMemo(() => getCalendarDates(selectedMonth), [selectedMonth]);

  const { data: scheduleMemos = [] } = useGetCalendarQuery({
    start: dateList[0].toISOString(),
    end: dateList[dateList.length - 1].toISOString(),
  });

  const filteredMemos = useMemo(
    () => scheduleMemos.filter((e) => !category || e.categoryId === category),
    [scheduleMemos, category],
  );

  const scheduleDotList = useMemo(
    () =>
      filteredMemos.reduce((acc: Record<string, MemoResponseProp[]>, e) => {
        const dateStr = (e.content as scheduleProp).startDate.toDateString();
        (acc[dateStr] ||= []).push(e);
        return acc;
      }, {}),
    [filteredMemos],
  );

  const scheduleList = useMemo(
    () =>
      filteredMemos.filter((e) => {
        const { startDate } = e.content as scheduleProp;
        return selectedDate
          ? startDate.toDateString() === selectedDate.toDateString()
          : startDate.getFullYear() === selectedMonth.getFullYear() &&
              startDate.getMonth() === selectedMonth.getMonth();
      }),
    [filteredMemos, selectedDate, selectedMonth],
  );

  const handleCliekScheduleItem = (content: scheduleProp) => {
    dispatch(
      setModalOpen({
        name: ModalName.detailScheduleMemoCollection,
        value: content,
      }),
    );
  };

  const handleChangeMonth = (offset: number) => {
    setSelectedMonth((prev) => {
      const newDate = new Date(prev);
      const targetMonth = (newDate.getMonth() + offset + 12) % 12;
      newDate.setMonth(newDate.getMonth() + offset);
      if (newDate.getMonth() !== targetMonth) newDate.setMonth(targetMonth);
      return newDate;
    });
  };

  const handleClickDateItem = (date: Date) => {
    setSelectedDate((prev) => (prev?.toDateString() === date.toDateString() ? null : date));
  };

  return (
    <MemoCollectionScheduleContainer>
      <MemoCollectionScheduleCalendarContainer>
        <MemoCollectionScheduleCalendarHeader>
          <LeftArrowSVG onClick={() => handleChangeMonth(-1)} />
          <p>{formatDate(selectedMonth, '{MW} {Y}')}</p>
          <RightArrowSVG onClick={() => handleChangeMonth(1)} />
        </MemoCollectionScheduleCalendarHeader>
        <MemoCollectionScheduleCalendarContents>
          <MemoCollectionScheduleCalendarContentsHeader>
            {CalendarDays.map((e) => (
              <MemoCollectionScheduleCalendarContentsHeaderItem key={`SCHEDULE_COLLECTION_CALENDAR_DAY_${e}`}>
                {e}
              </MemoCollectionScheduleCalendarContentsHeaderItem>
            ))}
          </MemoCollectionScheduleCalendarContentsHeader>
          <MemoCollectionScheduleCalendarContentsBody>
            {dateList.map((e) => (
              <MemoCollectionScheduleCalendarContentsBodyItem
                key={`CALENDAR_DAY_${e}`}
                color={
                  e.toDateString() == selectedDate?.toDateString()
                    ? 'inverse'
                    : e.getMonth() == selectedMonth?.getMonth()
                      ? 'normal'
                      : 'assistive'
                }
                selected={e.toDateString() == selectedDate?.toDateString()}
                today={e.toDateString() == new Date().toDateString()}
                onClick={() => handleClickDateItem(e)}
              >
                <p>{e.getDate()}</p>
                <MemoCollectionScheduleCalendarContentsBodyItemSubContainer>
                  {scheduleDotList[e.toDateString()] &&
                    (scheduleDotList[e.toDateString()] as MemoResponseProp[]).map((e) => (
                      <MemoCollectionScheduleCalendarContentsBodyItemSubItem color={e.categoryColor} />
                    ))}
                </MemoCollectionScheduleCalendarContentsBodyItemSubContainer>
              </MemoCollectionScheduleCalendarContentsBodyItem>
            ))}
          </MemoCollectionScheduleCalendarContentsBody>
        </MemoCollectionScheduleCalendarContents>
      </MemoCollectionScheduleCalendarContainer>
      <MemoCollectionScheduleListContainer>
        {scheduleList.map((e) => {
          const content = e.content as scheduleProp;

          return (
            <MemoCollectionScheduleListItemContainer onClick={() => handleCliekScheduleItem(content)}>
              <MemoCollectionScheduleListItemDate>
                <span>{formatDate(content.startDate, '{Mw}')}</span>
                {content.startDate.getDate()}
              </MemoCollectionScheduleListItemDate>
              <span className="divider" />
              <MemoCollectionScheduleListItemTitle color={e.categoryColor}>
                <span />
                {content.title}
              </MemoCollectionScheduleListItemTitle>
              <span className="grow" />
              <RightArrowSVG />
            </MemoCollectionScheduleListItemContainer>
          );
        })}
      </MemoCollectionScheduleListContainer>
    </MemoCollectionScheduleContainer>
  );
};

export default MemoCollectionSchedule;
