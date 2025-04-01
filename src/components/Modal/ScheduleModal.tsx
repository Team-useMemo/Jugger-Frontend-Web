import styled from '@emotion/styled';
import { useState } from 'react';
import CloseSVG from '@assets/icons/close.svg?react';
import EndContainerSVG from '@assets/icons/end_containersvg.svg?react';
import formatDate from '@utils/Date';
import { MemoModalCloseContainer, MemoModalContainer } from './Modal.Style';

const ScheduleModalButton = styled.button({
  background: '#0054D1',
  width: '100%',
  fontSize: '18px',
  color: 'white',
  fontWeight: '500',
  lineHeight: '1.45',
  borderRadius: '6px',
  padding: '12px',
  boxSizing: 'border-box',
  margin: '0',
  textAlign: 'center',

  [':focus']: {
    outline: 'none',
  },
});

const ScheduleModalContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  padding: '0 32px',
  width: '450px',
  boxSizing: 'border-box',
  textAlign: 'left',
});

const ScheduleModalTitle = styled.p({
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.36',
  margin: '0',
});

const ScheduleModalItemList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const ScheduleModalItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const ScheduleModalItemTitle = styled.p({
  margin: '0',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.5',
});

const ScheduleModalItemContent = styled.div({
  boxSizing: 'border-box',
  background: '#F7F7F8',
  padding: '11px 14px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',

  ['>p,>input']: {
    background: 'none',
    outline: 'none',
    border: 'none',
    margin: '0',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '1.5',
    width: '100%',
    color: '#171719',
  },
});

const ScheduleModal = ({
  closeModal,
  actions,
  props,
}: {
  closeModal: () => void;
  actions: ((...args: any[]) => void)[];
  props: any;
}) => {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState(props.add);

  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setMinutes(0);
    return date;
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMinutes(0);
    date.setHours(date.getHours() + 1);
    return date;
  });

  // props.add = true;

  return (
    <MemoModalContainer>
      <MemoModalCloseContainer>
        <CloseSVG onClick={closeModal} />
      </MemoModalCloseContainer>
      <ScheduleModalContents>
        {mode ? (
          <>
            <ScheduleModalTitle>일정 추가</ScheduleModalTitle>
            <ScheduleModalItemList>
              <ScheduleModalItem>
                <ScheduleModalItemTitle>일정 제목</ScheduleModalItemTitle>
                <ScheduleModalItemContent>
                  <input
                    type="text"
                    placeholder="입력"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  {title && (
                    <EndContainerSVG
                      onClick={() => {
                        setTitle('');
                      }}
                    />
                  )}
                </ScheduleModalItemContent>
              </ScheduleModalItem>

              <ScheduleModalItem>
                <ScheduleModalItemTitle>시작</ScheduleModalItemTitle>
                <ScheduleModalItemContent>
                  <p>{formatDate(startDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
                </ScheduleModalItemContent>
              </ScheduleModalItem>
              <ScheduleModalItem>
                <ScheduleModalItemTitle>종료</ScheduleModalItemTitle>
                <ScheduleModalItemContent>
                  <p>{formatDate(endDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
                </ScheduleModalItemContent>
              </ScheduleModalItem>
            </ScheduleModalItemList>
            {!!title.trim() && (
              <ScheduleModalButton
                onClick={() => {
                  if (!title.trim()) return;

                  actions[0](title, startDate, endDate);
                  closeModal();
                }}
              >
                추가
              </ScheduleModalButton>
            )}
          </>
        ) : (
          <>
            <ScheduleModalTitle>4월</ScheduleModalTitle>
            <ScheduleModalItemList>
              <ScheduleModalItem>
                <ScheduleModalItemTitle>일정 제목</ScheduleModalItemTitle>
                <ScheduleModalItemContent>
                  <p>{props.schedule.title}</p>
                </ScheduleModalItemContent>
              </ScheduleModalItem>

              <ScheduleModalItem>
                <ScheduleModalItemTitle>시작</ScheduleModalItemTitle>
                <ScheduleModalItemContent>
                  <p>{formatDate(props.schedule.startDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
                </ScheduleModalItemContent>
              </ScheduleModalItem>
              {props.schedule.endDate && (
                <ScheduleModalItem>
                  <ScheduleModalItemTitle>종료</ScheduleModalItemTitle>
                  <ScheduleModalItemContent>
                    <p>{formatDate(props.schedule.endDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
                  </ScheduleModalItemContent>
                </ScheduleModalItem>
              )}
            </ScheduleModalItemList>
            <ScheduleModalButton
              onClick={() => {
                setMode(true);
                setTitle(props.schedule.title);
                setStartDate(props.schedule.startDate);
                if (props.schedule.endDate) {
                  setEndDate(props.schedule.endDate);
                } else {
                  const date = new Date(props.schedule.startDate);
                  date.setHours(date.getHours() + 1);
                  setEndDate(date);
                }
              }}
            >
              수정
            </ScheduleModalButton>
          </>
        )}
      </ScheduleModalContents>
    </MemoModalContainer>
  );
};

export default ScheduleModal;
