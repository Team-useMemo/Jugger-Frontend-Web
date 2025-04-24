// utils/hooks/useContextMenuHandler.ts
import { useRef } from 'react';
import { useAppDispatch } from '@hooks/useRedux';
import { openContextMenu } from '@stores/modules/contextMenuSlice';

export const useContextMenuHandler = (menuProps: any) => {
  const dispatch = useAppDispatch();
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);

  const triggerContextMenu = (x: number, y: number) => {
    dispatch(openContextMenu({ anchor: { x, y }, props: menuProps }));
  };

  const handleContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    triggerContextMenu(clientX, clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchTimeout.current = setTimeout(() => handleContextMenu(e), 600);
  };

  const clearTouchTimeout = () => {
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
  };

  return { handleContextMenu, handleTouchStart, clearTouchTimeout };
};
