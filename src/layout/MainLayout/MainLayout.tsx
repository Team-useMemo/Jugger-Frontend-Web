import SideBar from '@layout/SideBar/SideBar';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { StyledContent, StyledMain, StyledMainlayout } from './MainLayout.Style';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/useRedux';
import { loadCategories } from '@stores/modules/category';

const Mainlayout = ({ children }: LayoutProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const openMenu = () => setToggleMenu(true);
  const closeMenu = () => setToggleMenu(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

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
