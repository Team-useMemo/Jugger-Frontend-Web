import { MemoViewerButton, MemoViewerCloseContainer, MemoViewerContainer, MemoViewerTitle } from '../MemoViewer.Style';
import {
  MemoViewerScheduleContents,
  MemoViewerScheduleItemContainer,
  MemoViewerScheduleItemContent,
  MemoViewerScheduleItemListContainer,
} from './MemoViewerSchedule.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { useState } from 'react';
import { formatDate, getDateAfterOneHour } from '@utils/Date';
import useModal from '@hooks/useModal';
import BottomTransparent from '@components/Modal/Background/BottomTransparent';
import SelectCalendar from '@components/Modal/SelectCalendar/SelectCalendar';

const MemoAddSchedule = ({
  closeModal,
  actions,
}: {
  closeModal: () => void;
  actions: ((...args: any[]) => void)[];
  props: any;
}) => {
  const [addSchedule] = actions;
  const nowDate = new Date();
  nowDate.setMinutes(0);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState(null);

  const [SelectCalendarStartDateModal, openSelectCalendarStartDateModal] = useModal(
    'selectStartDate',
    BottomTransparent,
    SelectCalendar,
    [setStartDate],
    {
      nowDate,
      date: startDate,
    },
  );

  const [SelectCalendarEndDateModal, openSelectCalendarEndDateModal] = useModal(
    'selectEndDate',
    BottomTransparent,
    SelectCalendar,
    [setEndDate],
    {
      nowDate: startDate ? getDateAfterOneHour(startDate) : getDateAfterOneHour(nowDate),
      date: endDate,
    },
  );

  return (
    <MemoViewerContainer>
      <MemoViewerCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoViewerCloseContainer>
      <MemoViewerScheduleContents>
        <MemoViewerTitle>일정 추가</MemoViewerTitle>
        <MemoViewerScheduleItemListContainer>
          <MemoViewerScheduleItemContainer>
            일정 제목
            <MemoViewerScheduleItemContent>
              <input
                type="text"
                placeholder="입력"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {title && (
                <EndContainerSVG
                  onClick={() => {
                    setTitle('');
                  }}
                />
              )}
            </MemoViewerScheduleItemContent>
          </MemoViewerScheduleItemContainer>
          <MemoViewerScheduleItemContainer>
            시작
            <MemoViewerScheduleItemContent active onClick={openSelectCalendarStartDateModal}>
              <input
                type="text"
                placeholder={formatDate(nowDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}
                value={startDate ? formatDate(startDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}') : ''}
                readOnly
              />
            </MemoViewerScheduleItemContent>
            <SelectCalendarStartDateModal />
          </MemoViewerScheduleItemContainer>
          <MemoViewerScheduleItemContainer>
            종료
            <MemoViewerScheduleItemContent active onClick={openSelectCalendarEndDateModal}>
              <input
                type="text"
                placeholder={formatDate(
                  (() => {
                    const date = new Date(startDate ?? nowDate);
                    date.setHours(date.getHours() + 1);
                    return date;
                  })(),
                  '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}',
                )}
                value={endDate ? formatDate(endDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}') : ''}
                readOnly
              />
              {endDate && (
                <EndContainerSVG
                  onClick={(e) => {
                    setEndDate(null);
                    e.stopPropagation();
                  }}
                />
              )}
            </MemoViewerScheduleItemContent>
            <SelectCalendarEndDateModal />
          </MemoViewerScheduleItemContainer>
        </MemoViewerScheduleItemListContainer>

        {!!title.trim() && startDate && (
          <MemoViewerButton
            onClick={() => {
              if (!title.trim()) return;

              addSchedule(title, startDate, endDate);
              closeModal();
            }}
          >
            추가
          </MemoViewerButton>
        )}
      </MemoViewerScheduleContents>
    </MemoViewerContainer>
  );
};

export default MemoAddSchedule;
