import { setModalOpen } from '@stores/modules/modal';
import { ModalName } from '@utils/Modal';
import { MenuComponentProps } from '@hooks/useMenu';
import { useAppDispatch } from '@hooks/useRedux';
import { MenuContainer, MenuContainerItem } from './Menu.Style';

const MemoCollectionMenu = ({ menuRef }: MenuComponentProps) => {
  const dispatch = useAppDispatch();
  const handleOpenMemoCollection = (type: 'schedule' | 'image' | 'link') => {
    dispatch(
      setModalOpen({
        name: ModalName.memoCollection,
        value: {
          type: type,
          categoryId: new URLSearchParams(window.location.search).get('category') ?? '',
        },
      }),
    );
  };

  return (
    <MenuContainer ref={menuRef} right="0" top="100%" margin="0 20px" width="160px">
      <MenuContainerItem onClick={() => handleOpenMemoCollection('image')}>
        <p>사진</p>
      </MenuContainerItem>
      <MenuContainerItem onClick={() => handleOpenMemoCollection('link')}>
        <p>링크</p>
      </MenuContainerItem>
      <MenuContainerItem onClick={() => handleOpenMemoCollection('schedule')}>
        <p>일정</p>
      </MenuContainerItem>
    </MenuContainer>
  );
};

export default MemoCollectionMenu;
