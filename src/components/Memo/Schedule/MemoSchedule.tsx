import styled from '@emotion/styled';
import TimeCircleSVG from '@assets/icons/time_circle.svg?react';

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

const formatDateToSchedule = (date: Date) => {
  const _month = date.getMonth() + 1;
  const _date = date.getDate();
  const _hour = date.getHours().toString().padStart(2, '0');
  const _minute = date.getMinutes().toString().padStart(2, '0');

  return `${_month}월 ${_date}일 ${_hour}:${_minute}`;
};

const MemoSchedule = ({ content }: { content: scheduleProp }) => {
  return (
    <MemoFlexContainer>
      <MemoMainText>{content.title}</MemoMainText>
      <MemoScheduleContainer>
        <TimeCircleSVG />
        {formatDateToSchedule(content.startDate)}
      </MemoScheduleContainer>
    </MemoFlexContainer>
  );
};

export default MemoSchedule;
