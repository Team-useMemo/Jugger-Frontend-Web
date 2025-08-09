import { setModalReplace } from '@stores/modules/modal';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import AlarmSVG from '@assets/icons/alarm.svg?react';
import ClockSVG from '@assets/icons/clock.svg?react';
import CloseSVG from '@assets/icons/close.svg?react';
import HistorySVG from '@assets/icons/history.svg?react';
import LocationSVG from '@assets/icons/location.svg?react';
import { MemoDetailContainer, MemoDetailLayout } from '../MemoDetail.Style';
import {
  MemoDetailScheduleButtonContainer,
  MemoDetailScheduleContainer,
  MemoDetailScheduleContents,
  MemoDetailScheduleItemContainer,
  MemoDetailScheduleItemContents,
  MemoDetailScheduleTitleContainer,
} from './MemoDetailSchedule.Style';

const MemoDetailSchedule = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const { content, chatId } = props ?? {};
  console.log(content);
  const { title, startDate, endDate, place, alarm, description } = content ?? {};

  const handleClickUpdateSchedule = () => {
    dispatch(
      setModalReplace({
        prev: ModalName.detailScheduleMemo,
        to: ModalName.editScheduleMemo,
        value: {
          chatId: chatId,
          content: content,
        },
      }),
    );
  };

  const itemList = [
    {
      key: 'time',
      svg: <ClockSVG />,
      text: `${formatDate(startDate, '{YY}.{MM}.{DD} {APe} {APh}:{mm}')}${endDate ? ` - ${formatDate(endDate, '{YY}.{MM}.{DD} {APe} {APh}:{mm}')}` : ''}`,
    },
    {
      key: 'place',
      svg: <LocationSVG />,
      text: place,
    },
    {
      key: 'alarm',
      svg: <AlarmSVG />,
      text: alarm?.text,
    },
    {
      key: 'description',
      svg: <HistorySVG />,
      text: description,
    },
  ];

  return (
    <MemoDetailLayout>
      <MemoDetailContainer ref={modalRef}>
        {!isMobile && <CloseSVG onClick={closeModal} />}
        <MemoDetailScheduleContainer>
          <MemoDetailScheduleContents>
            <MemoDetailScheduleTitleContainer>
              <p>{title}</p>
            </MemoDetailScheduleTitleContainer>
            <MemoDetailScheduleItemContainer>
              {itemList.map(
                (e) =>
                  e.text && (
                    <MemoDetailScheduleItemContents>
                      {e.svg}
                      <p>{e.text}</p>
                    </MemoDetailScheduleItemContents>
                  ),
              )}
            </MemoDetailScheduleItemContainer>
          </MemoDetailScheduleContents>
          <MemoDetailScheduleButtonContainer>
            {isMobile && (
              <JuggerButton color="secondary" size={!isMobile ? 'medium' : 'small'} onClick={closeModal}>
                닫기
              </JuggerButton>
            )}
            <JuggerButton color="primary" size={!isMobile ? 'medium' : 'small'} onClick={handleClickUpdateSchedule}>
              수정
            </JuggerButton>
          </MemoDetailScheduleButtonContainer>
        </MemoDetailScheduleContainer>
      </MemoDetailContainer>
    </MemoDetailLayout>
  );
};

export default MemoDetailSchedule;
