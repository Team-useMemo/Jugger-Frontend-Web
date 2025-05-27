import useWindowSize from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import LogoPNG from '@assets/Logo.png';
import EnvelopeSVG from '@assets/landing/envelope.svg?react';
import InstagramSVG from '@assets/landing/instagram.svg?react';
import LinkedInSVG from '@assets/landing/linkedin.svg?react';
import PencilSVG from '@assets/landing/pencil.svg?react';
import ProfileCheerSVG from '@assets/landing/profilecheer.svg?react';
import {
  IndexFooterButtonContainer,
  IndexFooterContainer,
  IndexFooterContents,
  IndexFooterLayout,
  IndexFooterSNSContainer,
} from './Footer.Style';

const IndexFooter = () => {
  const width = useWindowSize();
  const isMobile = width < 480;

  return (
    <IndexFooterLayout>
      <IndexFooterContainer>
        <img src={LogoPNG} />
        <IndexFooterContents>
          <IndexFooterButtonContainer>
            <JuggerButton color="secondary" size={!isMobile ? 'large' : 'small'}>
              <PencilSVG />
              의견 남기기
            </JuggerButton>
            <JuggerButton color="secondary" size={!isMobile ? 'large' : 'small'}>
              <EnvelopeSVG />
              비즈니스 제안
            </JuggerButton>
            <JuggerButton color="secondary" size={!isMobile ? 'large' : 'small'}>
              <ProfileCheerSVG />
              만든이들
            </JuggerButton>
          </IndexFooterButtonContainer>
          <IndexFooterSNSContainer>
            <InstagramSVG />
            <LinkedInSVG />
          </IndexFooterSNSContainer>
        </IndexFooterContents>
        Jugger All rights reserved.
      </IndexFooterContainer>
    </IndexFooterLayout>
  );
};

export default IndexFooter;
