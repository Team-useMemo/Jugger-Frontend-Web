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
import { useAppSelector } from '@hooks/useRedux';
import useModal from '@hooks/useModal';
import AddCategory from '@components/Modal/AddCategory';
import GatherContents from '@components/Modal/GatherContents';

// store.dispatch(categoryAction);

const SideBar = ({ toggleMenu, closeMenu }: { toggleMenu: boolean; closeMenu: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const modalRef = useRef<HTMLDivElement>(null);
  const [AddCategoryModal, openAddCategoryModal] = useModal(AddCategory, [], {});
  const [contentsType, setContentsType] = useState('');
  const [GatherContentsModal, openGatherContentsModal] = useModal(GatherContents, [], {
    categoryId: category,
    contentsType,
  });

  const categoryId = searchParams.get('category');

  const categories = useAppSelector((state) => state.categorySlice.value);

  const onWholeMemoClick = () => {
    alert('전체 메모');
  };
  const onCalendarClick = () => {
    setContentsType('Calendar');
    openGatherContentsModal();
  };
  const onImageClick = () => {
    setContentsType('Image');
    openGatherContentsModal();
  };
  const onLinkClick = () => {
    setContentsType('Link');
    openGatherContentsModal();
  };
  const onSettingClick = () => {};
  const onAddCategoryClick = () => {
    openAddCategoryModal();
  }; // 카테고리 추가 버튼 클릭 핸들러

  const handleLogoClick = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  });

  return (
    <StyledSideBar active={toggleMenu}>
      <AddCategoryModal />
      <GatherContentsModal />
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
            {categories.map((msg, index) => (
              <SideMessage
                key={index}
                focus={categoryId == msg.id}
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
