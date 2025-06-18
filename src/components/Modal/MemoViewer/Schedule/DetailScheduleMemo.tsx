// import { usePostCalendarMutation } from '@stores/modules/memo';
import { useEffect, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { MemoViewerContainer, MemoViewerContents } from '../MemoViewer.Style';
import CalendarView from './CalendarView/CalendarView';
import {
  ViewerScheduleMemoContainer,
  ViewerScheduleMemoItemContainer,
  ViewerScheduleMemoItemContents,
  ViewerScheduleMemoItemInput,
  ViewerScheduleMemoItemTitle,
} from './ViewerScheduleMemo.Style';

const DetailScheduleMemo = ({ closeModal, props }: ModalComponentProps) => {
  const [title, setTitle] = useState<string>(props.title);
  const [startDate, setStartDate] = useState<Date | null>(props.startDate);
  const [endDate, setEndDate] = useState<Date | null>(props.endDate);
  const [isEdit, setIsEdit] = useState(false);

  const startDateCalendarRef = useRef<HTMLDivElement>(null);
  const endDateCalendarRef = useRef<HTMLDivElement>(null);

  // const [postCalendar] = usePostCalendarMutation();

  // const [searchParams] = useSearchParams();
  // const currentCategory = searchParams.get('category');

  const handleClickSend = () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    setIsEdit(false);
    // if (!startDate) return;

    // (async () => {
    //   try {
    //     await postCalendar({
    //       name: title,
    //       startTime: startDate.toISOString(),
    //       endTime: endDate?.toISOString(),
    //       categoryId: currentCategory || '',
    //     }).unwrap();

    //     closeModal();
    //   } catch (error) {
    //     console.error('메모 전송 실패:', error);
    //   }
    // })();
  };

  const startDatePlaceHolder = (() => {
    const date = new Date();
    date.setHours(9, 0);

    return date;
  })();

  const endDatePlaceHolder = (() => {
    const date = startDate ? new Date(startDate) : new Date(startDatePlaceHolder);
    date.setHours(date.getHours() + 1);

    return date;
  })();

  const toDateString = (date: Date) => {
    return formatDate(date, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleReset = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setTitle('');
  };

  const [isOpenStartDateCalendar, setIsOpenStartDateCalendar] = useState(false);
  const [isOpenEndDateCalendar, setIsOpenEndDateCalendar] = useState(false);

  const handleClickStartDate = () => {
    if (!startDate) setStartDate(startDatePlaceHolder);
    setIsOpenStartDateCalendar(true);
    setIsOpenEndDateCalendar(false);
  };

  const handleClickEndDate = () => {
    if (!endDate) setEndDate(startDatePlaceHolder);
    setEndDate(endDatePlaceHolder);
    setIsOpenEndDateCalendar(true);
    setIsOpenStartDateCalendar(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        startDateCalendarRef.current &&
        endDateCalendarRef.current &&
        !startDateCalendarRef.current.contains(e.target as Node) &&
        !endDateCalendarRef.current.contains(e.target as Node)
      ) {
        setIsOpenStartDateCalendar(false);
        setIsOpenEndDateCalendar(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <MemoViewerContainer>
      <CloseSVG onClick={closeModal} />
      <MemoViewerContents>
        <ViewerScheduleMemoContainer isDetail>
          <ViewerScheduleMemoItemContainer>
            <ViewerScheduleMemoItemContents>
              <ViewerScheduleMemoItemTitle>일정 제목</ViewerScheduleMemoItemTitle>
              <ViewerScheduleMemoItemInput>
                <input placeholder="입력" value={title} onChange={handleTitleChange} readOnly={!isEdit} />
                {title && isEdit && <EndContainerSVG onClick={handleTitleReset} />}
              </ViewerScheduleMemoItemInput>
            </ViewerScheduleMemoItemContents>
            <ViewerScheduleMemoItemContents>
              <ViewerScheduleMemoItemTitle>시작</ViewerScheduleMemoItemTitle>
              <div ref={startDateCalendarRef}>
                {isEdit && isOpenStartDateCalendar ? (
                  <CalendarView date={startDate} setDate={setStartDate} />
                ) : (
                  <ViewerScheduleMemoItemInput onClick={handleClickStartDate}>
                    <input
                      placeholder={toDateString(startDatePlaceHolder)}
                      value={startDate ? toDateString(startDate) : ''}
                      onChange={handleTitleChange}
                      readOnly
                    />
                  </ViewerScheduleMemoItemInput>
                )}
              </div>
            </ViewerScheduleMemoItemContents>
            {(isEdit || endDate) && (
              <ViewerScheduleMemoItemContents>
                <ViewerScheduleMemoItemTitle>종료</ViewerScheduleMemoItemTitle>
                <div ref={endDateCalendarRef}>
                  {isEdit && isOpenEndDateCalendar ? (
                    <CalendarView date={endDate} setDate={setEndDate} />
                  ) : (
                    <ViewerScheduleMemoItemInput onClick={handleClickEndDate}>
                      <input
                        placeholder={toDateString(endDatePlaceHolder)}
                        value={endDate ? toDateString(endDate) : ''}
                        onChange={handleTitleChange}
                        readOnly
                      />
                    </ViewerScheduleMemoItemInput>
                  )}
                </div>
              </ViewerScheduleMemoItemContents>
            )}
          </ViewerScheduleMemoItemContainer>
          <JuggerButton color="primary" size="medium" disabled={!(title && startDate)} onClick={handleClickSend}>
            {!isEdit ? '수정' : '수정 완료'}
          </JuggerButton>
        </ViewerScheduleMemoContainer>
      </MemoViewerContents>
    </MemoViewerContainer>
  );
};

export default DetailScheduleMemo;
