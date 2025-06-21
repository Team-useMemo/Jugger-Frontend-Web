import { setModalOpen } from '@stores/modules/modal';
import { ModalName } from '@utils/Modal';
import { MenuComponentProps } from '@hooks/useMenu';
import { useAppDispatch } from '@hooks/useRedux';
import { MenuContainer, MenuContainerItem } from './Menu.Style';

const MemoBottomButtonMenu = ({ menuRef }: MenuComponentProps) => {
  const dispatch = useAppDispatch();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        setModalOpen({
          name: ModalName.addImageMemo,
          value: { image: reader.result as string },
        }),
      );
    };
    reader.readAsDataURL(file);
  };

  const handleAddSchedule = () => {
    dispatch(setModalOpen({ name: ModalName.addScheduleMemo }));
  };

  return (
    <MenuContainer ref={menuRef} width="160px" left="0" bottom="100%">
      <MenuContainerItem>
        <p>사진 추가</p>
        <input type="file" accept="image/*" onChange={handleFileSelect} />
      </MenuContainerItem>
      <MenuContainerItem>
        <p onClick={handleAddSchedule}>일정 추가</p>
      </MenuContainerItem>
    </MenuContainer>
  );
};

export default MemoBottomButtonMenu;
