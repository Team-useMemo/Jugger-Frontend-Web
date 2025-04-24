// src/hooks/useContextMenu.ts
import { useState, useCallback, useEffect, useRef } from 'react';
import { Dot } from '@components/SideBar/SideMessage/SideMessage.Style';
import { ContextMenuWrapper, ContextMenuHeader, ContextMenuTitle, Divider, ContextMenuItem } from '@components/ContextMenu/ContextMenu.Style';

type ContextMenuHandlers = {
  onContextMenu: (e: React.MouseEvent | React.TouchEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
};

interface ContextMenuItemProps {
  label: string;
  onClick: () => void;
}

interface UseContextMenuProps {
  header: { color: string; title: string };
  items: ContextMenuItemProps[];
}

export const useContextMenu = ({ header, items }: UseContextMenuProps): [() => React.ReactNode, ContextMenuHandlers] => {
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = useCallback((x: number, y: number) => {
    setAnchor({ x, y });
  }, []);

  const closeMenu = useCallback(() => {
    setAnchor(null);
  }, []);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (e.type === 'contextmenu' || ('touches' in e && e.cancelable)) {
        e.preventDefault();
      }
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;

      const adjustedY = Math.min(clientY, window.innerHeight - 210);

      openMenu(clientX, adjustedY);
    },
    [openMenu],
  );

  const clearTouchTimeout = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      clearTouchTimeout();
      touchTimeoutRef.current = setTimeout(() => handleContextMenu(e), 600);

      const clear = () => clearTouchTimeout();

      document.addEventListener('touchend', clear, { once: true });
      document.addEventListener('touchmove', clear, { once: true });
    },
    [handleContextMenu],
  );

  useEffect(() => {
    return () => {
      clearTouchTimeout();
    };
  }, []);

  useEffect(() => {
    if (!anchor) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [anchor, closeMenu]);

  const ContextMenu = () => {
    if (!anchor) return null;

    return (
      <ContextMenuWrapper ref={contextMenuRef} style={{ top: anchor.y, left: anchor.x }}>
        <ContextMenuHeader>
          <Dot style={{ backgroundColor: header.color }} />
          <ContextMenuTitle>{header.title}</ContextMenuTitle>
        </ContextMenuHeader>
        <Divider />
        {items.map((item, idx) => (
          <ContextMenuItem
            key={idx}
            onClick={() => {
              item.onClick();
              closeMenu();
            }}
          >
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuWrapper>
    );
  };

  const BindContextMenuHandlers = {
    onContextMenu: handleContextMenu,
    onTouchStart: handleTouchStart,
  };

  return [ContextMenu, BindContextMenuHandlers];
};
