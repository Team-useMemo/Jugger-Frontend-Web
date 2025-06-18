import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import { useIsMobile } from '@hooks/useWindowSize';
import SideBar from '@layout/SideBar/SideBar';
import ModalLayoutGrayLeft from '@components/Modal/Layout/ModalLayoutGrayLeft';
import Header from '../Header/Header';
import { StyledContent, StyledMain, StyledMainlayout } from './MainLayout.Style';
import { LayoutProps } from './Mainlayout.Props';

const Mainlayout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  const [SideBarModal] = useParamModal(ModalName.sideBar, ModalLayoutGrayLeft, SideBar);

  return (
    <StyledMainlayout>
      <SideBarModal />
      {!isMobile && <SideBar />}
      <StyledMain>
        <Header />
        <StyledContent>{children}</StyledContent>
      </StyledMain>
    </StyledMainlayout>
  );
};

export default Mainlayout;
