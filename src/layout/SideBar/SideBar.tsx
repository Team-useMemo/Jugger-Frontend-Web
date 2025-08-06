import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalClose, setModalOpen, setModalReplace } from '@stores/modules/modal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import useParamModal, { ModalComponentProps } from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import { webPath } from '@router/index';
import JuggerButton from '@components/Common/JuggerButton';
import AddCategory from '@components/Modal/Category/CategoryEditor';
import CategoryEditor from '@components/Modal/Category/CategoryEditor';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';
import SearchSVG from '@assets/Header/search.svg?react';
import LogoPNG from '@assets/Logo.png';
import CalendarSVG from '@assets/Sidebar/Calendar.svg?react';
import ImageSVG from '@assets/Sidebar/Image.svg?react';
import LinkSVG from '@assets/Sidebar/Link.svg?react';
import SettingSVG from '@assets/Sidebar/Setting.svg?react';
import CategorySVG from '@assets/icons/category.svg?react';
import PlusSVG from '@assets/icons/plus.svg?react';
import {
  SideBarCategoryContainer,
  SideBarContainer,
  SideBarContents,
  SideBarHeader,
  SideBarMenuContainer,
  SideBarMenuItemContainer,
  SideBarSearchContainer,
} from './SideBar.style';

const SideBar = ({ modalRef }: ModalComponentProps) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const currentCategory = new URLSearchParams(window.location.search).get('category');

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
    selectFromResult: ({ data }) => ({
      data: data?.filter((memo) => memo.categoryId !== 'temp'),
    }),
  });

  const onWholeMemoClick = () => {
    setSearchParams({});
  };

  const onMemoCollectionClick = (type: 'schedule' | 'image' | 'link') => {
    dispatch(
      setModalOpen({
        name: ModalName.memoCollection,
        value: {
          type: type,
          categoryId: currentCategory ?? '',
        },
      }),
    );
  };

  const onSettingClick = () => {
    navigate(webPath.setting());
  };

  const handleClickAddCategory = () => {
    dispatch(setModalOpen({ name: ModalName.addCategory }));
  };

  const handleClickLogo = () => {
    if (isMobile) {
      if (!currentCategory) {
        dispatch(setModalClose({ name: ModalName.sideBar }));
        return;
      }
      dispatch(setModalClose({ name: ModalName.sideBar, to: '.', replace: true }));
      return;
    }
    if (!currentCategory) return;
    navigate('.');
  };

  const handleClickSearch = () => {
    dispatch(
      setModalReplace({
        prev: ModalName.sideBar,
        to: ModalName.searchMemo,
      }),
    );
  };

  const [AddCategoryModal] = useParamModal(ModalName.addCategory, ModalLayoutGray, AddCategory);
  const [EditCategoryModal] = useParamModal(ModalName.editCategory, ModalLayoutGray, CategoryEditor);

  const sidebarMenus = [
    { key: 'memo', title: '전체 메모', iconSVG: CategorySVG, onClick: onWholeMemoClick },
    ...(!isMobile
      ? [
          { key: 'schedule', title: '캘린더', iconSVG: CalendarSVG, onClick: () => onMemoCollectionClick('schedule') },
          { key: 'image', title: '사진', iconSVG: ImageSVG, onClick: () => onMemoCollectionClick('image') },
          { key: 'link', title: '링크', iconSVG: LinkSVG, onClick: () => onMemoCollectionClick('link') },
        ]
      : []),
    { key: 'setting', title: '설정', iconSVG: SettingSVG, onClick: onSettingClick },
  ];

  return (
    <SideBarContainer ref={modalRef}>
      <AddCategoryModal />
      <EditCategoryModal />
      <SideBarHeader>
        <img src={LogoPNG} onClick={handleClickLogo} />
      </SideBarHeader>
      {isMobile && (
        <SideBarSearchContainer onClick={handleClickSearch}>
          <SearchSVG />
          <input placeholder="검색" readOnly />
        </SideBarSearchContainer>
      )}
      <SideBarContents>
        <SideBarMenuContainer>
          {sidebarMenus.map((menu) => (
            <SideBarMenuItemContainer key={`SIDEBAR_MENU_${menu.key}`} onClick={menu.onClick}>
              <menu.iconSVG />
              {menu.title}
            </SideBarMenuItemContainer>
          ))}
        </SideBarMenuContainer>
        <JuggerButton size={!isMobile ? 'medium' : 'small'} color="primary" onClick={handleClickAddCategory}>
          <PlusSVG />새 카테고리 추가
        </JuggerButton>

        <SideBarCategoryContainer>
          {[
            ...categories.filter((category) => category.isPinned),
            ...categories.filter((category) => !category.isPinned),
          ].map((category, index) => (
            <SideMessage key={index} category={category} />
          ))}
        </SideBarCategoryContainer>
      </SideBarContents>
    </SideBarContainer>
  );
};

export default SideBar;
