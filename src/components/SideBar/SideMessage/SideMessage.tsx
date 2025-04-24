import {
  MessageItem,
  MessageBody,
  MessageHeader,
  Title,
  Time,
  Content,
  Dot,
  HeaderLeft,
  PinTriggerWrapper,
  MessageInnerWrapper,
} from './SideMessage.Style';
import PinSVG from '@assets/Sidebar/Pin.svg?react';
import SettingPinSVG from '@assets/Sidebar/SettingPin.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import useModal from '@hooks/useModal';
import EditCategory from '@components/Modal/EditCategory';
import { useAppDispatch } from '@hooks/useRedux';
import { deleteCategory, togglePin } from '@stores/modules/category';
import { formatDate } from '@utils/Date';
import FullScreenGray from '@components/Modal/Background/FullScreenGray';
import { useSelector } from 'react-redux';
import { openContextMenu, closeContextMenu } from '@stores/modules/contextMenuSlice';
import { RootState } from '@stores/config/configStore';

interface SideMessageItemProps {
  focus: boolean;
  id: string;
  color: string;
  title: string;
  content: string;
  time: Date;
  isPinned?: boolean;
}

const SideMessage = ({ focus, id, color, title, content, time, isPinned }: SideMessageItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [showPinIcon, setShowPinIcon] = useState(false);
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const isOpen = useSelector((state: RootState) => state.contextMenu.isOpen);

  const [EditCategoryModal, openEditCategoryModal] = useModal(
    `editCategory_${id}`,
    FullScreenGray,
    ({ closeModal, props }) => (
      <EditCategory id={props.id} name={props.name} initialColor={props.initialColor} closeModal={closeModal} />
    ),
    [],
    { id: id, name: title, initialColor: color },
  );

  const handleCategoryClick = useCallback(() => {
    navigate(`?category=${id}`);
  }, [navigate, id]);

  const handlePinClick = useCallback(() => {
    dispatch(togglePin(id));
    dispatch(closeContextMenu());
    setShowPinIcon(false);
  }, [dispatch, id]);

  const handleCategoryEditClick = useCallback(() => {
    openEditCategoryModal();
    dispatch(closeContextMenu());
  }, [openEditCategoryModal, dispatch]);

  const deleteCurrentCategory = useCallback(() => {
    dispatch(deleteCategory(id));
  }, [dispatch, id]);

  const handleDeleteClick = useCallback(() => {
    deleteCurrentCategory();
    dispatch(closeContextMenu());
  }, [deleteCurrentCategory, dispatch]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      openContextMenu({
        anchor: { x: e.clientX, y: e.clientY },
        props: {
          title,
          color,
          onPin: handlePinClick,
          onCategory: handleCategoryEditClick,
          onDelete: handleDeleteClick,
        },
      }),
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchTimeout.current = setTimeout(() => {
      dispatch(
        openContextMenu({
          anchor: { x: e.touches[0].clientX, y: e.touches[0].clientY },
          props: {
            title,
            color,
            onPin: handlePinClick,
            onCategory: handleCategoryEditClick,
            onDelete: handleDeleteClick,
          },
        }),
      );
    }, 600);
  };

  const handleTouchEnd = () => {
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
  };

  const handleTouchMove = () => {
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX === null) return;
    const deltaX = e.clientX - startX;

    if (deltaX > 40 && !showPinIcon) {
      setShowPinIcon(true);
    } else if (deltaX < -40 && showPinIcon) {
      setShowPinIcon(false);
    }
  };

  const handlePointerUp = () => {
    setStartX(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        dispatch(closeContextMenu());
        setShowPinIcon(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <>
      <EditCategoryModal />
      <MessageItem
        onClick={handleCategoryClick}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
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
            <SettingPinSVG onClick={handlePinClick} />
          </PinTriggerWrapper>
        )}
        <MessageInnerWrapper>
          <Dot style={{ backgroundColor: color }} />
          <MessageBody>
            <MessageHeader>
              <HeaderLeft>
                <Title>{title}</Title>
                {isPinned && <PinSVG onClick={handlePinClick} />}
              </HeaderLeft>
              <Time>
                {time.toDateString() !== new Date().toDateString()
                  ? formatDate(time, '{M}.{DD}')
                  : formatDate(time, '{hh}:{mm}')}
              </Time>
            </MessageHeader>
            <Content>{content}</Content>
          </MessageBody>
        </MessageInnerWrapper>
      </MessageItem>
    </>
  );
};

export default SideMessage;
