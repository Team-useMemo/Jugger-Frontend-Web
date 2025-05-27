import { useNavigate } from 'react-router-dom';
import useWindowSize from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import JuggerButton from '@components/Common/JuggerButton';
import LogoPNG from '@assets/Logo.png';
import { IndexHeaderContainer, IndexHeaderLogo } from './Header.Style';

const IndexHeader = () => {
  const width = useWindowSize();
  const isMobile = width < 480;

  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate(webPath.login());
  };

  return (
    <IndexHeaderContainer>
      <IndexHeaderLogo src={LogoPNG} />
      <JuggerButton color="primary" size={!isMobile ? 'medium' : 'small'} onClick={handleClickLogin}>
        로그인 및 회원가입
      </JuggerButton>
    </IndexHeaderContainer>
  );
};

export default IndexHeader;
