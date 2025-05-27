import IndexFooter from '@components/Index/Footer/Footer';
import IndexHeader from '@components/Index/Header/Header';
import IndexFirstSection from '@components/Index/Section/First/FirstSection';
import IndexLastSection from '@components/Index/Section/Last/LastSection';
import IndexSecondSection from '@components/Index/Section/Second/SecondSection';
import IndexThirdSection from '@components/Index/Section/Third/ThirdSection';
import { IndexContainer, IndexContents, IndexLayout } from './IndexPage.Style';

const IndexPage = () => {
  return (
    <IndexLayout>
      <IndexHeader />
      <IndexContainer>
        <IndexContents>
          <IndexFirstSection />
          <IndexSecondSection />
          <IndexThirdSection />
          <IndexLastSection />
        </IndexContents>
        <IndexFooter />
      </IndexContainer>
    </IndexLayout>
  );
};

export default IndexPage;
