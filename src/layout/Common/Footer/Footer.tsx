import useWindowSize from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import LogoPNG from '@assets/landing/FooterLogo.png';
import EnvelopeSVG from '@assets/landing/envelope.svg?react';
import InstagramSVG from '@assets/landing/instagram.svg?react';
import LinkedInSVG from '@assets/landing/linkedin.svg?react';
import PencilSVG from '@assets/landing/pencil.svg?react';
import ProfileCheerSVG from '@assets/landing/profilecheer.svg?react';
import {
  CommonFooterButtonContainer,
  CommonFooterContainer,
  CommonFooterContents,
  CommonFooterLayout,
  CommonFooterSNSContainer,
} from './Footer.Style';

const CommonFooter = () => {
  const width = useWindowSize();
  const isMobile = width < 480;

  const handleClickFeedback = () => {
    alert('피드백');
  };

  const handleClickEmail = () => {
    window.open('mailto:teamusememo@naver.com?cc=anyany3151@naver.com');
  };

  const handleClickTeam = () => {
    window.open('https://jadestone.notion.site/Team-UseMemo-200b8fffcd6a8054b1ade8e0b07de9e7?pvs=74');
  };

  const handleClickInstagram = () => {
    window.open('https://www.instagram.com/jugger.offcial/');
  };

  const handleClickLinnkedIn = () => {
    window.open('https://www.linkedin.com/in/usememo-offcial-75381b353/');
  };

  return (
    <CommonFooterLayout>
      <CommonFooterContainer>
        <img src={LogoPNG} />
        <CommonFooterContents>
          <CommonFooterButtonContainer>
            <JuggerButton color="secondary" size={!isMobile ? 'large' : 'small'} onClick={handleClickFeedback}>
              <PencilSVG />
              의견 남기기
            </JuggerButton>
            <JuggerButton color="secondary" size={!isMobile ? 'large' : 'small'} onClick={handleClickEmail}>
              <EnvelopeSVG />
              비즈니스 제안
            </JuggerButton>
            <JuggerButton color="secondary" size={!isMobile ? 'large' : 'small'} onClick={handleClickTeam}>
              <ProfileCheerSVG />
              만든이들
            </JuggerButton>
          </CommonFooterButtonContainer>
          <CommonFooterSNSContainer>
            <InstagramSVG onClick={handleClickInstagram} />
            <LinkedInSVG onClick={handleClickLinnkedIn} />
          </CommonFooterSNSContainer>
        </CommonFooterContents>
        Jugger All rights reserved.
      </CommonFooterContainer>
    </CommonFooterLayout>
  );
};

export default CommonFooter;
