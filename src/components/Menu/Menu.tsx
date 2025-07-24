import React, { useState } from "react";
import styles from "./Menu.module.css";

export interface MenuProps {
  children: React.ReactNode;
  className?: string;
  mode?: "horizontal" | "vertical" | "inline";
  defaultSelectedKey?: string;
  onSelect?: (key: string) => void;
  theme?: "light" | "dark" | "glass";
}

export interface MenuItemProps {
  key: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SubMenuProps {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  className = "",
  mode = "horizontal",
  defaultSelectedKey = "",
  onSelect,
  theme = "light",
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);

  const menuClasses = [
    styles.menu, 
    styles[`menu-${mode}`], 
    styles[`theme-${theme}`],
    className
  ].filter(Boolean).join(" ");

  const handleItemClick = (key: string, onClick?: () => void) => {
    setSelectedKey(key);
    onSelect?.(key);
    onClick?.();
  };

  const renderMenuItems = (items: React.ReactNode) => {
    return React.Children.map(items, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === MenuItem) {
          const itemProps = child.props as MenuItemProps;
          return React.cloneElement(
            child as React.ReactElement<MenuItemProps & { isActive?: boolean }>,
            {
              isActive: itemProps.key === selectedKey,
              onClick: () => handleItemClick(itemProps.key, itemProps.onClick),
            }
          );
        }

        if (child.type === SubMenu) {
          const subMenuProps = child.props as SubMenuProps;
          return React.cloneElement(
            child as React.ReactElement<
              SubMenuProps & {
                isActive?: boolean;
                onItemSelect?: (key: string) => void;
              }
            >,
            {
              isActive: hasActiveChild(subMenuProps.children, selectedKey),
              onItemSelect: handleItemClick,
            }
          );
        }
      }
      return child;
    });
  };

  const hasActiveChild = (
    children: React.ReactNode,
    activeKey: string
  ): boolean => {
    let hasActive = false;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === MenuItem) {
        const itemProps = child.props as MenuItemProps;
        if (itemProps.key === activeKey) {
          hasActive = true;
        }
      }
    });
    return hasActive;
  };

  return <ul className={menuClasses}>{renderMenuItems(children)}</ul>;
};

export const MenuItem: React.FC<MenuItemProps & { isActive?: boolean }> = ({
  label,
  isActive = false,
  onClick,
  disabled = false,
  icon,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === "Enter" || event.key === " ") && !disabled) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <li
      className={`${styles.menuItem} ${
        isActive ? styles.menuItemActive : ""
      } ${disabled ? styles.menuItemDisabled : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div className={styles.menuItemContent}>
        {icon && <span className={styles.menuItemIcon}>{icon}</span>}
        <span className={styles.menuItemLabel}>{label}</span>
        {isActive && <div className={styles.activeIndicator}></div>}
      </div>
    </li>
  );
};

export const SubMenu: React.FC<
  SubMenuProps & { isActive?: boolean; onItemSelect?: (key: string) => void }
> = ({ label, children, isActive = false, disabled = false, onItemSelect, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === "Enter" || event.key === " ") && !disabled) {
      event.preventDefault();
      handleToggle();
    }
  };

  const renderSubMenuItems = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === MenuItem) {
        const itemProps = child.props as MenuItemProps;
        return React.cloneElement(child as React.ReactElement<MenuItemProps>, {
          onClick: () => {
            onItemSelect?.(itemProps.key);
            itemProps.onClick?.();
            setIsOpen(false);
          },
        });
      }
      return child;
    });
  };

  return (
    <li
      className={`${styles.subMenu} ${
        isActive ? styles.subMenuActive : ""
      } ${disabled ? styles.subMenuDisabled : ""} ${
        isOpen ? styles.subMenuOpen : ""
      }`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <div className={styles.subMenuTrigger}>
        {icon && <span className={styles.subMenuIcon}>{icon}</span>}
        <span className={styles.subMenuLabel}>{label}</span>
        <span className={`${styles.subMenuArrow} ${isOpen ? styles.subMenuArrowOpen : ""}`}>
          ▼
        </span>
        {isActive && <div className={styles.activeIndicator}></div>}
      </div>
      {isOpen && (
        <ul className={styles.subMenuList} role="menu">
          {renderSubMenuItems()}
        </ul>
      )}
    </li>
  );
};
