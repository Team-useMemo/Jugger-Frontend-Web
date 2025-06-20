import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { theme } from '@styles/theme';

export const MenuContainer = styled.div(
  ({
    left,
    right,
    top,
    bottom,
    margin,
  }: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    margin?: string;
  }) => ({
    left,
    right,
    top,
    bottom,
    margin,
  }),
  {
    position: 'absolute',
    background: theme.color.background.normal,
    padding: '12px 8px',
    borderRadius: theme.radius[12],
    boxShadow: theme.shadow.strong,
    width: '160px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '1',

    ['>p,>label']: {
      margin: '0',
      textAlign: 'left',
      padding: '6px',
      boxSizing: 'border-box',

      ...theme.font.body2normal.semibold,
      color: theme.color.label.normal,
      borderRadius: theme.radius[4],

      [':active']: {
        background: theme.color.fill.normal,
      },

      ['>input']: { display: 'none' },
    },
  },
);

const useMemoCollectionMenu = (): [() => React.ReactNode, () => void] => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [open]);

  const Menu = () => {
    if (!open) return null;

    return (
      <MenuContainer ref={menuRef} right="0" top="100%" margin="0 20px">
        <p>사진</p>
        <p>링크</p>
        <p>일정</p>
      </MenuContainer>
    );
  };

  return [Menu, openMenu];
};

export default useMemoCollectionMenu;
