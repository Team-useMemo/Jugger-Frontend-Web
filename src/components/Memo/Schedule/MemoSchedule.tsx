import TimeCircleSVG from '@assets/icons/time_circle.svg?react';
import formatDate from '@utils/Date';
import useModal from '@hooks/useModal';
import { scheduleProp } from '@ts/Memo.Prop';
import { MemoMainText, MemoScheduleContainer, MemoScheduleContents } from './MemoSchedule.Style';
import MemoDetailSchedule from '@components/Modal/MemoViewer/Schedule/MemoViewerSchedule';

const MemoSchedule = ({ content }: { content: scheduleProp }) => {
  const [MemoDetailScheduleModal, openMemoDetailScheduleModal] = useModal(MemoDetailSchedule, [], {
    schedule: content,
  });

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
