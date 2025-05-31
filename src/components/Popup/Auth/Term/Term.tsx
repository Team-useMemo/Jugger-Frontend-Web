import { useNavigate } from 'react-router-dom';
import {
  ButtonWrapper,
  Checkbox,
  CompleteButton,
  Content,
  DividerLine,
  Header,
  RightText,
  TermsContainer,
} from './Term.Style';

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

const Terms = ({ closeModal, openInfoModal, checked, setChecked }: TermsProps) => {
  const navigate = useNavigate();
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
        <div style={{ marginBottom: '24px' }}>
          <Checkbox>
            <input type="checkbox" checked={checked.all} onChange={handleAllChange} />
            <span>약관 전체동의</span>
          </Checkbox>
        </div>
        <DividerLine />
        <div style={{ marginBottom: '24px' }}>
          <Checkbox>
            <input type="checkbox" checked={checked.age} onChange={() => handleSingleChange('age')} />
            <span>[필수] 만 14세 이상입니다</span>
            <RightText>보기</RightText>
          </Checkbox>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Checkbox>
            <input type="checkbox" checked={checked.privacy} onChange={() => handleSingleChange('privacy')} />
            <span>[필수] 개인정보 수집 및 이용 동의</span>
          </Checkbox>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Checkbox>
            <input type="checkbox" checked={checked.terms} onChange={() => handleSingleChange('terms')} />
            <span>[필수] 이용약관 동의</span>
          </Checkbox>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Checkbox>
            <input type="checkbox" checked={checked.marketing} onChange={() => handleSingleChange('marketing')} />
            <span>[선택] 마케팅 활용 동의</span>
          </Checkbox>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <Checkbox>
            <input type="checkbox" checked={checked.ads} onChange={() => handleSingleChange('ads')} />
            <span>[선택] 광고성 정보 수신 동의</span>
          </Checkbox>
        </div>
      </Content>
      <ButtonWrapper>
        <CompleteButton disabled={!isRequiredChecked} onClick={handleComplete}>
          완료
        </CompleteButton>
      </ButtonWrapper>
    </TermsContainer>
  );
};

export default Terms;
