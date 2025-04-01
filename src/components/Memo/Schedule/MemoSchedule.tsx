import styled from '@emotion/styled';
import TimeCircleSVG from '@assets/icons/time_circle.svg?react';
import formatDate from '@utils/Date';
import useModal from '@hooks/useModal';
import ScheduleModal from '@components/Modal/ScheduleModal';

const MemoFlexContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: '#EAF2FE',
  cursor: 'pointer',
});

interface scheduleProp {
  title: string;
  startDate: Date;
  endDate: Date | null;
}

const MemoScheduleContainer = styled.div({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  margin: '0',
  color: '#171719',
  fontSize: '15px',
  fontWeight: '500',
});

const MemoMainText = styled.p({
  margin: '0',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: '15px',
  fontWeight: '500',
  padding: '8px 16px',
  background: '#0054D1',
  textAlign: 'start',
});

const MemoSchedule = ({ content }: { content: scheduleProp }) => {
  const [AboutScheduleModal, openAboutScheduleModal] = useModal(ScheduleModal, [], { schedule: content });

  return (
    <>
      <AboutScheduleModal />
      <MemoFlexContainer onClick={openAboutScheduleModal}>
        <MemoMainText>{content.title}</MemoMainText>
        <MemoScheduleContainer>
          <TimeCircleSVG />
          {formatDate(content.startDate, '{M}월 {D}일 {hh}:{mm}')}
        </MemoScheduleContainer>
      </MemoFlexContainer>
    </>
  );
};

export default MemoSchedule;
