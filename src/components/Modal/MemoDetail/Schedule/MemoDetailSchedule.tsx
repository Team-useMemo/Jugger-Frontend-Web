import { setModalReplace } from '@stores/modules/modal';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import CloseSVG from '@assets/icons/close.svg?react';
import { MemoDetailContainer, MemoDetailLayout } from '../MemoDetail.Style';
import {
  MemoDetailScheduleContainer,
  MemoDetailScheduleContents,
  MemoDetailScheduleItemContainer,
} from './MemoDetailSchedule.Style';

const MemoDetailSchedule = ({ closeModal, props, modalRef }: ModalComponentProps) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const { content } = props ?? {};
  const { title, startDate, endDate } = content ?? {};

  const handleClickUpdateSchedule = () => {
    dispatch(
      setModalReplace({
        prev: ModalName.detailScheduleMemo,
        to: ModalName.editScheduleMemo,
        value: { content },
      }),
    );
  };

  return (
    <MemoDetailLayout>
      <MemoDetailContainer ref={modalRef}>
        <CloseSVG onClick={closeModal} />
        <MemoDetailScheduleContainer>
          <MemoDetailScheduleContents>
            {title && (
              <MemoDetailScheduleItemContainer>
                일정 제목
                <p>{title}</p>
              </MemoDetailScheduleItemContainer>
            )}
            {startDate && (
              <MemoDetailScheduleItemContainer>
                시작 날짜
                <p>{formatDate(startDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
              </MemoDetailScheduleItemContainer>
            )}
            {endDate && (
              <MemoDetailScheduleItemContainer>
                종료 날짜
                <p>{formatDate(endDate, '{YYYY}.{MM}.{DD} {AP} {APh}:{mm}')}</p>
              </MemoDetailScheduleItemContainer>
            )}
          </MemoDetailScheduleContents>
          <JuggerButton color="primary" size={!isMobile ? 'medium' : 'small'} onClick={handleClickUpdateSchedule}>
            수정
          </JuggerButton>
        </MemoDetailScheduleContainer>
      </MemoDetailContainer>
    </MemoDetailLayout>
  );
};

export default MemoDetailSchedule;
