import { forwardRef } from 'react';
import { ContextMenuWrapper, ContextMenuHeader, ContextMenuTitle, ContextMenuItem, Divider } from './ContextMenu.Style';
import { Dot } from '../SideMessage.Style';

interface Props {
  anchor: { x: number; y: number };
  title: string;
  color: string;
  onPin: () => void;
  onCategory: () => void;
  onDelete: () => void;
}

const ContextMenu = forwardRef<HTMLDivElement, Props>(({ anchor, title, color, onPin, onCategory, onDelete }, ref) => {
  return (
    <ContextMenuWrapper ref={ref} style={{ top: anchor.y, left: anchor.x }}>
      <ContextMenuHeader>
        <Dot style={{ backgroundColor: color }} />
        <ContextMenuTitle>{title}</ContextMenuTitle>
      </ContextMenuHeader>
      <Divider />
      <ContextMenuItem onClick={onPin}>즐겨찾기</ContextMenuItem>
      <ContextMenuItem onClick={onCategory}>카테고리 설정</ContextMenuItem>
      <ContextMenuItem onClick={onDelete}>삭제</ContextMenuItem>
    </ContextMenuWrapper>
  );
});

export default ContextMenu;
