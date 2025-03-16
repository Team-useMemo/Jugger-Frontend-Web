import styled from '@emotion/styled';
import { theme } from '@styles/theme';
import { pop } from '@styles/keyframes';
import { useNavigate } from 'react-router-dom';

const Tmp = styled.div({
  color: theme.colors.cornflowerblue,
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
