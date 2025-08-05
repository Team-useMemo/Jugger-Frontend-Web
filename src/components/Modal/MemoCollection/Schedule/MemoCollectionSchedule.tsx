import { useGetCategoriesQuery } from '@stores/modules/category';
import { useDeleteMemoMutation, useGetCalendarByCategoryQuery, useGetCalendarQuery } from '@stores/modules/memo';
import { setModalOpen } from '@stores/modules/modal';
import { useMemo, useState } from 'react';
import { CategoryProp } from '@ts/Category.Prop';
import { MemoProp, scheduleProp } from '@ts/Memo.Prop';
import { ContextMenuCategory, ContextMenuDelete, ContextMenuEdit } from '@utils/ContextMenu';
import { CalendarDays, formatDate, getCalendarDates } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useContextMenu } from '@hooks/useContextMenu';
import { useAppDispatch } from '@hooks/useRedux';
import EmptyContent from '@components/Common/EmptyContent';
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

const MemoCollectionScheduleListItem = ({
  memo,
  category,
  chatId,
}: {
  memo: MemoProp;
  category?: CategoryProp;
  chatId: string;
}) => {
  const content = memo.content as scheduleProp;
  const dispatch = useAppDispatch();

  const handleCliekScheduleItem = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailScheduleMemo,
        value: { chatId, content },
      }),
    );
  };
  const [deleteMemo] = useDeleteMemoMutation();

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color: category?.categoryColor ?? '', title: category?.categoryName ?? '' },
    items: [
      {
        label: '카테고리 설정',
        onClick: ContextMenuCategory,
      },
      {
        label: '공유',
        onClick: ContextMenuEdit,
      },
      {
        label: '삭제',
        onClick: () => {
          console.log(chatId);
          deleteMemo({ chatId });
        },
      },
    ],
  });

  return (
    <MemoCollectionScheduleListItemContainer onClick={handleCliekScheduleItem} {...BindContextMenuHandlers}>
      <ContextMenu />
      <MemoCollectionScheduleListItemDate>
        <span>{formatDate(content.startDate, '{Mw}')}</span>
        {content.startDate.getDate()}
      </MemoCollectionScheduleListItemDate>
      <span className="divider" />
      <MemoCollectionScheduleListItemTitle color={category?.categoryColor}>
        <p>{content.title}</p>
      </MemoCollectionScheduleListItemTitle>
      <span className="grow" />
      <RightArrowSVG />
    </MemoCollectionScheduleListItemContainer>
  );
};

const MemoCollectionScheduleCalendarItem = ({
  date,
  dotList,
  selectedDate,
  handleClickDateItem,
  selectedMonth,
}: {
  date: Date;
  dotList: string[];
  selectedDate: Date | null;
  handleClickDateItem: (date: Date) => void;
  selectedMonth: Date;
}) => {
  const dateStr = date.toDateString();
  const isToday = dateStr === new Date().toDateString();
  const isSelected = dateStr === selectedDate?.toDateString();
  const isCurrentMonth = date.getMonth() == selectedMonth?.getMonth();

  return (
    <MemoCollectionScheduleCalendarContentsBodyItem
      color={isSelected ? 'inverse' : isCurrentMonth ? 'normal' : 'assistive'}
      selected={isSelected}
      today={isToday}
      onClick={() => handleClickDateItem(date)}
    >
      <p>{date.getDate()}</p>
      {dotList && (
        <MemoCollectionScheduleCalendarContentsBodyItemSubContainer>
          {dotList.map(
            (color, idx) =>
              color && (
                <MemoCollectionScheduleCalendarContentsBodyItemSubItem
                  key={`SCHEDULE_COLLECTION_CALENDAR_DATE_DOT_${dateStr}_${idx}`}
                  color={color}
                />
              ),
          )}
        </MemoCollectionScheduleCalendarContentsBodyItemSubContainer>
      )}
    </MemoCollectionScheduleCalendarContentsBodyItem>
  );
};

const MemoCollectionSchedule = ({ category }: { category?: CategoryProp }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date(new Date().setDate(1)));

  const { data: categories = [] } = useGetCategoriesQuery();
  const dateList = useMemo(() => getCalendarDates(selectedMonth), [selectedMonth]);

  const useCalendarMemos = (category?: CategoryProp) => {
    const useCategoryQuery = !!category?.categoryId;

    const query = useGetCalendarByCategoryQuery(
      {
        start: dateList[0].toISOString(),
        end: dateList[dateList.length - 1].toISOString(),
        categoryId: category?.categoryId ?? '',
      },
      { skip: !useCategoryQuery },
    );

    const fallback = useGetCalendarQuery(
      {
        start: dateList[0].toISOString(),
        end: dateList[dateList.length - 1].toISOString(),
      },
      { skip: useCategoryQuery },
    );

    return useCategoryQuery ? query : fallback;
  };

  const { data: scheduleMemos = [] } = useCalendarMemos(category);

  const scheduleDotList = useMemo(
    () =>
      scheduleMemos.reduce((acc: Record<string, string[]>, memo) => {
        const dateStr = (memo.content as scheduleProp).startDate.toDateString();
        (acc[dateStr] ||= []).push(
          categories.find((category) => category.categoryId == memo.categoryId)?.categoryColor ?? '',
        );
        return acc;
      }, {}),
    [scheduleMemos, categories],
  );

  const scheduleList = useMemo(
    () =>
      scheduleMemos.filter((memo) => {
        const { startDate } = memo.content as scheduleProp;
        return selectedDate
          ? startDate.toDateString() === selectedDate.toDateString()
          : startDate.getFullYear() === selectedMonth.getFullYear() &&
              startDate.getMonth() === selectedMonth.getMonth();
      }),
    [scheduleMemos, selectedDate, selectedMonth],
  );

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
            {CalendarDays.map((day) => (
              <MemoCollectionScheduleCalendarContentsHeaderItem key={`SCHEDULE_COLLECTION_CALENDAR_DAY_${day}`}>
                {day}
              </MemoCollectionScheduleCalendarContentsHeaderItem>
            ))}
          </MemoCollectionScheduleCalendarContentsHeader>
          <MemoCollectionScheduleCalendarContentsBody>
            {dateList.map((date) => (
              <MemoCollectionScheduleCalendarItem
                key={`SCHEDULE_COLLECTION_CALENDAR_DATE_${date.toDateString()}`}
                date={date}
                dotList={scheduleDotList[date.toDateString()]}
                selectedDate={selectedDate}
                handleClickDateItem={handleClickDateItem}
                selectedMonth={selectedMonth}
              />
            ))}
          </MemoCollectionScheduleCalendarContentsBody>
        </MemoCollectionScheduleCalendarContents>
      </MemoCollectionScheduleCalendarContainer>

      <MemoCollectionScheduleListContainer>
        {!scheduleList.length && (
          <EmptyContent>
            아직 일정이 없어요
            <span>일정을 여기서 편하게 모아보세요!</span>
          </EmptyContent>
        )}
        {scheduleList.map((memo, index: number) => (
          <MemoCollectionScheduleListItem
            key={`SCHEDULE_COLLECTION_CALENDAR_DATE_${memo.chatId}_${index}`}
            memo={memo}
            category={categories.find(({ categoryId }) => categoryId == memo.categoryId)}
            chatId={memo.chatId}
          />
        ))}
      </MemoCollectionScheduleListContainer>
    </MemoCollectionScheduleContainer>
  );
};

export default MemoCollectionSchedule;
