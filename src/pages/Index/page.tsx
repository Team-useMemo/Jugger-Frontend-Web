import { StyledMain, StyledMainlayout } from '@layout/MainLayout/MainLayout.Style';
import IndexFooter from '@components/Index/Footer/Footer';
import IndexHeader from '@components/Index/Header/Header';
import IndexFirstSection from '@components/Index/Section/First/FirstSection';
import IndexLastSection from '@components/Index/Section/Last/LastSection';
import IndexSecondSection from '@components/Index/Section/Second/SecondSection';
import IndexThirdSection from '@components/Index/Section/Third/ThirdSection';
import { theme } from '@styles/theme';

const IndexPage = () => {
  return (
    <StyledMainlayout>
      <StyledMain>
        <IndexHeader />
        <div
          style={{
            background: theme.color.background.alternative,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <IndexFirstSection />
              <IndexSecondSection />
              <IndexThirdSection />
              <IndexLastSection />
            </div>
          </div>
          <IndexFooter />
        </div>
      </StyledMain>
    </StyledMainlayout>
  );
};

export default IndexPage;
