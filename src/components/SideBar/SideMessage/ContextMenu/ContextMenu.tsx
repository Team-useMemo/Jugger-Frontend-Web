import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@stores/config/configStore';
import { ContextMenuWrapper, ContextMenuHeader, ContextMenuTitle, ContextMenuItem, Divider } from './ContextMenu.Style';
import { Dot } from '../SideMessage.Style';
import { closeContextMenu } from '@stores/modules/contextMenuSlice';
import { useEffect, useRef } from 'react';

const ContextMenu = () => {
  const dispatch = useDispatch();
  const { isOpen, anchor, props } = useSelector((state: RootState) => state.contextMenu);

  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeContextMenu());
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        dispatch(closeContextMenu());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  if (!isOpen || !anchor || !props) return null;

  return (
    <ContextMenuWrapper ref={contextMenuRef} style={{ top: anchor.y, left: anchor.x }}>
      <ContextMenuHeader>
        <Dot style={{ backgroundColor: props.color }} />
        <ContextMenuTitle>{props.title}</ContextMenuTitle>
      </ContextMenuHeader>
      <Divider />
      <ContextMenuItem
        onClick={() => {
          props.onPin();
          dispatch(closeContextMenu());
        }}
      >
        즐겨찾기
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          props.onCategory();
          dispatch(closeContextMenu());
        }}
      >
        카테고리 설정
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => {
          props.onDelete();
          dispatch(closeContextMenu());
        }}
      >
        삭제
      </ContextMenuItem>
    </ContextMenuWrapper>
  );
};

export default ContextMenu;
