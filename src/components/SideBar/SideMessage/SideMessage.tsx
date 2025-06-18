import { useDeleteCategoryMutation, useTogglePinMutation } from '@stores/modules/category';
import { setModalOpen } from '@stores/modules/modal';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatDate } from '@utils/Date';
import { ModalName } from '@utils/Modal';
import { useContextMenu } from '@hooks/useContextMenu';
import { useAppDispatch } from '@hooks/useRedux';
import { webPath } from '@router/index';
import PinSVG from '@assets/Sidebar/Pin.svg?react';
import SettingPinSVG from '@assets/Sidebar/SettingPin.svg?react';
import {
  Content,
  Dot,
  HeaderLeft,
  MessageBody,
  MessageHeader,
  MessageInnerWrapper,
  MessageItem,
  PinTriggerWrapper,
  Time,
  Title,
} from './SideMessage.Style';

interface SideMessageItemProps {
  focus: boolean;
  id: string;
  title: string;
  color: string;
  isPinned: boolean;
  updateAt: Date;
  recentMessage: string;
  closeMenu: () => void;
}

const SideMessage = ({
  focus,
  id,
  color,
  title,
  recentMessage,
  updateAt,
  isPinned,
  closeMenu,
}: SideMessageItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [startX, setStartX] = useState<number | null>(null);
  const [showPinIcon, setShowPinIcon] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [togglePin] = useTogglePinMutation();

  const handleCategoryClick = useCallback(() => {
    navigate(`?category=${id}`);
    closeMenu();
  }, [navigate, id, closeMenu]);

  const handleCategoryPinClick = useCallback(() => {
    togglePin({ id, isPinned: !isPinned });
    setShowPinIcon(false);
  }, [id, isPinned, togglePin]);

  const handleCategoryDeleteClick = useCallback(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const category = currentParams.get('category');

    deleteCategory(id);
    if (category == id) navigate(webPath.memo());
  }, [deleteCategory, id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX === null) return;
    const deltaX = e.clientX - startX;

    if (deltaX > 40) setShowPinIcon(true);
    else if (deltaX < -40) setShowPinIcon(false);
  };

  const handlePointerUp = () => {
    setStartX(null);
  };

  const handleCategoryEditClick = () => {
    dispatch(
      setModalOpen({
        name: ModalName.editCategory,
        value: {
          id,
          title,
          color,
        },
      }),
    );
  };

  const [ContextMenu, BindContextMenuHandlers] = useContextMenu({
    header: { color, title },
    items: [
      { label: '즐겨찾기', onClick: handleCategoryPinClick },
      {
        label: '카테고리 변경',
        onClick: handleCategoryEditClick,
      },
      { label: '삭제', onClick: handleCategoryDeleteClick },
    ],
  });

  return (
    <>
      <ContextMenu />
      <MessageItem
        onClick={handleCategoryClick}
        {...BindContextMenuHandlers}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        focus={focus}
        style={{
          transform: showPinIcon ? 'translateX(10px)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {showPinIcon && (
          <PinTriggerWrapper
            style={{
              transform: showPinIcon ? 'translateX(0)' : 'translateX(-10px)',
              opacity: showPinIcon ? 1 : 0,
              transition: 'transform 0.25s ease, opacity 0.25s ease',
            }}
          >
            <SettingPinSVG onClick={handleCategoryPinClick} />
          </PinTriggerWrapper>
        )}
        <MessageInnerWrapper>
          <Dot style={{ backgroundColor: color }} />
          <MessageBody>
            <MessageHeader>
              <HeaderLeft>
                <Title>{title}</Title>
                {isPinned && <PinSVG onClick={handleCategoryPinClick} />}
              </HeaderLeft>
              <Time>
                {updateAt.toDateString() !== new Date().toDateString()
                  ? formatDate(updateAt, '{M}.{DD}')
                  : formatDate(updateAt, '{hh}:{mm}')}
              </Time>
            </MessageHeader>
            <Content>{recentMessage}</Content>
          </MessageBody>
        </MessageInnerWrapper>
      </MessageItem>
    </>
  );
};

export default SideMessage;
