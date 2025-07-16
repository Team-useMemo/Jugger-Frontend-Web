import styled from '@emotion/styled';
import { usePostCalendarMutation, usePutCalendarMutation } from '@stores/modules/memo';
import { setModalClose } from '@stores/modules/modal';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { scheduleAlarms } from '@ts/Memo.Prop';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { ValidationItem, isValidFields, validateFields } from '@utils/Vaildate';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import { theme } from '@styles/theme';
import AlarmSVG from '@assets/icons/alarm.svg?react';
import ClockSVG from '@assets/icons/clock.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import HistorySVG from '@assets/icons/history.svg?react';
import LocationSVG from '@assets/icons/location.svg?react';
import { DefaultModalContainer, DefaultModalHeader, DefaultModalLayout } from '../../DefaultModal.Style';
import CalendarView from './CalendarView/CalendarView';
import {
  MemoEditorScheduleContainer,
  MemoEditorScheduleContents,
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
          alarm: alarm
            ? new Date(
                (() => {
                  const date = new Date(startDate);
                  date.setMinutes(date.getMinutes() - alarm.minute);
                  return date;
                })(),
              ).toISOString()
            : '',
          startTime: startDate.toISOString(),
          endTime: endDate?.toISOString(),
          categoryId: currentCategory || undefined,
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
          alarm: alarm
            ? new Date(
                (() => {
                  const date = new Date(startDate);
                  date.setMinutes(date.getMinutes() - alarm.minute);
                  return date;
                })(),
              ).toISOString()
            : '',
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
  const endDatePlaceholder = ((date: Date) => new Date(date.setHours(date.getHours() + 1)))(
    new Date(startDate ?? startDatePlaceholder),
  );

  const isMobile = useIsMobile();

  const scheduleItemList = [
    {
      title: '일정 제목',
      essential: true,
      content: (
        <MemoEditorScheduleItemInput type="text" placeholder="제목" state={title} setState={setTitle} resetable />
      ),
      error: errors.title,
    },
    {
      title: '시간',
      essential: true,
      icon: <ClockSVG />,
      content: (
        <>
          <MemoEditorScheduleItemInput
            type="calendar"
            placeholder="시작 날짜 및 시간 *"
            state={startDate}
            setState={setStartDate}
            initialDate={startDatePlaceholder}
          />
          <MemoEditorScheduleItemInput
            type="calendar"
            placeholder="종료 날짜 및 시간"
            state={endDate}
            setState={setEndDate}
            initialDate={endDatePlaceholder}
            resetable
          />
        </>
      ),
      error: errors.startDate || errors.endDate,
    },
    {
      icon: <LocationSVG />,
      content: (
        <MemoEditorScheduleItemInput
          type="text"
          placeholder="장소를 입력해주세요"
          state={place}
          setState={setPlace}
          resetable
        />
      ),
    },
    {
      icon: <AlarmSVG />,
      content: (
        <MemoEditorScheduleItemInput
          type="alarm"
          placeholder="알림을 설정해주세요"
          state={alarm}
          setState={setAlarm}
          initialDate={scheduleAlarms[0]}
          resetable
        />
      ),
    },
    {
      icon: <HistorySVG />,
      content: (
        <MemoEditorScheduleItemInput
          type="text"
          placeholder="설명을 적어주세요"
          state={description}
          setState={setDescription}
          resetable
        />
      ),
    },
  ];

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
            {scheduleItemList.map((e, i) => (
              <MemoEditorScheduleItem key={i} item={e} />
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

const MemoEditorScheduleItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  position: 'relative',
});

const MemoEditorScheduleItemTitle = styled.p({
  ...theme.font.body1normal.semibold,
  color: theme.color.label.normal,
  margin: '0',

  ['>span.essential']: {
    color: theme.color.primary.normal,
  },
});

const MemoEditorScheduleItemContents = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  ['>svg']: {
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
    stroke: theme.color.label.normal,
    flexShrink: '0',
  },
});

const MemoEditorScheduleItemInputContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0px',
  borderBottom: `1.5px solid ${theme.color.line.neutral}`,
  boxSizing: 'border-box',
  gap: '4px',
  width: '100%',
  minWidth: '0',

  ['>input']: {
    background: 'none',
    border: 'none',
    outline: 'none',
    flexGrow: '1',
    minWidth: '0',

    ...theme.font.body1normal.medium,
    color: theme.color.label.normal,
    ['::placeholder']: {
      color: theme.color.label.alternative,
    },
  },

  [':has(>input:focus)']: {
    borderBottom: `1px solid ${theme.color.primary.normal}`,
  },

  ['>svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    flexShrink: '0',
  },
});

const MemoEditorScheduleItemInput = ({
  type,
  placeholder,
  state,
  setState,
  initialDate,
  resetable,
}: {
  type: 'text' | 'calendar' | 'alarm';
  placeholder: string;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  initialDate?: any;
  resetable?: true;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleResetState = () => {
    setState(type === 'text' ? '' : null);
  };

  const value =
    type === 'calendar'
      ? formatDate(state, '{YY}.{MM}.{DD} {APe} {APh}:{mm}')
      : type === 'alarm'
        ? (state?.text ?? '')
        : state;

  const handleClickInput = () => {
    if (type === 'text') return;
    setIsOpenMenu(true);
    if (state) return;
    setState(initialDate);
  };

  const handleCloseItemMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <MemoEditorScheduleItemInputContainer>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChangeState}
        readOnly={type !== 'text'}
        onClick={handleClickInput}
      />
      {resetable && state && <EndContainerSVG onClick={handleResetState} />}
      {type === 'calendar' && state && isOpenMenu && (
        <CalendarView date={state} setDate={setState} closeCalendar={handleCloseItemMenu} />
      )}
      {type === 'alarm' && isOpenMenu && (
        <MemoEditorSchduleAlarmMenu setAlarm={setState} closeMenu={handleCloseItemMenu} />
      )}
    </MemoEditorScheduleItemInputContainer>
  );
};

const MemoEditorSchduleAlarmMenu = ({
  setAlarm,
  closeMenu,
}: {
  setAlarm: React.Dispatch<React.SetStateAction<any>>;
  closeMenu: () => void;
}) => {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      const container = containerRef.current;
      if (!container || container.contains(e.target as Node)) return;

      closeMenu();
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <MemoEditorSchduleAlarmMenuListContainer ref={containerRef}>
      {scheduleAlarms.map((e) => {
        return (
          <li
            onClick={() => {
              setAlarm(e);
              closeMenu();
            }}
          >
            {e.text}
          </li>
        );
      })}
    </MemoEditorSchduleAlarmMenuListContainer>
  );
};

const MemoEditorSchduleAlarmMenuListContainer = styled.ul({
  position: 'absolute',
  top: 'calc(100% + 14px)',
  background: 'white',
  padding: '12px 8px',
  zIndex: '1',
  boxShadow: theme.shadow.strong,
  borderRadius: theme.radius[12],
  width: '160px',
  margin: '0',
  listStyle: 'none',

  ['>li']: {
    padding: '6px 8px',
    ...theme.font.body2normal.semibold,
    color: theme.color.label.normal,

    [':hover']: {
      background: theme.color.fill.normal,
    },
  },
});

const MemoEditorScheduleItem = ({ item }: { item: any }) => {
  const { title, essential, icon, content, error } = item;

  return (
    <MemoEditorScheduleItemContainer>
      {title && (
        <MemoEditorScheduleItemTitle>
          {title} {essential && <span className="essential">*</span>}
        </MemoEditorScheduleItemTitle>
      )}
      <MemoEditorScheduleItemContents>
        {icon}
        {content}
      </MemoEditorScheduleItemContents>
      {error && <MemoEditorScheduleItemErrorText>{error}</MemoEditorScheduleItemErrorText>}
    </MemoEditorScheduleItemContainer>
  );
};

export default MemoEditorSchedule;
