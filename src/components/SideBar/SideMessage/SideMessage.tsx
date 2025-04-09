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
  ContextMenu,
  ContextMenuHeader,
  ContextMenuItem,
  Divider,
} from './SideMessage.Style';
import PinSVG from '@assets/Sidebar/Pin.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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

  const handleClickCategory = () => {
    navigate(`?category=${id}`);
  };

  const handlePinClick = () => {
    setIsPinnedState((prev) => !prev);
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ mouseX: e.clientX, mouseY: e.clientY });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (): void => {
    setContextMenu(null);
  };

  const handleDeleteClick = (): void => {
    setContextMenu(null);
  };

  return (
    <>
      <MessageItem onClick={handleClickCategory} onContextMenu={handleContextMenu} focus={focus}>
        <Dot style={{ backgroundColor: color, width: '12px', height: '12px' }} />
        <MessageBody>
          <MessageHeader>
            <HeaderLeft>
              <Title>{title}</Title>
              {isPinnedState && <PinSVG onClick={handlePinClick} />}
            </HeaderLeft>
            <Time>
              {time.toDateString() != new Date().toDateString()
                ? formatDate(time, '{M}.{DD}')
                : formatDate(time, '{hh}:{mm}')}
            </Time>
          </MessageHeader>
          <Content>{content}</Content>
        </MessageBody>
      </MessageItem>
      {contextMenu && (
        <ContextMenu ref={contextMenuRef} style={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}>
          <ContextMenuHeader>
            <Dot style={{ backgroundColor: color, width: '12px', height: '12px' }} />
            <Title>{title}</Title>
          </ContextMenuHeader>
          <Divider />
          <ContextMenuItem onClick={handlePinClick}>즐겨찾기</ContextMenuItem>
          <ContextMenuItem onClick={handleCategoryClick}>카테고리 설정</ContextMenuItem>
          <ContextMenuItem onClick={handleDeleteClick}>삭제</ContextMenuItem>
        </ContextMenu>
      )}
    </>
  );
};

export default SideMessage;
