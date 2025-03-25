import CategorySVG from '@assets/Sidebar/Category.svg?react';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import SideMenu from '@components/SideBar/SideMenu/SideMenu';
import LogoPNG from '@assets/Logo.png';
import { SideBarContainer, SideBarContents, SideBarHeader, StyledSideBar } from './SideBar.style';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const SideBar = ({ toggleMenu, closeMenu }: { toggleMenu: boolean; closeMenu: () => void }) => {
  const [, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);

  const onWholeMemoClick = () => {
    alert('전체 메모');
  };
  const onCalendarClick = () => {};
  const onImageClick = () => {};
  const onLinkClick = () => {};
  const onSettingClick = () => {};

  const handleLogoClick = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        console.log(123);
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  });

  return (
    <StyledSideBar active={toggleMenu}>
      <SideBarContainer ref={modalRef}>
        <SideBarHeader>
          <img src={LogoPNG} onClick={handleLogoClick} />
        </SideBarHeader>
        <SideBarContents>
          <SideMenu title="전체 메모" icon={CategorySVG} onClick={onWholeMemoClick} />
          <SideMenu title="캘린더" icon={CalendarSVG} onClick={onCalendarClick} />
          <SideMenu title="사진" icon={ImageSVG} onClick={onImageClick} />
          <SideMenu title="링크" icon={LinkSVG} onClick={onLinkClick} />
          <SideMenu title="설정" icon={SettingSVG} onClick={onSettingClick} />
        </SideBarContents>
      </SideBarContainer>
    </StyledSideBar>
  );
};

export default SideBar;
