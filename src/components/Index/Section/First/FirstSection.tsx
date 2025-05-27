import { motion } from 'framer-motion';
import useWindowSize from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import LogoPNG from '@assets/Logo.png';
import MobilePNG from '@assets/landing/Section/First/Mobile.png';
import WebPNG from '@assets/landing/Section/First/Web.png';
import {
  IndexFirstSectionBackgroundContainer,
  IndexFirstSectionBackgroundRadial,
  IndexFirstSectionContainer,
  IndexFirstSectionContents,
  IndexFirstSectionImage,
  IndexFirstSectionLayout,
  IndexFirstSectionTitle,
  IndexFirstSectionTitleContainer,
  IndexFirstSectionTitleContents,
  IndexFirstSectionTitleDesc,
  IndexFirstSectionTitleLogo,
  IndexFirstSectionTitleMain,
} from './FirstSection.Style';

const IndexFirstSection = () => {
  const width = useWindowSize();
  const isMobile = width < 480;

  return (
    <IndexFirstSectionLayout>
      <IndexFirstSectionContainer>
        <IndexFirstSectionBackgroundContainer>
          {[0, 1, 2].map((idx) => (
            <IndexFirstSectionBackgroundRadial key={idx} idx={idx} />
          ))}
        </IndexFirstSectionBackgroundContainer>
        <IndexFirstSectionContents>
          <IndexFirstSectionTitleContainer>
            <IndexFirstSectionTitleContents>
              <IndexFirstSectionTitleLogo src={LogoPNG} />
              <IndexFirstSectionTitle>
                <IndexFirstSectionTitleMain>
                  빠르게 '톡' 남기고
                  <br />
                  편하게 정리하는
                </IndexFirstSectionTitleMain>
                <IndexFirstSectionTitleDesc>새로운 메모 서비스</IndexFirstSectionTitleDesc>
              </IndexFirstSectionTitle>
            </IndexFirstSectionTitleContents>
            <JuggerButton color="primary" size={!isMobile ? 'large' : 'small'}>
              바로 시작하기
            </JuggerButton>
          </IndexFirstSectionTitleContainer>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0 }}
          >
            <picture>
              <source media="(max-width: 480px)" srcSet={MobilePNG} />
              <IndexFirstSectionImage src={WebPNG} />
            </picture>
          </motion.div>
        </IndexFirstSectionContents>
      </IndexFirstSectionContainer>
    </IndexFirstSectionLayout>
  );
};

export default IndexFirstSection;
