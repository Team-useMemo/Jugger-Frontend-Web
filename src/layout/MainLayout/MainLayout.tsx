import SideBar from '@layout/SideBar/SideBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { StyledContent, StyledMain, StyledMainlayout } from './MainLayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  return (
    <StyledMainlayout>
      <SideBar />
      <StyledMain>
        <Header />
        <StyledContent>{children}</StyledContent>
        <Footer />
      </StyledMain>
    </StyledMainlayout>
  );
};

export default Mainlayout;
