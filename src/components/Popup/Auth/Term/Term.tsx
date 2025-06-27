import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  ButtonWrapper,
  Checkbox,
  CompleteButton,
  Content,
  DividerLine,
  Header,
  RightText,
  TermsContainer,
  TermDetailModalOverlay,
  TermDetailModalContent,
  TermCheckboxWrapper,
  CloseButton,
  TermDetailTextBox,
} from './Term.Style';

const TERM_DETAIL_TEXT = {
  age: (
    <p>
      본인은 Jugger의 회원가입을 위해 만 14세 이상임을 확인합니다.
      만 14세 미만의 아동은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및 「아동복지법」 등에 따라 법정대리인의 동의 없이 회원가입을 할 수 없습니다.
    </p>
  ),
  privacy: (
    <>
      <p>
        개인정보보호법에 따라 Jugger에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
        개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
      </p>
      <br />
      <p>
        <strong>[ 수집하는 개인정보 ]</strong><br />
        Jugger는 회원 가입 및 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 이용합니다.
        수집 항목은 이름, 성별, 생년월일 등이며, 이는 회원 식별, 고객 응대, 서비스 이용 안내 등을 위해 사용됩니다.
        개인정보는 회원 탈퇴 시까지 보관되며, 관련 법령에 따라 일정 기간 동안 추가 보관될 수 있습니다.
      </p>
      <br />
      <p>
        <strong>[ 개인정보 수집 및 이용 동의를 거부할 권리 ]</strong><br />
        이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다.
        회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
      </p>
    </>
  ),
  terms: (
    <p>
      Jugger의 서비스 이용과 관련된 권리와 의무를 규정한 이용약관에 동의합니다.
      이용자는 타인의 정보를 도용하거나 서비스 운영을 방해하는 등 부정한 행위를 해서는 안 되며, 서비스 이용 중 본 약관을 준수해야 합니다.
    </p>
  ),
  marketing: (
    <p>
      Jugger는 서비스의 마케팅 활동을 목적으로 개인정보를 수집·활용하며, 회원의 소중한 정보를 보호하기 위해 최선을 다하고 있습니다.
      수집되는 항목은 이름, 성별, 생년월일이며, 수집된 정보는 마케팅 목적에 한해 활용됩니다.
    </p>
  ),
  ads: (
    <p>
      Jugger는 보다 나은 서비스를 제공하기 위해 이용자의 정보를 활용하여 이벤트 및 맞춤형 혜택을 안내할 수 있습니다.
      마케팅 활용에는 이메일, 앱 푸시 등을 통한 정보 제공이 포함되며, 이 동의는 선택사항으로 언제든지 철회하실 수 있습니다.
    </p>
  ),
};

export type TermsProps = {
  closeModal: () => void;
  openInfoModal: () => void;
  checked: {
    all: boolean;
    age: boolean;
    privacy: boolean;
    terms: boolean;
    marketing: boolean;
    ads: boolean;
  };
  setChecked: React.Dispatch<
    React.SetStateAction<{
      all: boolean;
      age: boolean;
      privacy: boolean;
      terms: boolean;
      marketing: boolean;
      ads: boolean;
      email: string;
      nickname: string;
    }>
  >;
};

const TermCheckboxItem = ({
  label,
  checked,
  onChange,
  onViewClick,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  onViewClick?: () => void;
}) => (
  <TermCheckboxWrapper>
    <Checkbox>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
      {onViewClick && (
        <RightText onClick={(e) => {
          e.preventDefault();
          onViewClick()
        }}>보기</RightText>
      )}
    </Checkbox>
  </TermCheckboxWrapper>
);

const Terms = ({ closeModal, openInfoModal, checked, setChecked }: TermsProps) => {
  const navigate = useNavigate();
  const [selectedTermDetail, setSelectedTermDetail] = useState<'age' | 'privacy' | 'terms' | 'marketing' | 'ads' | null>(null);

  const TERM_TITLES = {
    age: '[필수] 만 14세 이상입니다',
    privacy: '[필수] 개인정보 수집 및 이용 동의',
    terms: '[필수] 이용약관 동의',
    marketing: '[선택] 마케팅 활용 동의',
    ads: '[선택] 광고성 정보 수신 동의',
  };

  const handleAllChange = () => {
    const newValue = !checked.all;
    setChecked((prev) => ({
      ...prev,
      all: newValue,
      age: newValue,
      privacy: newValue,
      terms: newValue,
      marketing: newValue,
      ads: newValue,
    }));
  };

  const handleSingleChange = (key: keyof typeof checked) => {
    setChecked((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      const allChecked = updated.age && updated.privacy && updated.terms && updated.marketing && updated.ads;
      return { ...updated, all: allChecked };
    });
  };

  const isRequiredChecked = checked.age && checked.privacy && checked.terms;

  const handleComplete = () => {
    if (isRequiredChecked) {
      closeModal();
      openInfoModal();
    }
  };

  const handleCloseModal = () => {
    closeModal();
    navigate('/login');
  };

  return (
    <TermsContainer>
      <Header>
        <h2>서비스 이용약관에 동의해주세요</h2>
        <button onClick={handleCloseModal}>✕</button>
      </Header>
      <Content>
        <TermCheckboxWrapper>
          <Checkbox>
            <input type="checkbox" checked={checked.all} onChange={handleAllChange} />
            <span>약관 전체동의</span>
          </Checkbox>
        </TermCheckboxWrapper>
        <DividerLine />
        <TermCheckboxItem
          label="[필수] 만 14세 이상입니다"
          checked={checked.age}
          onChange={() => handleSingleChange('age')}
          onViewClick={() => setSelectedTermDetail('age')}
        />
        <TermCheckboxItem
          label="[필수] 개인정보 수집 및 이용 동의"
          checked={checked.privacy}
          onChange={() => handleSingleChange('privacy')}
          onViewClick={() => setSelectedTermDetail('privacy')}
        />
        <TermCheckboxItem
          label="[필수] 이용약관 동의"
          checked={checked.terms}
          onChange={() => handleSingleChange('terms')}
          onViewClick={() => setSelectedTermDetail('terms')}
        />
        <TermCheckboxItem
          label="[선택] 마케팅 활용 동의"
          checked={checked.marketing}
          onChange={() => handleSingleChange('marketing')}
          onViewClick={() => setSelectedTermDetail('marketing')}
        />
        <TermCheckboxItem
          label="[선택] 광고성 정보 수신 동의"
          checked={checked.ads}
          onChange={() => handleSingleChange('ads')}
          onViewClick={() => setSelectedTermDetail('ads')}
        />
      </Content>
      <ButtonWrapper>
        <CompleteButton disabled={!isRequiredChecked} onClick={handleComplete}>
          완료
        </CompleteButton>
      </ButtonWrapper>
      {selectedTermDetail && (
        <TermDetailModalOverlay>
          <TermDetailModalContent>
            <h3>{TERM_TITLES[selectedTermDetail]}</h3>
            <TermDetailTextBox>
              {TERM_DETAIL_TEXT[selectedTermDetail]}
            </TermDetailTextBox>
            <CloseButton onClick={() => setSelectedTermDetail(null)}>닫기</CloseButton>
          </TermDetailModalContent>
        </TermDetailModalOverlay>
      )}
    </TermsContainer>
  );
};

export default Terms;
