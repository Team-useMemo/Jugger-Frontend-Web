import styled from '@emotion/styled';
import { useState } from 'react';
import { Logout } from '@utils/Auth';
import { ModalComponentProps } from '@hooks/useParamModal';
import JuggerButton from '@components/Common/JuggerButton';
import JuggerRadioButton from '@components/Common/JuggerRadioButton';
import { theme } from '@styles/theme';
import CloseSVG from '@assets/icons/close.svg?react';

const WithdrawUserConfirmContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '36px 32px 24px',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],
});

const WithdrawUserConfirmTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.title3.bold,
      color: theme.color.label.normal,
    },
    ['&.description']: {
      ...theme.font.headline1.medium,
      color: theme.color.label.normal,
    },
  },
});

const WithdrawUserConfirmButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  width: '100%',

  ['>button']: {
    width: '100%',
  },
});

const WithdrawUserConfirm = ({ closeModal, goToNextStep }: { closeModal?: () => void; goToNextStep: () => void }) => {
  return (
    <WithdrawUserConfirmContainer>
      <WithdrawUserConfirmTextContainer>
        <p className="title">탈퇴하시겠어요?</p>
        <p className="description">
          탈퇴하시면 지금까지 저장된
          <br />
          소중한 정보들이 모두 사라져요
        </p>
      </WithdrawUserConfirmTextContainer>
      <WithdrawUserConfirmButtonContainer>
        <JuggerButton color="secondary" size="medium" onClick={closeModal}>
          닫기
        </JuggerButton>
        <JuggerButton color="error" size="medium" onClick={goToNextStep}>
          탈퇴하기
        </JuggerButton>
      </WithdrawUserConfirmButtonContainer>
    </WithdrawUserConfirmContainer>
  );
};

const WithdrawUserReasonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 32px 40px',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],

  ['>svg']: {
    marginLeft: 'auto',
  },
});

const WithdrawUserReasonTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  ['>p']: {
    margin: '0',
    textAlign: 'left',

    ['&.title']: {
      ...theme.font.title3.bold,
      color: theme.color.label.normal,
    },
    ['&.description']: {
      ...theme.font.body2normal.medium,
      color: theme.color.label.alternative,
    },
  },
});

const WithdrawUserReasonRadioContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '20px 0 36px',
});

const WithdrawUserReasonRadioItemContainer = styled.label({
  display: 'flex',
  gap: '12px',
  padding: '8px 0',

  ...theme.font.body1normal.medium,
  color: theme.color.label.normal,
});

const WithdrawUserReasonRadioETCContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  ['>textarea']: {
    width: '100%',
    height: '120px',
    background: theme.color.background.normal,
    borderColor: theme.color.line.normal,
    borderRadius: theme.radius[8],
    padding: '16px',
    boxSizing: 'border-box',
    resize: 'none',

    ...theme.font.body2reading.medium,
    color: theme.color.label.normal,

    [':disabled, :disabled::placeholder']: {
      color: theme.color.label.disable,
    },
  },
});

type ReasonCodeKey = 'NOT_USED' | 'INCONVENIENT' | 'NO_FEATURE' | 'ETC';
interface Reason {
  code: ReasonCodeKey;
  detail: string;
}

const REASON_CODE: Record<ReasonCodeKey, Reason> = {
  NOT_USED: {
    code: 'NOT_USED',
    detail: '서비스를 잘 이용하지 않아요',
  },
  INCONVENIENT: {
    code: 'INCONVENIENT',
    detail: '서비스 이용이 불편해요',
  },
  NO_FEATURE: {
    code: 'NO_FEATURE',
    detail: '필요한 기능이 없어요',
  },
  ETC: {
    code: 'ETC',
    detail: '기타',
  },
};

const WithdrawUserReason = ({
  closeModal,
  handleSubmitReason,
}: {
  closeModal?: () => void;
  handleSubmitReason: (reason: Reason) => void;
}) => {
  const [selectedReason, setSelectedReason] = useState<Reason>();
  const [customReason, setCustomReason] = useState('');

  const handleCheckReason = (reason: Reason) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    setSelectedReason(reason);
  };

  const handleChangeCustomReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomReason(e.target.value);
  };

  const isValid = selectedReason === REASON_CODE.ETC ? customReason.trim().length > 0 : !!selectedReason;

  const handleSubmit = () => {
    if (!selectedReason) return;

    if (selectedReason.code === REASON_CODE.ETC.code) {
      handleSubmitReason({
        code: selectedReason?.code,
        detail: customReason.trim(),
      });

      return;
    }
    handleSubmitReason(selectedReason);
  };

  return (
    <WithdrawUserReasonContainer>
      <CloseSVG stroke={theme.color.label.normal} onClick={closeModal} />
      <WithdrawUserReasonTextContainer>
        <p className="title">탈퇴하시는 이유를 알려주세요</p>
        <p className="description">더 나은 서비스로 돌아올게요!</p>
      </WithdrawUserReasonTextContainer>
      <WithdrawUserReasonRadioContainer>
        {Object.values(REASON_CODE).map((e, i) =>
          e.code !== REASON_CODE.ETC.code ? (
            <WithdrawUserReasonRadioItemContainer key={`WITHDRAW_REASON_${i}`}>
              <JuggerRadioButton type="radio" name="reason" radioSize="medium" onChange={handleCheckReason(e)} />
              {e.detail}
            </WithdrawUserReasonRadioItemContainer>
          ) : (
            ''
          ),
        )}
        <WithdrawUserReasonRadioETCContainer>
          <WithdrawUserReasonRadioItemContainer>
            <JuggerRadioButton
              type="radio"
              name="reason"
              radioSize="medium"
              onChange={handleCheckReason(REASON_CODE.ETC)}
            />
            기타
          </WithdrawUserReasonRadioItemContainer>
          <textarea
            placeholder="기타 사유를 입력해주세요"
            value={customReason}
            onChange={handleChangeCustomReason}
            disabled={selectedReason?.code !== REASON_CODE.ETC.code}
          />
        </WithdrawUserReasonRadioETCContainer>
      </WithdrawUserReasonRadioContainer>
      <JuggerButton size="medium" color="primary" onClick={handleSubmit} disabled={!isValid}>
        탈퇴하기
      </JuggerButton>
    </WithdrawUserReasonContainer>
  );
};

const WithdrawUserCompleteContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '36px 32px 24px',
  background: theme.color.background.normal,
  borderRadius: theme.radius[16],
});

const WithdrawUserCompleteTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.title3.bold,
      color: theme.color.label.normal,
    },
    ['&.description']: {
      ...theme.font.headline1.medium,
      color: theme.color.label.normal,
    },
  },
});

const WithdrawUserComplete = ({ handleWithdraw }: { handleWithdraw: () => void }) => {
  return (
    <WithdrawUserCompleteContainer>
      <WithdrawUserCompleteTextContainer>
        <p className="title">탈퇴가 완료됐어요</p>
        <p className="description">더 나은 서비스로 다시 만나요!</p>
      </WithdrawUserCompleteTextContainer>
      <JuggerButton size="medium" color="primary" onClick={handleWithdraw}>
        확인
      </JuggerButton>
    </WithdrawUserCompleteContainer>
  );
};

const baseURL = import.meta.env.VITE_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const fetchData = async (
  path: string,
  method: 'GET' | 'DELETE',
  init?: {
    body?: any;
  },
) => {
  const url = `${baseURL}${path}`;

  const res = await fetch(url, {
    method,
    headers: getHeaders(),
    ...(init?.body !== undefined && { body: JSON.stringify(init.body) }),
  });
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  return await res.json();
};

const WithdrawUser = ({ closeModal, modalRef }: ModalComponentProps) => {
  const [withdrawStep, setWithdrawStep] = useState(0);
  const [withdrawReason, setWithdrawReason] = useState<Reason>();

  const goToNextStep = () => {
    setWithdrawStep((prev) => prev + 1);
  };

  const handleSubmitReason = (reason: Reason) => {
    setWithdrawReason(reason);
    setWithdrawStep((prev) => prev + 1);
  };

  const handleWithdraw = async () => {
    const fetchWithdraw = async () => {
      console.log(123);
      const res = await fetchData('/api/v1/user/signout', 'DELETE', {
        body: {
          reasonCode: withdrawReason?.code,
          reasonDetail: withdrawReason?.detail,
        },
      });

      console.log(res);
    };

    await fetchWithdraw();
    Logout();
  };

  return (
    <div
      style={{
        maxHeight: '100dvh',
        maxWidth: '100dvw',
        boxSizing: 'border-box',
        padding: '64px',
      }}
    >
      <div
        ref={modalRef}
        style={{
          maxWidth: '448px',
          width: 'calc(100dvw - 128px)',
          boxSizing: 'border-box',
        }}
      >
        {withdrawStep == 0 ? (
          <WithdrawUserConfirm closeModal={closeModal} goToNextStep={goToNextStep} />
        ) : withdrawStep == 1 ? (
          <WithdrawUserReason closeModal={closeModal} handleSubmitReason={handleSubmitReason} />
        ) : (
          <WithdrawUserComplete handleWithdraw={handleWithdraw} />
        )}
      </div>
    </div>
  );
};

export default WithdrawUser;
