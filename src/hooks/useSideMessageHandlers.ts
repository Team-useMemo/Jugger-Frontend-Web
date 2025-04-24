import { openContextMenu } from '@stores/modules/contextMenuSlice';
import { useRef, useState } from 'react';
import { useAppDispatch } from './useRedux';

export const useSideMessageHandlers = ({
  title,
  color,
  handlePinClick,
  handleCategoryEditClick,
  handleDeleteClick,
  setShowPinIcon,
}: any) => {
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const triggerContextMenu = (x: number, y: number) => {
    dispatch(
      openContextMenu({
        anchor: { x, y },
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerContextMenu(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchTimeout.current = setTimeout(() => {
      triggerContextMenu(e.touches[0].clientX, e.touches[0].clientY);
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

    if (deltaX > 40) setShowPinIcon(true);
    else if (deltaX < -40) setShowPinIcon(false);
  };

  const handlePointerUp = () => {
    setStartX(null);
  };

  return {
    handleContextMenu,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
