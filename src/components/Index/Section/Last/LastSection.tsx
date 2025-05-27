import useWindowSize from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import LogoIconSVG from '@assets/LogoIcon.svg?react';
import { IndexLastSectionContainer, IndexLastSectionLayout } from './LastSection.Style';

const IndexLastSection = () => {
  const width = useWindowSize();
  const isMobile = width < 480;

  return (
    <IndexLastSectionLayout>
      <IndexLastSectionContainer>
        <LogoIconSVG />
        새로운 메모, <br />
        직접 경험해보세요!
      </IndexLastSectionContainer>
      <JuggerButton color="primary" size={!isMobile ? 'large' : 'small'}>
        바로 시작하기
      </JuggerButton>
    </IndexLastSectionLayout>
  );
};

export default IndexLastSection;
