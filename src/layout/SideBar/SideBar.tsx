import CategorySVG from '@assets/Sidebar/Category.svg?react';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import SideMenu from '@components/SideBar/SideMenu/SideMenu';
import LogoPNG from '@assets/Logo.png';
import {
  AddCategoryButton,
  MessageSection,
  SideBarContainer,
  SideBarContents,
  SideBarHeader,
  StyledSideBar,
} from './SideBar.style';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';
import { fetchCategory } from '@controllers/api';

const SideBar = ({ toggleMenu, closeMenu }: { toggleMenu: boolean; closeMenu: () => void }) => {
  const [, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);

  const [Categories] = useState(fetchCategory('asd'));

  const onWholeMemoClick = () => {
    alert('전체 메모');
  };
  const onCalendarClick = () => {};
  const onImageClick = () => {};
  const onLinkClick = () => {};
  const onSettingClick = () => {};
  const onAddCategoryClick = () => {}; // 카테고리 추가 버튼 클릭 핸들러

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
          <AddCategoryButton onClick={onAddCategoryClick}>+ 새 카테고리 추가</AddCategoryButton>

          <MessageSection>
            {Categories.map((msg, index) => (
              <SideMessage
                key={index}
                id={msg.id}
                color={msg.color}
                title={msg.title}
                content={msg.content}
                time={msg.lastDate}
                isPinned={msg.pinned}
              />
            ))}
          </MessageSection>
        </SideBarContents>
      </SideBarContainer>
    </StyledSideBar>
  );
};

export default SideBar;
