import SideBar from '@layout/SideBar/SideBar';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { StyledContent, StyledMain, StyledMainlayout } from './MainLayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  return (
    <StyledMainlayout>
      <Header />
      <StyledMain>
        <SideBar />
        <StyledContent>{children}</StyledContent>
      </StyledMain>
    </StyledMainlayout>
  );
};

export default Mainlayout;
