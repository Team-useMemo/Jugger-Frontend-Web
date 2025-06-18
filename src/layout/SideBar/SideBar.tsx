import styled from '@emotion/styled';
import { useGetCategoriesQuery } from '@stores/modules/category';
import { setModalClose, setModalOpen, setModalReplace } from '@stores/modules/modal';
import { useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ModalName } from '@utils/Modal';
import useParamModal from '@hooks/useParamModal';
import { useAppDispatch } from '@hooks/useRedux';
import { useIsMobile } from '@hooks/useWindowSize';
import JuggerButton from '@components/Common/JuggerButton';
import AddCategory from '@components/Modal/Category/AddCategory';
import EditCategory from '@components/Modal/Category/EditCategory';
import ModalLayoutGray from '@components/Modal/Layout/ModalLayoutGray';
import SideMessage from '@components/SideBar/SideMessage/SideMessage';
import { theme } from '@styles/theme';
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
} from './SideBar.style';

const SideBar = () => {
  const [, setSearchParams] = useSearchParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const { data: categories = [] } = useGetCategoriesQuery(undefined, {
    skip: !isLoggedIn,
  });

  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

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

  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const navigate = useNavigate();

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
  const [EditCategoryModal] = useParamModal(ModalName.editCategory, ModalLayoutGray, EditCategory);

  const sidebarMenus = [
    { title: '전체 메모', iconSVG: CategorySVG, onClick: onWholeMemoClick },
    ...(!isMobile
      ? [
          { title: '캘린더', iconSVG: CalendarSVG, onClick: () => onMemoCollectionClick('schedule') },
          { title: '사진', iconSVG: ImageSVG, onClick: () => onMemoCollectionClick('image') },
          { title: '링크', iconSVG: LinkSVG, onClick: () => onMemoCollectionClick('link') },
        ]
      : []),
    { title: '설정', iconSVG: SettingSVG, onClick: onSettingClick },
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
            <SideBarMenuItemContainer onClick={menu.onClick}>
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

const SideBarSearchContainer = styled.label({
  background: theme.color.background.alternative,
  margin: '12px 16px',
  boxSizing: 'border-box',
  padding: '16px 12px',
  borderRadius: theme.radius[8],
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  ['>svg']: {
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  ['>input']: {
    background: 'transparent',
    border: 'none',

    ...theme.font.body2normal.medium,

    [':focus']: {
      outline: 'none',
    },

    ['::placeholder']: {
      color: theme.color.label.alternative,
    },
  },
});

export default SideBar;
