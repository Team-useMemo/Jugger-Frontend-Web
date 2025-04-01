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
import { useEffect, useRef } from 'react';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';

const sideMessages = [
  {
    color: '#9C27B0',
    title: '4월 여행 계획',
    content: '스미스 머신 스쿼트 3세트 * 20kg',
    time: '3.02',
    isPinned: true,
  },
  {
    color: '#2196F3',
    title: '푸꾸옥 여행',
    content: '푸꾸옥(호핑투어 → 후꾸옥코스트 → 피크타임) 오션펄 아일랜드 → 아시장...',
    time: '3.02',
    isPinned: true,
  },
  {
    color: '#F44336',
    title: '독서록',
    content: '도리안 그레이의 초상',
    time: '3.02',
    isPinned: false,
  },
  {
    color: '#00BCD4',
    title: 'Daily',
    content: '운동 가기',
    time: '3.02',
    isPinned: false,
  },
  {
    color: '#FFC107',
    title: 'Jugger',
    content: 'UI Component 제작',
    time: '13:03',
    isPinned: false,
  },
  {
    color: '#00BCD4',
    title: 'Daily',
    content: '운동 가기',
    time: '3.02',
    isPinned: false,
  },
  {
    color: '#FFC107',
    title: 'Jugger',
    content: 'UI Component 제작',
    time: '13:03',
    isPinned: false,
  },
  {
    color: '#00BCD4',
    title: 'Daily',
    content: '운동 가기',
    time: '3.02',
    isPinned: false,
  },
  {
    color: '#FFC107',
    title: 'Jugger',
    content: 'UI Component 제작',
    time: '13:03',
    isPinned: false,
  },
  {
    color: '#00BCD4',
    title: 'Daily',
    content: '운동 가기',
    time: '3.02',
    isPinned: false,
  },
  {
    color: '#FFC107',
    title: 'Jugger',
    content: 'UI Component 제작',
    time: '13:03',
    isPinned: false,
  },
];

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
            {sideMessages.map((msg, index) => (
              <SideMessage
                key={index}
                color={msg.color}
                title={msg.title}
                content={msg.content}
                time={msg.time}
                isPinned={msg.isPinned}
              />
            ))}
          </MessageSection>
        </SideBarContents>
      </SideBarContainer>
    </StyledSideBar>
  );
};

export default SideBar;
