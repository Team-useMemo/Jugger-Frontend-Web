import SideBar from '@layout/SideBar/SideBar';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { StyledMainlayout } from './MainLayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  return (
    <StyledMainlayout>
      <aside className="sidebar">
        <SideBar />
      </aside>
      <div className="main">
        <header className="header">
          <Header />
        </header>
        <main className="content">{children}</main>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </StyledMainlayout>
  );
};

export default Mainlayout;
