import React from 'react';
import { IconWrapper, MenuItem, MenuTitle } from './SideMenu.Style';

interface SideMenuProps {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const SideMenu = ({ title, icon: Icon, onClick }: SideMenuProps) => {
  return (
    <MenuItem onClick={onClick}>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <MenuTitle>{title}</MenuTitle>
    </MenuItem>
  );
};

export default SideMenu;
