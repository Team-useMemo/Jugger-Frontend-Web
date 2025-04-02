import styled from '@emotion/styled';
import { pop } from '@styles/keyframes';
import { useNavigate } from 'react-router-dom';

const Tmp = styled.div({
  animation: pop + ' 0.2s',
});

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      loginPage
      <div
        onClick={() => {
          navigate('/');
        }}
      >
        go Home
      </div>
      <Tmp>asd</Tmp>
    </>
  );
};

export default LoginPage;
