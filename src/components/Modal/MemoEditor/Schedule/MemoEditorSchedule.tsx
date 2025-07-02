import { usePostCalendarMutation, usePutCalendarMutation } from '@stores/modules/memo';
import { setModalClose } from '@stores/modules/modal';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { ValidationItem, isValidFields, validateFields } from '@utils/Vaildate';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { DefaultModalContainer, DefaultModalHeader, DefaultModalLayout } from '../../DefaultModal.Style';
import CalendarView from './CalendarView/CalendarView';
import {
  MemoEditorScheduleContainer,
  MemoEditorScheduleContents,
  MemoEditorScheduleItemButton,
  MemoEditorScheduleItemContainer,
  MemoEditorScheduleItemContents,
  MemoEditorScheduleItemErrorText,
} from './MemoEditorSchedule.Style';

const MemoEditorSchedule = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isEdit = !!props;
  const { content, chatId } = props ?? {};
  const [title, setTitle] = useState<string>(content?.title ?? '');
  const [place, setPlace] = useState<string>(content?.place ?? '');
  const [description, setDescription] = useState<string>(content?.description ?? '');
  const [alarm, setAlarm] = useState<Date | null>(content?.alarm);
  const [startDate, setStartDate] = useState<Date | null>(content?.startDate);
  const [endDate, setEndDate] = useState<Date | null>(content?.endDate);
  const [errors, setErrors] = useState<any>({
    title: '',
    startDate: '',
    endDate: '',
  });

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  const [postCalendar] = usePostCalendarMutation();
  const [putCalendar] = usePutCalendarMutation();

  const validateList: ValidationItem[] = [
    {
      key: 'title',
      message: '일정 제목을 입력해주세요.',
      isValid: title.trim() != '',
    },
    {
      key: 'startDate',
      message: '시작 날짜를 선택해주세요.',
      isValid: !!startDate,
    },
    {
      key: 'endDate',
      message: '종료 날짜는 시작 날짜 이후여야 합니다.',
      isValid: !startDate || (endDate?.getTime() ?? Infinity) > startDate.getTime(),
    },
    {
      key: 'endDate',
      message: '변경사항이 없습니다.',
      isValid:
        !isEdit ||
        title.trim() != (content?.title ?? '').trim() ||
        place.trim() != (content?.place ?? '').trim() ||
        description.trim() != (content?.description ?? '').trim() ||
        alarm?.toDateString() != content?.alarm?.toDateString() ||
        startDate?.toDateString() != content?.startDate?.toDateString() ||
        endDate?.toDateString() != content?.endDate?.toDateString(),
    },
  ];

  const isScheduleValidate = isValidFields(validateList);

  const handleAddSchedule = () => {
    if (!validateFields(validateList, setErrors) || !startDate) return;

    (async () => {
      try {
        await postCalendar({
          name: title.trim(),
          place: place.trim(),
          description: description.trim(),
          alarm: alarm?.toISOString(),
          startTime: startDate.toISOString(),
          endTime: endDate?.toISOString(),
          categoryId: currentCategory || '',
        }).unwrap();

        closeModal?.();
      } catch (error) {
        console.error('메모 전송 실패:', error);
      }
    })();
  };

  const dispatch = useAppDispatch();

  const handleUpdateSchedule = () => {
    if (!validateFields(validateList, setErrors) || !startDate) return;
    //나중에 API 추가해야 함

    (async () => {
      try {
        await putCalendar({
          name: title.trim(),
          place: place.trim(),
          description: description.trim(),
          alarm: alarm?.toISOString(),
          startTime: startDate.toISOString(),
          endTime: endDate?.toISOString(),
          categoryId: currentCategory || '',
          chatId: chatId || '',
        }).unwrap();

        closeModal?.();
      } catch (error) {
        console.error('메모 전송 실패:', error);
      }
    })();

    dispatch(
      setModalClose({
        name: ModalName.editScheduleMemo,
        set: {
          prev: ModalName.detailScheduleMemo,
          value: {
            content: {
              title: title.trim(),
              place: place.trim(),
              description: description.trim(),
              alarm: alarm,
              startDate: startDate,
              endDate: endDate,
              categoryId: currentCategory || '',
            },
          },
        },
      }),
    );
  };

  const startDatePlaceholder = new Date(new Date().setHours(9, 0));
  const alarmPlaceholder = startDatePlaceholder;
  const endDatePlaceholder = ((date: Date) => new Date(date.setHours(date.getHours() + 1)))(

    new Date(startDate ?? startDatePlaceholder),
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleReset = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setTitle('');
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handlePlaceReset = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setPlace('');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionReset = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setDescription('');
  };



  const toFormattedDate = (date: Date | null) => {
    if (!date) return '';
    return formatDate(date, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}');
  };

  const [isOpenCalendar, setIsOpenCalendar] = useState<'alarmDate' | 'startDate' | 'endDate' | null>(null);

  const handleToggleCalendar = (key: 'alarmDate' | 'startDate' | 'endDate' | null) => {
    if (key == 'alarmDate' && !startDate) setAlarm(alarmPlaceholder);
    if (key == 'startDate' && !startDate) setStartDate(startDatePlaceholder);
    if (key == 'endDate' && !endDate) setEndDate(endDatePlaceholder);
    setIsOpenCalendar((prev) => (prev == key ? null : key));
  };

  const calendars = [
    {
      key: 'alarmDate',
      title: '알림 시각',
      placeholder: alarmPlaceholder,
      date: alarm,
      setDate: setAlarm,
      onClick: () => {
        handleToggleCalendar('alarmDate');
      },
    },
    {
      key: 'startDate',
      title: '시작',
      placeholder: startDatePlaceholder,
      date: startDate,
      setDate: setStartDate,
      onClick: () => {
        handleToggleCalendar('startDate');
      },
    },
    {
      key: 'endDate',
      title: '종료',
      placeholder: endDatePlaceholder,
      date: endDate,
      setDate: setEndDate,
      onClick: () => {
        handleToggleCalendar('endDate');
      },
    },
  ];

  const isMobile = useIsMobile();

  return (
    <DefaultModalLayout>
      <DefaultModalContainer ref={modalRef} maxWidth="440px">
        {!isMobile ? (
          <CloseSVG onClick={closeModal} />
        ) : (
          <DefaultModalHeader>
            <CloseSVG onClick={closeModal} />
            <span className="grow" />
            <p onClick={!isEdit ? handleAddSchedule : handleUpdateSchedule}>{!isEdit ? '추가' : '수정'}</p>
          </DefaultModalHeader>
        )}
        <MemoEditorScheduleContainer>
          {!isMobile && (!isEdit ? '일정 추가' : '일정 수정')}
          <MemoEditorScheduleContents>
            <MemoEditorScheduleItemContainer>
              일정 제목
              <MemoEditorScheduleItemContents>
                <input type="text" placeholder="입력" value={title} onChange={handleTitleChange} />
                {title && <EndContainerSVG onClick={handleTitleReset} />}
              </MemoEditorScheduleItemContents>
              장소
              <MemoEditorScheduleItemContents>
                <input type="text" placeholder="입력" value={place} onChange={handlePlaceChange} />
                {place && <EndContainerSVG onClick={handlePlaceReset} />}
              </MemoEditorScheduleItemContents>
              설명
              <MemoEditorScheduleItemContents>
                <input type="text" placeholder="입력" value={description} onChange={handleDescriptionChange} />
                {description && <EndContainerSVG onClick={handleDescriptionReset} />}
              </MemoEditorScheduleItemContents>
              {isMobile && <MemoEditorScheduleItemErrorText>{errors.title}</MemoEditorScheduleItemErrorText>}
            </MemoEditorScheduleItemContainer>
            {calendars.map((e) => (
              <MemoEditorScheduleItemContainer key={`SCHEDULE_MEMO_CALENDAR_${e.key}`}>
                {e.title}
                {!(isOpenCalendar == e.key) ? (
                  <MemoEditorScheduleItemButton
                    type="text"
                    placeholder={toFormattedDate(e.placeholder)}
                    value={toFormattedDate(e.date)}
                    readOnly
                    onFocus={() => {
                      e.onClick();
                    }}
                  />
                ) : (
                  <CalendarView date={e.date} setDate={e.setDate} closeCalendar={e.onClick} />
                )}

                {isMobile && <MemoEditorScheduleItemErrorText>{errors[e.key]}</MemoEditorScheduleItemErrorText>}
              </MemoEditorScheduleItemContainer>
            ))}
          </MemoEditorScheduleContents>
          {!isMobile && (
            <JuggerButton
              color="primary"
              size="medium"
              disabled={!isScheduleValidate}
              onClick={!isEdit ? handleAddSchedule : handleUpdateSchedule}
            >
              {!isEdit ? '추가' : '수정'}
            </JuggerButton>
          )}
        </MemoEditorScheduleContainer>
      </DefaultModalContainer>
    </DefaultModalLayout>
  );
};

export default MemoEditorSchedule;
