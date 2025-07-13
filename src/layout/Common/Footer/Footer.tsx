import useWindowSize from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import LogoPNG from '@assets/Logo.png';
import LogoWhitePNG from '@assets/LogoWhite.png';
import EnvelopeSVG from '@assets/icons/envelope.svg?react';
import InstagramSVG from '@assets/icons/instagram.svg?react';
import LinkedInSVG from '@assets/icons/linkedin.svg?react';
import PencilSVG from '@assets/icons/pencil.svg?react';
import ProfileCheerSVG from '@assets/icons/profilecheer.svg?react';
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
    window.open('https://forms.gle/d3iJtZLEf3CBEyeN8');
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
        <img src={!isMobile ? LogoWhitePNG : LogoPNG} />
        <CommonFooterContents>
          <CommonFooterButtonContainer>
            <JuggerButton color="secondary" size={'xsmall'} onClick={handleClickFeedback}>
              <PencilSVG />
              의견 남기기
            </JuggerButton>
            <JuggerButton color="secondary" size={'xsmall'} onClick={handleClickEmail}>
              <EnvelopeSVG />
              비즈니스 제안
            </JuggerButton>
            <JuggerButton color="secondary" size={'xsmall'} onClick={handleClickTeam}>
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
