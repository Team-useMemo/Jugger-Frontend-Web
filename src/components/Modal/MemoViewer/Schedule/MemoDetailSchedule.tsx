import { useState } from 'react';
import { MemoViewerButton, MemoViewerCloseContainer, MemoViewerContainer } from '../MemoViewer.Style';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import {
  MemoViewerScheduleContents,
  MemoViewerScheduleItemContainer,
  MemoViewerScheduleItemContent,
  MemoViewerScheduleItemListContainer,
} from './MemoViewerSchedule.Style';
import { formatDate, getDateAfterOneHour } from '@utils/Date';
import BottomTransparent from '@components/Modal/Background/BottomTransparent';
import SelectCalendar from '@components/Modal/SelectCalendar/SelectCalendar';
import useModal from '@hooks/useModal';

const MemoDetailSchedule = ({
  closeModal,
  props,
}: {
  closeModal: () => void;
  actions: ((...args: any[]) => void)[];
  props: any;
}) => {
  const nowDate = new Date();
  nowDate.setMinutes(0);

  const [isEdit, setIsEdit] = useState(!!props.isEdit);
  const [title, setTitle] = useState(props.title);
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);

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
        <MemoViewerScheduleItemListContainer>
          <MemoViewerScheduleItemContainer>
            일정 제목
            <MemoViewerScheduleItemContent>
              <input
                type="text"
                placeholder="입력"
                value={title}
                disabled={!isEdit}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {isEdit && title && (
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
            <MemoViewerScheduleItemContent
              active={isEdit}
              onClick={() => {
                if (!isEdit) return;
                openSelectCalendarStartDateModal();
              }}
            >
              <input type="text" value={formatDate(startDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')} readOnly />
            </MemoViewerScheduleItemContent>
            <SelectCalendarStartDateModal />
          </MemoViewerScheduleItemContainer>
          {(isEdit || endDate) && (
            <MemoViewerScheduleItemContainer>
              종료
              <MemoViewerScheduleItemContent
                active={isEdit}
                onClick={() => {
                  if (!isEdit) return;
                  openSelectCalendarEndDateModal();
                }}
              >
                <input
                  type="text"
                  placeholder={formatDate(
                    (() => {
                      const date = new Date(startDate);
                      date.setHours(date.getHours() + 1);
                      return date;
                    })(),
                    '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}',
                  )}
                  value={endDate ? formatDate(endDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}') : ''}
                  readOnly
                />
                {isEdit && endDate && (
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
          )}
        </MemoViewerScheduleItemListContainer>
        <MemoViewerButton
          onClick={() => {
            if (!isEdit) {
              setIsEdit(true);
            } else {
              setIsEdit(false);
            }
          }}
        >
          {isEdit ? '확인' : '수정'}
        </MemoViewerButton>
      </MemoViewerScheduleContents>
    </MemoViewerContainer>
  );
};

export default MemoDetailSchedule;
