import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { pop } from '../../styles/keyframes';

const Tmp = styled.div({
  color: theme.colors.cornflowerblue,
  animation: pop + ' 0.2s',
});

const LoginPage = () => {
  return (
    <div>
      loginPage
      <Tmp>asd</Tmp>
    </div>
  );
};

export default LoginPage;
