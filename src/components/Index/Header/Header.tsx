import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import JuggerButton from '@components/Common/JuggerButton';
import LogoPNG from '@assets/Logo.png';
import { IndexHeaderContainer, IndexHeaderLogo } from './Header.Style';

const IndexHeader = () => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate(webPath.login());
  };

  return (
    <IndexHeaderContainer>
      {!isMobile && <IndexHeaderLogo src={LogoPNG} />}
      <span />
      <JuggerButton color="primary" size={!isMobile ? 'medium' : 'small'} onClick={handleClickLogin}>
        로그인 및 회원가입
      </JuggerButton>
    </IndexHeaderContainer>
  );
};

export default IndexHeader;
