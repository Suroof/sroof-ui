import React from "react";
export interface MenuProps {
    children: React.ReactNode;
    className?: string;
    mode?: "horizontal" | "vertical" | "inline";
    defaultSelectedKey?: string;
    onSelect?: (key: string) => void;
}
export interface MenuItemProps {
    key: string;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}
export interface SubMenuProps {
    key: string;
    label: string;
    children: React.ReactNode;
    disabled?: boolean;
}
export declare const Menu: React.FC<MenuProps>;
export declare const MenuItem: React.FC<MenuItemProps & {
    isActive?: boolean;
}>;
export declare const SubMenu: React.FC<SubMenuProps & {
    isActive?: boolean;
    onItemSelect?: (key: string) => void;
}>;
//# sourceMappingURL=Menu.d.ts.map