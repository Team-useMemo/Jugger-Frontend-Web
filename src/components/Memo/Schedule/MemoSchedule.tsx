import TimeCircleSVG from '@assets/icons/time_circle.svg?react';
import useModal from '@hooks/useModal';
import { scheduleProp } from '@ts/Memo.Prop';
import { MemoMainText, MemoScheduleContainer, MemoScheduleContents } from './MemoSchedule.Style';
import MemoDetailSchedule from '@components/Modal/MemoViewer/Schedule/MemoDetailSchedule';
import { formatDate } from '@utils/Date';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import { useState } from 'react';

const MemoSchedule = ({ memoId, content }: { memoId: number; content: scheduleProp }) => {
  const [modalProp] = useState({
    isEdit: false,
    title: content.title,
    startDate: content.startDate,
    endDate: content.endDate,
  });

  const [MemoDetailScheduleModal, openMemoDetailScheduleModal] = useModal(
    `memoSchedule_${memoId}`,
    FullScreenGray,
    MemoDetailSchedule,
    [],
    modalProp,
  );

  return (
    <>
      <MemoDetailScheduleModal />
      <MemoScheduleContainer onClick={openMemoDetailScheduleModal}>
        <MemoMainText>{content.title}</MemoMainText>
        <MemoScheduleContents>
          <TimeCircleSVG />
          {formatDate(content.startDate, '{M}월 {D}일 {hh}:{mm}')}
        </MemoScheduleContents>
      </MemoScheduleContainer>
    </>
  );
};

export default MemoSchedule;
