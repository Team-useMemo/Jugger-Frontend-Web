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
import { useEffect, useRef, useState } from 'react';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';
import { useAppSelector } from '@hooks/useRedux';
import useModal from '@hooks/useModal';
import AddCategory from '@components/Modal/AddCategory';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import MemoCollection from '@components/Modal/MemoCollection/MemoCollection';

// store.dispatch(categoryAction);

const SideBar = ({ toggleMenu, closeMenu }: { toggleMenu: boolean; closeMenu: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const modalRef = useRef<HTMLDivElement>(null);
  const [AddCategoryModal, openAddCategoryModal] = useModal(
    'addCategory',
    FullScreenGray,
    ({ closeModal }) => <AddCategory closeModal={closeModal} />,
    [],
  );
  const [modalProps, setModalProps] = useState({ categoryId: category });
  const [MemoCollectionModal, openMemoCollectionModal] = useModal(
    'memoCollection',
    FullScreenGray,
    MemoCollection,
    [],
    modalProps,
  );

  const categories = useAppSelector((state) => state.categorySlice.value);

  const onWholeMemoClick = () => {
    setSearchParams({});
  };

  const onCalendarClick = () => {
    setModalProps((prev) => ({ ...prev, contentsType: 'Calendar' }));
    openMemoCollectionModal();
  };

  const onImageClick = () => {
    setModalProps((prev) => ({ ...prev, contentsType: 'Image' }));
    openMemoCollectionModal();
  };

  const onLinkClick = () => {
    setModalProps((prev) => ({ ...prev, contentsType: 'Link' }));
    openMemoCollectionModal();
  };

  const onSettingClick = () => {};

  const onAddCategoryClick = () => {
    openAddCategoryModal();
  };

  const handleLogoClick = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInsideModal = target.closest('.modal-container');

      if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isInsideModal) {
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [closeMenu]);

  return (
    <StyledSideBar active={toggleMenu}>
      <div className="modal-container">
        <AddCategoryModal />
        <MemoCollectionModal />
      </div>
      <SideBarContainer ref={modalRef}>
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
              ...categories.filter((msg) => msg.pinned),
              ...categories
                .filter((msg) => !msg.pinned)
                .sort((a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime()),
            ].map((msg, index) => (
              <SideMessage
                key={index}
                focus={category == msg.id}
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
