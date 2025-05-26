import useWindowSize from '@hooks/useWindowSize';

import LogoPNG from '@assets/Logo.png';
import JuggerButton from '@components/Common/JuggerButton';
import { IndexHeaderContainer, IndexHeaderLogo } from './Header.Style';

const IndexHeader = () => {
  const width = useWindowSize();

  return (
    <IndexHeaderContainer>
      <IndexHeaderLogo src={LogoPNG} />
      <JuggerButton color="primary" size={width >= 480 ? 'medium' : 'small'}>
        로그인 및 회원가입
      </JuggerButton>
    </IndexHeaderContainer>
  );
};

export default IndexHeader;
