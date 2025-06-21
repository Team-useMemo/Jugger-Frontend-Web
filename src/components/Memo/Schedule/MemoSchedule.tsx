import { setModalOpen } from '@stores/modules/modal';
import { scheduleProp } from '@ts/Memo.Prop';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useAppDispatch } from '@hooks/useRedux';
import TimeCircleSVG from '@assets/icons/time_circle.svg?react';
import { MemoMainText, MemoScheduleContainer, MemoScheduleContents } from './MemoSchedule.Style';

const MemoSchedule = ({ content }: { content: scheduleProp }) => {
  const dispatch = useAppDispatch();

  const openDetailScheduleMemoModal = () => {
    dispatch(
      setModalOpen({
        name: ModalName.detailScheduleMemo,
        value: { content },
      }),
    );
  };

  return (
    <MemoScheduleContainer onClick={openDetailScheduleMemoModal}>
      <MemoMainText>{content.title}</MemoMainText>
      <MemoScheduleContents>
        <TimeCircleSVG />
        {formatDate(content.startDate, '{M}월 {D}일 {hh}:{mm}')}
      </MemoScheduleContents>
    </MemoScheduleContainer>
  );
};

export default MemoSchedule;
