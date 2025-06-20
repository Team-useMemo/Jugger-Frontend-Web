import { useCallback, useEffect, useRef, useState } from 'react';

export type MenuComponentProps = {
  menuRef?: React.RefObject<HTMLDivElement | null>;
  props?: any;
  actions?: any[];
  closeMenu?: () => void;
};

const useMenu = (
  Component: ({ menuRef, props }: MenuComponentProps) => React.ReactNode,
  props?: any,
  actions?: any[],
): [() => React.ReactNode, () => void] => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setOpen(true);
    console.log('open');
  };
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

  const Menu = useCallback(() => {
    if (!open) return null;

    return <Component menuRef={menuRef} props={props} actions={actions} closeMenu={closeMenu} />;
  }, [open, props]);

  return [Menu, openMenu];
};

export default useMenu;
