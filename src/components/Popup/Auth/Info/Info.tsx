import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseSVG from '@assets/Login/close.svg?react';

import {
  InfoContainer,
  Header,
  InputWrapper,
  Input,
  ClearButton,
  ButtonGroup,
  Button,
  Select,
  SubmitButton,
  Label,
} from './Info.Style';

const Info = ({
  closeModal,
  checkedTerms,
}: {
  closeModal: () => void;
  checkedTerms: { all: boolean; age: boolean; privacy: boolean; terms: boolean; marketing: boolean; ads: boolean };
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'남자' | '여자' | ''>('');
  const [birth, setBirth] = useState('');
  const [source, setSource] = useState('');
  const isRequiredChecked = name && gender && birth && source;
  const handleCloseModal = () => {
    closeModal();
    navigate('/login');
  };
  console.log(checkedTerms);
  const handleSubmit = () => {
    console.log({ name, gender, birth, source });
    if (isRequiredChecked) {
      // 여기서 서버에 정보 전송하는 로직을 추가하세요.
      console.log(checkedTerms);
      localStorage.setItem('username', name);
      navigate(`/${name}`);
    }
  };

  return (
    <InfoContainer>
      <Header>
        <h2>정보를 입력해주세요</h2>
        <button onClick={handleCloseModal}>✕</button>
      </Header>
      <div style={{ marginBottom: '24px' }}>
        <Label>이름</Label>
        <InputWrapper>
          <Input
            value={name}
            hasValue={!!name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
          {name && (
            <ClearButton onClick={() => setName('')}>
              <CloseSVG />
            </ClearButton>
          )}
        </InputWrapper>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <Label>성별</Label>
        <ButtonGroup>
          <Button selected={gender === '남자'} onClick={() => setGender('남자')}>
            남자
          </Button>
          <Button selected={gender === '여자'} onClick={() => setGender('여자')}>
            여자
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <Label>생년월일</Label>
        <InputWrapper>
          <Input
            value={birth}
            hasValue={!!birth}
            onChange={(e) => setBirth(e.target.value)}
            placeholder="생년월일을 입력해주세요"
          />
          {birth && (
            <ClearButton onClick={() => setBirth('')}>
              <CloseSVG />
            </ClearButton>
          )}
        </InputWrapper>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <Label>Jugger를 알게 된 경로</Label>
        <Select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">선택하세요</option>
          <option value="인스타그램">인스타그램</option>
          <option value="페이스북">페이스북</option>
          <option value="구글">구글</option>
          <option value="지인추천">지인추천</option>
        </Select>
      </div>
      <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
    </InfoContainer>
  );
};

export default Info;
