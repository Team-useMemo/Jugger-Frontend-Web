import { useState } from 'react';
import SideBar from '@layout/SideBar/SideBar';
import Header from '../Header/Header';
import { StyledContent, StyledMain, StyledMainlayout } from './MainLayout.Style';
import { LayoutProps } from './Mainlayout.Props';

const Mainlayout = ({ children }: LayoutProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const openMenu = () => setToggleMenu(true);
  const closeMenu = () => setToggleMenu(false);

  return (
    <StyledMainlayout>
      <SideBar toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <StyledMain>
        <Header activeMenu={openMenu} />
        <StyledContent>{children}</StyledContent>
      </StyledMain>
    </StyledMainlayout>
  );
};

export default Mainlayout;
