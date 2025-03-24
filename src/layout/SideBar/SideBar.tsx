import { StyledSideBar } from './SideBar.style';
import CategorySVG from '@assets/Sidebar/Category.svg?react';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import SideMenu from '@components/SideBar/SideMenu/SideMenu';

const SideBar = () => {
  const onWholeMemoClick = () => {
    alert('전체 메모');
  };
  const onCalendarClick = () => {};
  const onImageClick = () => {};
  const onLinkClick = () => {};

  const onSettingClick = () => {};

  return (
    <StyledSideBar>
      <SideMenu title="전체 메모" icon={CategorySVG} onClick={onWholeMemoClick} />
      <SideMenu title="캘린더" icon={CalendarSVG} onClick={onCalendarClick} />
      <SideMenu title="사진" icon={ImageSVG} onClick={onImageClick} />
      <SideMenu title="링크" icon={LinkSVG} onClick={onLinkClick} />
      <SideMenu title="설정" icon={SettingSVG} onClick={onSettingClick} />
    </StyledSideBar>
  );
};

export default SideBar;
