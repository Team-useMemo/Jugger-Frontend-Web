// import { StyledSideBar } from './SideBar.style';
import CategorySVG from '@assets/Sidebar/Category.svg?react';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import SideMenu from '@components/SideBar/SideMenu/SideMenu';
import LogoPNG from '@assets/Logo.png';
import styled from '@emotion/styled';

export const StyledSideBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '349px',
  height: '100%',
});

const SideBarHeader = styled.div({
  display: 'flex',
  padding: '28px 24px 20px',
  borderBottom: '1px solid #E0E0E2',
});

const SideBarContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'auto',
  borderRight: '1px solid #E0E0E2',

  ['::-webkit-scrollbar']: {
    width: '12px',
    backgroundColor: '#FCFCFC',
    borderLeft: '1px solid #E8E8E8',
  },

  ['::-webkit-scrollbar-thumb']: {
    backgroundColor: '#7A7A7A',
    borderRadius: '100px',
    backgroundClip: 'padding-box',
    border: '3px solid transparent',
  },
});

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
      <SideBarHeader>
        <img src={LogoPNG} />
      </SideBarHeader>
      <SideBarContents>
        <SideMenu title="전체 메모" icon={CategorySVG} onClick={onWholeMemoClick} />
        <SideMenu title="캘린더" icon={CalendarSVG} onClick={onCalendarClick} />
        <SideMenu title="사진" icon={ImageSVG} onClick={onImageClick} />
        <SideMenu title="링크" icon={LinkSVG} onClick={onLinkClick} />
        <SideMenu title="설정" icon={SettingSVG} onClick={onSettingClick} />
      </SideBarContents>
    </StyledSideBar>
  );
};

export default SideBar;
