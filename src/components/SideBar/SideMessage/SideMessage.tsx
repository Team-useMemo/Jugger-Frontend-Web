import formatDate from '@utils/Date';
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
} from './SideMessage.Style';
import PinSVG from '@assets/Sidebar/Pin.svg?react';
import SettingPinSVG from '@assets/Sidebar/SettingPin.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import ContextMenu from './ContextMenu/ContextMenu';

interface SideMessageItemProps {
  focus: boolean;
  id: number;
  color: string;
  title: string;
  content: string;
  time: Date;
  isPinned?: boolean;
}

const SideMessage = ({ focus, id, color, title, content, time, isPinned }: SideMessageItemProps) => {
  const navigate = useNavigate();
  const [isPinnedState, setIsPinnedState] = useState(isPinned);
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [showPinIcon, setShowPinIcon] = useState(false);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const handleClickCategory = useCallback(() => {
    navigate(`?category=${id}`);
  }, [navigate, id]);

  const handlePinClick = useCallback(() => {
    setIsPinnedState((prev) => !prev);
    closeContextMenu();
    setShowPinIcon(false);
  }, [closeContextMenu]);

  const handleCategoryClick = useCallback(() => {
    closeContextMenu();
  }, [closeContextMenu]);

  const handleDeleteClick = useCallback(() => {
    closeContextMenu();
  }, [closeContextMenu]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ mouseX: e.clientX, mouseY: e.clientY });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX !== null) {
      const deltaX = e.clientX - startX;
      if (deltaX > 40) {
        setShowPinIcon(true);
      } else if (deltaX < -40) {
        setShowPinIcon(false);
      }
    }
  };

  const handlePointerUp = () => {
    setStartX(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        closeContextMenu();
        setShowPinIcon(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeContextMenu]);

  return (
    <>
      <MessageItem
        onClick={handleClickCategory}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        focus={focus}
      >
        {showPinIcon && (
          <PinTriggerWrapper>
            <SettingPinSVG onClick={handlePinClick} />
          </PinTriggerWrapper>
        )}

        <Dot style={{ backgroundColor: color }} />
        <MessageBody>
          <MessageHeader>
            <HeaderLeft>
              <Title>{title}</Title>
              {isPinnedState && <PinSVG onClick={handlePinClick} />}
            </HeaderLeft>
            <Time>
              {time.toDateString() !== new Date().toDateString()
                ? formatDate(time, '{M}.{DD}')
                : formatDate(time, '{hh}:{mm}')}
            </Time>
          </MessageHeader>
          <Content>{content}</Content>
        </MessageBody>
      </MessageItem>
      {contextMenu && (
        <ContextMenu
          ref={contextMenuRef}
          anchor={{ x: contextMenu.mouseX, y: contextMenu.mouseY }}
          title={title}
          color={color}
          onPin={handlePinClick}
          onCategory={handleCategoryClick}
          onDelete={handleDeleteClick}
        />
      )}
    </>
  );
};

export default SideMessage;
