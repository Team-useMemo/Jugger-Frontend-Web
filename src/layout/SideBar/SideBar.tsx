import CategorySVG from '@assets/Sidebar/Category.svg?react';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import SideMenu from '@components/SideBar/SideMenu/SideMenu';
import LogoPNG from '@assets/Logo.png';
import {
  AddCategoryButton,
  LogoImage,
  MessageSection,
  SideBarContainer,
  SideBarContents,
  SideBarHeader,
  StyledSideBar,
} from './SideBar.style';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';
import useModal from '@hooks/useModal';
import AddCategory from '@components/Modal/AddCategory';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoCollection from '@components/Modal/MemoCollection/MemoCollection';
import { useGetCategoriesQuery } from '@stores/modules/category';

const SideBar = ({ toggleMenu, closeMenu }: { toggleMenu: boolean; closeMenu: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const modalRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [], } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [AddCategoryModal, openAddCategoryModal] = useModal('addCategory',
    FullScreenGray,
    ({ closeModal }) => <AddCategory closeModal={closeModal} />,
    [],
  );
  const [MemoCollectionModal, openMemoCollectionModal] = useModal(
    'memoCollection',
    FullScreenGray,
    MemoCollection,
    [],
  );
  const onWholeMemoClick = () => {
    setSearchParams({});
  };

  const onCalendarClick = () => {
    openMemoCollectionModal({
      categoryId: category,
      contentsType: 'Calendar',
    });
  };

  const onImageClick = () => {
    openMemoCollectionModal({
      categoryId: category,
      contentsType: 'Image',
    });
  };

  const onLinkClick = () => {
    openMemoCollectionModal({
      categoryId: category,
      contentsType: 'Link',
    });
  };

  const onSettingClick = () => { };

  const onAddCategoryClick = () => {
    openAddCategoryModal();
  };

  const handleLogoClick = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (modalRef.current && !modalRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <StyledSideBar active={toggleMenu} ref={modalRef}>
      <AddCategoryModal />
      <MemoCollectionModal />
      <SideBarContainer>
        <SideBarHeader>
          <LogoImage src={LogoPNG} onClick={handleLogoClick} />
        </SideBarHeader>
        <SideBarContents>
          <SideMenu title="전체 메모" icon={CategorySVG} onClick={onWholeMemoClick} />
          <SideMenu title="캘린더" icon={CalendarSVG} onClick={onCalendarClick} />
          <SideMenu title="사진" icon={ImageSVG} onClick={onImageClick} />
          <SideMenu title="링크" icon={LinkSVG} onClick={onLinkClick} />
          <SideMenu title="설정" icon={SettingSVG} onClick={onSettingClick} />
          <AddCategoryButton onClick={onAddCategoryClick}>+ 새 카테고리 추가</AddCategoryButton>

          <MessageSection>
            {[
              ...categories.filter((msg) => msg.isPinned),
              ...categories
                .filter((msg) => !msg.isPinned)
            ].map((msg, index) => (
              <SideMessage
                key={index}
                focus={category == msg.uuid}
                id={msg.uuid}
                color={msg.color}
                title={msg.name}
                isPinned={msg.isPinned}
                updateAt={msg.updateAt}
                recentMessage={msg.recentMessage}
                closeMenu={closeMenu}
              />
            ))}
          </MessageSection>
        </SideBarContents>
      </SideBarContainer>
    </StyledSideBar>
  );
};

export default SideBar;
