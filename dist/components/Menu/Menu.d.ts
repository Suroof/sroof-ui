import React from 'react';
export interface MenuItemProps {
    itemKey: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    danger?: boolean;
    className?: string;
    onClick?: () => void;
}
export interface SubMenuProps {
    itemKey: string;
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
export interface MenuProps {
    children: React.ReactNode;
    mode?: 'horizontal' | 'vertical' | 'inline';
    theme?: 'light' | 'dark' | 'glass';
    className?: string;
    defaultSelectedKey?: string;
    selectedKey?: string;
    onSelect?: (key: string) => void;
    expandIcon?: React.ReactNode;
    collapsible?: boolean;
}
export declare const Menu: React.FC<MenuProps>;
export declare const MenuItem: React.FC<MenuItemProps & {
    isActive?: boolean;
    mode?: string;
    theme?: string;
}>;
export declare const SubMenu: React.FC<SubMenuProps & {
    isActive?: boolean;
    isOpen?: boolean;
    onItemSelect?: (key: string) => void;
    onToggle?: (key: string) => void;
    mode?: string;
    theme?: string;
    expandIcon?: React.ReactNode;
}>;
//# sourceMappingURL=Menu.d.ts.map