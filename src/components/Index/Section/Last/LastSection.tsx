import { useNavigate } from 'react-router-dom';
import useIsLogin from '@hooks/useIsLogin';
import useWindowSize from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import JuggerButton from '@components/Common/JuggerButton';
import LogoIconSVG from '@assets/LogoIcon.svg?react';
import { IndexLastSectionContainer, IndexLastSectionLayout } from './LastSection.Style';

const IndexLastSection = () => {
  const width = useWindowSize();
  const isMobile = width < 480;
  const isLogin = useIsLogin();

  const navigate = useNavigate();

  const handleClickStart = () => {
    if (isLogin) {
      navigate(webPath.root());
      return;
    }

    navigate(webPath.login());
  };

  return (
    <IndexLastSectionLayout>
      <IndexLastSectionContainer>
        <LogoIconSVG />
        새로운 메모, <br />
        직접 경험해보세요!
      </IndexLastSectionContainer>
      <JuggerButton color="primary" size={!isMobile ? 'large' : 'small'} onClick={handleClickStart}>
        바로 시작하기
      </JuggerButton>
    </IndexLastSectionLayout>
  );
};

export default IndexLastSection;
