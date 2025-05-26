import { motion } from 'framer-motion';
import useWindowSize from '@hooks/useWindowSize';
import Modal1MobilePNG from '@assets/landing/Section/Second/Modal1Mobile.png';
import Modal1WebPNG from '@assets/landing/Section/Second/Modal1Web.png';
import Modal2MobilePNG from '@assets/landing/Section/Second/Modal2Mobile.png';
import Modal2WebPNG from '@assets/landing/Section/Second/Modal2Web.png';
import TagMobilePNG from '@assets/landing/Section/Second/TagMobile.png';
import TagWebPNG from '@assets/landing/Section/Second/TagWeb.png';
import WriteMobilePNG from '@assets/landing/Section/Second/WriteMobile.png';
import WriteWebPNG from '@assets/landing/Section/Second/WriteWeb.png';
import StackSVG from '@assets/landing/stack.svg?react';
import TagSVG from '@assets/landing/tag.svg?react';
import WriteSVG from '@assets/landing/write.svg?react';
import {
  IndexSecondSectionBackgroundContainer,
  IndexSecondSectionBackgroundRadial,
  IndexSecondSectionContainer,
  IndexSecondSectionContents,
  IndexSecondSectionItem,
  IndexSecondSectionItemImage,
  IndexSecondSectionItemTitle,
  IndexSecondSectionLayout,
  IndexSecondSectionList,
  IndexSecondSectionTitle,
} from './SecondSection.Style';

const IndexSecondSection = () => {
  const width = useWindowSize();

  const getSectionList = (isMobile: boolean) => {
    return [
      {
        icon: <WriteSVG />,
        title: (
          <p className="title">
            생각을 쉽고 {isMobile && <br />}빠르게{!isMobile && <br />} <span>기록해요</span>
          </p>
        ),
        desc: (
          <p className="desc">
            머릿속에 떠오른 생각, 중요한 {!isMobile && <br />}
            아이디어를 {isMobile && <br />}
            놓치지 말고 {!isMobile && <br />}
            채팅하듯 간편하게 메모해요.
          </p>
        ),
        image: (
          <IndexSecondSectionItemImage type="single">
            <picture>
              <source media="(max-width: 480px)" srcSet={WriteMobilePNG} />
              <img src={WriteWebPNG} />
            </picture>
          </IndexSecondSectionItemImage>
        ),
      },
      {
        icon: <StackSVG />,
        title: (
          <p className="title">
            링크와 사진을 <br />
            깔끔하게 <span>정리해요</span>
          </p>
        ),
        desc: (
          <p className="desc">
            흥미로운 기사, 웹사이트, 영감을 주는 {!isMobile && <br />}
            이미지 등 {isMobile && <br />}
            잃어버리기 쉬운 콘텐츠를 {!isMobile && <br />}
            한곳에 모아보세요.
          </p>
        ),
        image: (
          <IndexSecondSectionItemImage type="double">
            <picture>
              <source media="(max-width: 480px)" srcSet={Modal1MobilePNG} />
              <img src={Modal1WebPNG} />
            </picture>
            <picture>
              <source media="(max-width: 480px)" srcSet={Modal2MobilePNG} />
              <img src={Modal2WebPNG} />
            </picture>
          </IndexSecondSectionItemImage>
        ),
      },
      {
        icon: <TagSVG />,
        title: (
          <p className="title">
            내 생각을 카테고리로 <br />
            명확하게 <span>분류해요</span>
          </p>
        ),
        desc: (
          <p className="desc">
            정리된 카테고리로 {!isMobile && <br />}
            필요한 내용을 빠르게 찾고, <br />
            효율적으로 관리해요
          </p>
        ),
        image: (
          <IndexSecondSectionItemImage type="single">
            <picture>
              <source media="(max-width: 480px)" srcSet={TagMobilePNG} />
              <img src={TagWebPNG} />
            </picture>
          </IndexSecondSectionItemImage>
        ),
      },
    ];
  };

  return (
    <IndexSecondSectionLayout>
      <IndexSecondSectionContainer>
        <IndexSecondSectionBackgroundContainer>
          {[0, 1].map((idx) => (
            <IndexSecondSectionBackgroundRadial key={`Section2_Radial_${idx}`} idx={idx} />
          ))}
        </IndexSecondSectionBackgroundContainer>
        <IndexSecondSectionContents>
          <IndexSecondSectionTitle>어떻게 활용하나요?</IndexSecondSectionTitle>
          <IndexSecondSectionList>
            {getSectionList(width < 480).map((e) => (
              <motion.div
                initial={{ opacity: 0, x: 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0 }}
              >
                <IndexSecondSectionItem>
                  <IndexSecondSectionItemTitle>
                    {e.icon}
                    {e.title}
                    {e.desc}
                  </IndexSecondSectionItemTitle>
                  {e.image}
                </IndexSecondSectionItem>
              </motion.div>
            ))}
          </IndexSecondSectionList>
        </IndexSecondSectionContents>
      </IndexSecondSectionContainer>
    </IndexSecondSectionLayout>
  );
};

export default IndexSecondSection;
