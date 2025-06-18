import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalOpen } from '@stores/modules/modal';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import AddCategory from '@components/Modal/Category/AddCategory';
import EditCategory from '@components/Modal/Category/EditCategory';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import SideMenu from '@components/SideBar/SideMenu/SideMenu';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';
import LogoPNG from '@assets/Logo.png';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import CategorySVG from '@assets/Sidebar/Category.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import {
  AddCategoryButton,
  LogoImage,
  MessageSection,
  SideBarContainer,
  SideBarContents,
  SideBarHeader,
  StyledSideBar,
} from './SideBar.style';

const SideBar = ({ toggleMenu, closeMenu }: { toggleMenu: boolean; closeMenu: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const modalRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });

  const dispatch = useAppDispatch();

  const onWholeMemoClick = () => {
    setSearchParams({});
  };

  const onMemoCollectionClick = (type: 'schedule' | 'image' | 'link') => {
    dispatch(
      setModalOpen({
        name: ModalName.memoCollection,
        value: {
          type: type,
        },
      }),
    );
  };

  const onSettingClick = () => {
    window.alert('환경설정');
  };

  const handleClickAddCategory = () => {
    dispatch(setModalOpen({ name: ModalName.addCategory }));
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

  const [AddCategoryModal] = useParamModal(ModalName.addCategory, ModalLayoutGray, AddCategory);
  const [EditCategoryModal] = useParamModal(ModalName.editCategory, ModalLayoutGray, EditCategory);

  return (
    <StyledSideBar active={toggleMenu}>
      <AddCategoryModal />
      <EditCategoryModal />
      <SideBarContainer ref={modalRef}>
        <SideBarHeader>
          <LogoImage src={LogoPNG} onClick={handleLogoClick} />
        </SideBarHeader>
        <SideBarContents>
          <SideMenu title="전체 메모" icon={CategorySVG} onClick={onWholeMemoClick} />
          <SideMenu title="캘린더" icon={CalendarSVG} onClick={() => onMemoCollectionClick('schedule')} />
          <SideMenu title="사진" icon={ImageSVG} onClick={() => onMemoCollectionClick('image')} />
          <SideMenu title="링크" icon={LinkSVG} onClick={() => onMemoCollectionClick('link')} />
          <SideMenu title="설정" icon={SettingSVG} onClick={onSettingClick} />
          <AddCategoryButton onClick={handleClickAddCategory}>+ 새 카테고리 추가</AddCategoryButton>

          <MessageSection>
            {[...categories.filter((msg) => msg.isPinned), ...categories.filter((msg) => !msg.isPinned)].map(
              (msg, index) => (
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
              ),
            )}
          </MessageSection>
        </SideBarContents>
      </SideBarContainer>
    </StyledSideBar>
  );
};

export default SideBar;
