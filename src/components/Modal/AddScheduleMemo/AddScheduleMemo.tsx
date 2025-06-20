import styled from '@emotion/styled';
import { usePostCalendarMutation } from '@stores/modules/memo';
import { setModalClose, setModalReplace, setModalValue } from '@stores/modules/modal';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { ValidationItem, isValidFields, validateFields } from '@utils/Vaildate';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import { media, theme } from '@styles/theme';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import { DefaultModalContainer, DefaultModalHeader, DefaultModalLayout } from '../DefaultModal.Style';
import CalendarView from '../MemoViewer/Schedule/CalendarView/CalendarView';

const AddScheduleMemo = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isEdit = !!props;
  const { content } = props ?? {};

  const [title, setTitle] = useState<string>(content?.title ?? '');
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
    if (!validateFields(validateList, setErrors)) return;
    //나중에 API 추가해야 함
    dispatch(
      setModalClose({
        name: ModalName.editScheduleMemo,
      }),
    );
    dispatch(
      setModalValue({
        name: ModalName.detailScheduleMemo,
        value: {
          content: {
            title: title.trim(),
            startDate: startDate,
            endDate: endDate,
          },
        },
      }),
    );
  };

  const startDatePlaceholder = new Date(new Date().setHours(9, 0));
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

  const toFormattedDate = (date: Date | null) => {
    if (!date) return '';
    return formatDate(date, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}');
  };

  const [isOpenCalendar, setIsOpenCalendar] = useState<'startDate' | 'endDate' | null>(null);

  const handleToggleCalendar = (key: 'startDate' | 'endDate' | null) => {
    if (key == 'startDate' && !startDate) setStartDate(startDatePlaceholder);
    if (key == 'endDate' && !endDate) setEndDate(endDatePlaceholder);
    setIsOpenCalendar((prev) => (prev == key ? null : key));
  };

  const calendars = [
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

  const handleCloseUpdate = () => {
    dispatch(
      setModalReplace({
        prev: ModalName.editScheduleMemo,
        to: ModalName.detailScheduleMemo,
        value: content,
        replace: true,
      }),
    );
  };

  return (
    <DefaultModalLayout>
      <DefaultModalContainer ref={modalRef} maxWidth="440px">
        {!isMobile ? (
          <CloseSVG onClick={closeModal} />
        ) : (
          <DefaultModalHeader>
            <CloseSVG onClick={!isEdit ? closeModal : handleCloseUpdate} />
            <span className="grow" />
            <p onClick={!isEdit ? handleAddSchedule : handleUpdateSchedule}>{!isEdit ? '추가' : '수정'}</p>
          </DefaultModalHeader>
        )}
        <AddScheduleMemoContainer>
          {!isMobile && (!isEdit ? '일정 추가' : '일정 수정')}
          <AddScheduleMemoContents>
            <AddScheduleMemoItemContainer>
              일정 제목
              <AddScheduleMemoItemContents>
                <input type="text" placeholder="입력" value={title} onChange={handleTitleChange} />
                {title && <EndContainerSVG onClick={handleTitleReset} />}
              </AddScheduleMemoItemContents>
              {isMobile && <AddScheduleMemoItemErrorText>{errors.title}</AddScheduleMemoItemErrorText>}
            </AddScheduleMemoItemContainer>
            {calendars.map((e) => (
              <AddScheduleMemoItemContainer key={`SCHEDULE_MEMO_CALENDAR_${e.key}`}>
                {e.title}
                {!(isOpenCalendar == e.key) ? (
                  <AddScheduleMemoItemButton
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
                {isMobile && <AddScheduleMemoItemErrorText>{errors[e.key]}</AddScheduleMemoItemErrorText>}
              </AddScheduleMemoItemContainer>
            ))}
          </AddScheduleMemoContents>
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
        </AddScheduleMemoContainer>
      </DefaultModalContainer>
    </DefaultModalLayout>
  );
};

const AddScheduleMemoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  textAlign: 'left',

  ...theme.font.title3.bold,
  color: theme.color.text.onView,

  overflowY: 'hidden',
});

const AddScheduleMemoContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  overflowX: 'visible',
  flexGrow: '1',

  ['::-webkit-scrollbar']: {
    display: 'none',
  },
  [media[480]]: {
    padding: '20px 20px 32px',
  },
});

const AddScheduleMemoItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ...theme.font.body1normal.semibold,
  color: theme.color.text.onView,
});

const AddScheduleMemoItemContents = styled.label({
  display: 'flex',
  padding: '11px 14px',
  alignItems: 'center',
  background: theme.color.background.alternative,
  borderRadius: theme.radius[6],
  gap: '4px',

  ['>input']: {
    background: 'transparent',
    border: 'none',
    flexGrow: '1',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },

    ['&[readonly]']: {
      cursor: 'pointer',
    },
  },

  ['>svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    flexShrink: '0',
  },

  [':has(>input:focus)']: {
    outline: `2px solid ${theme.color.primary.normal}`,
    outlineOffset: '-2px',
  },

  [':has(>input[readonly])']: {
    cursor: 'pointer',
  },
});

const AddScheduleMemoItemButton = styled.input({
  display: 'flex',
  padding: '11px 14px',
  alignItems: 'center',
  background: theme.color.background.alternative,
  borderRadius: theme.radius[6],
  border: 'none',
  flexGrow: '1',

  ...theme.font.body1normal.medium,
  color: theme.color.label.normal,

  [':focus']: {
    outline: 'none',
  },

  ['::placeholder']: {
    color: theme.color.label.alternative,
  },

  ['&[readonly]']: {
    cursor: 'pointer',
  },
});

const AddScheduleMemoItemErrorText = styled.p({
  ...theme.font.caption1.medium,
  color: theme.color.status.error,
  margin: '0',
});

export default AddScheduleMemo;
