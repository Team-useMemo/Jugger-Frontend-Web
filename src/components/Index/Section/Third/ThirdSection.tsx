import useWindowSize from '@hooks/useWindowSize';
import CategoryModal1PNG from '@assets/landing/Section/Third/CategoryModal1.png';
import CategoryModal2PNG from '@assets/landing/Section/Third/CategoryModal2.png';
import CategoryModal3PNG from '@assets/landing/Section/Third/CategoryModal3.png';
import Modal1MobilePNG from '@assets/landing/Section/Third/Modal1Mobile.png';
import Modal1WebPNG from '@assets/landing/Section/Third/Modal1Web.png';
import Modal2MobilePNG from '@assets/landing/Section/Third/Modal2Mobile.png';
import Modal2WebPNG from '@assets/landing/Section/Third/Modal2Web.png';
import WriteMobilePNG from '@assets/landing/Section/Third/WriteMobile.png';
import WriteWebPNG from '@assets/landing/Section/Third/WriteWeb.png';
import PigTailSVG from '@assets/landing/Section/Third/pigTail.svg?react';
import UpRightSVG from '@assets/landing/Section/Third/upRight.svg?react';
import {
  IndexThirdSectionContainer,
  IndexThirdSectionContents,
  IndexThirdSectionImage1Container,
  IndexThirdSectionImage2Block,
  IndexThirdSectionImage2Container,
  IndexThirdSectionImage2Item,
  IndexThirdSectionImage3Container,
  IndexThirdSectionLayout,
  IndexThirdSectionTitle,
  IndexThirdSectionTitleContainer,
  IndexThirdSectionTitleIndex,
} from './ThirdSection.Style';

const IndexThirdSectionImage1 = () => {
  return (
    <IndexThirdSectionImage1Container
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0 }}
    >
      <source media="(max-width: 480px)" srcSet={WriteMobilePNG} />
      <img src={WriteWebPNG} />
    </IndexThirdSectionImage1Container>
  );
};

const IndexThirdSectionImage2 = () => {
  return (
    <IndexThirdSectionImage2Container>
      <IndexThirdSectionImage2Item
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: -0.4, duration: 0.75 }}
        viewport={{ once: false, amount: 0 }}
      >
        <PigTailSVG />
        <img src={CategoryModal1PNG} />
      </IndexThirdSectionImage2Item>
      <IndexThirdSectionImage2Item
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: -0.2, duration: 0.75 }}
        viewport={{ once: false, amount: 0 }}
      >
        <img src={CategoryModal2PNG} />
        <UpRightSVG />
      </IndexThirdSectionImage2Item>
      <IndexThirdSectionImage2Item
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: -0.0, duration: 0.75 }}
        viewport={{ once: false, amount: 0 }}
      >
        <IndexThirdSectionImage2Block size="50%" />
        <img src={CategoryModal3PNG} />
      </IndexThirdSectionImage2Item>
    </IndexThirdSectionImage2Container>
  );
};

const IndexThirdSectionImage3 = () => {
  return (
    <IndexThirdSectionImage3Container
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0 }}
    >
      <picture>
        <source media="(max-width: 480px)" srcSet={Modal1MobilePNG} />
        <img src={Modal1WebPNG} />
      </picture>
      <picture>
        <source media="(max-width: 480px)" srcSet={Modal2MobilePNG} />
        <img src={Modal2WebPNG} />
      </picture>
    </IndexThirdSectionImage3Container>
  );
};

const IndexThirdSection = () => {
  const width = useWindowSize();
  const isMobile = width < 480;

  const sectionList = [
    {
      title: (
        <IndexThirdSectionTitle strongColor="black">
          <b>대화하듯 메모</b>를 <br />
          기록하고 관리해요
        </IndexThirdSectionTitle>
      ),
      image: <IndexThirdSectionImage1 />,
    },
    {
      title: (
        <IndexThirdSectionTitle strongColor="blue">
          <b>카테고리를 설정</b>하고 <br />
          쉽게 <b>모아 확인해요</b>
        </IndexThirdSectionTitle>
      ),
      image: <IndexThirdSectionImage2 />,
    },
    {
      title: (
        <IndexThirdSectionTitle strongColor="blue">
          <b>링크</b>와 <b>사진</b>을 {isMobile && <br />}
          간편하게 {!isMobile && <br />}
          모아볼 수 있어요
        </IndexThirdSectionTitle>
      ),
      image: <IndexThirdSectionImage3 />,
    },
  ];

  return (
    <IndexThirdSectionLayout>
      {sectionList.map((e, i) => (
        <IndexThirdSectionContainer key={`IndexThirdSectionItem_${i}`} idx={i}>
          <IndexThirdSectionContents idx={i}>
            <IndexThirdSectionTitleContainer idx={i}>
              <IndexThirdSectionTitleIndex idx={i}>{i + 1}</IndexThirdSectionTitleIndex>
              {e.title}
            </IndexThirdSectionTitleContainer>
            {e.image}
          </IndexThirdSectionContents>
        </IndexThirdSectionContainer>
      ))}
    </IndexThirdSectionLayout>
  );
};

export default IndexThirdSection;
