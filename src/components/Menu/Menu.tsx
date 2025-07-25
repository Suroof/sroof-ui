import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './Menu.module.css';

// 菜单项接口
export interface MenuItemProps {
  itemKey: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
  onClick?: () => void;
}

// 子菜单接口
export interface SubMenuProps {
  itemKey: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

// 主菜单接口
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

// 主菜单组件
export const Menu: React.FC<MenuProps> = ({
  children,
  className = "",
  mode = "horizontal",
  defaultSelectedKey = "",
  selectedKey: controlledSelectedKey,
  onSelect,
  theme = "light",
  expandIcon,
  collapsible = false,
}) => {
  const [internalSelectedKey, setInternalSelectedKey] = useState(defaultSelectedKey);
  const [openSubMenus, setOpenSubMenus] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLUListElement>(null);
  
  const selectedKey = controlledSelectedKey ?? internalSelectedKey;
  
  const menuClasses = [
    styles.menu, 
    styles[`menu-${mode}`], 
    styles[`theme-${theme}`],
    className
  ].filter(Boolean).join(" ");

  const handleItemClick = useCallback((key: string, onClick?: () => void) => {
    if (controlledSelectedKey === undefined) {
      setInternalSelectedKey(key);
    }
    onSelect?.(key);
    onClick?.();
  }, [controlledSelectedKey, onSelect]);

  const handleSubMenuToggle = useCallback((key: string) => {
    setOpenSubMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key } = event;
    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
    if (!menuItems) return;

    const currentIndex = Array.from(menuItems).findIndex(
      item => item === document.activeElement
    );

    let nextIndex = currentIndex;

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = mode === 'horizontal' ? currentIndex : (currentIndex + 1) % menuItems.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = mode === 'horizontal' ? currentIndex : (currentIndex - 1 + menuItems.length) % menuItems.length;
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = mode === 'horizontal' ? (currentIndex + 1) % menuItems.length : currentIndex;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = mode === 'horizontal' ? (currentIndex - 1 + menuItems.length) % menuItems.length : currentIndex;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = menuItems.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      (menuItems[nextIndex] as HTMLElement).focus();
    }
  }, [mode]);

  const renderMenuItems = (items: React.ReactNode) => {
    return React.Children.map(items, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === MenuItem) {
          const itemProps = child.props as MenuItemProps;
          return React.cloneElement(
            child as React.ReactElement<MenuItemProps & { 
              isActive?: boolean;
              mode?: string;
              theme?: string;
            }>,
            {
              isActive: itemProps.itemKey === selectedKey,
              onClick: () => handleItemClick(itemProps.itemKey, itemProps.onClick),
              mode,
              theme,
            }
          );
        }

        if (child.type === SubMenu) {
          const subMenuProps = child.props as SubMenuProps;
          return React.cloneElement(
            child as React.ReactElement<
              SubMenuProps & {
                isActive?: boolean;
                isOpen?: boolean;
                onItemSelect?: (key: string) => void;
                onToggle?: (key: string) => void;
                mode?: string;
                theme?: string;
                expandIcon?: React.ReactNode;
              }
            >,
            {
              isActive: hasActiveChild(subMenuProps.children, selectedKey),
              isOpen: openSubMenus.has(subMenuProps.itemKey),
              onItemSelect: handleItemClick,
              onToggle: handleSubMenuToggle,
              mode,
              theme,
              expandIcon,
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
        if (itemProps.itemKey === activeKey) {
          hasActive = true;
        }
      }
    });
    return hasActive;
  };

  useEffect(() => {
    if (controlledSelectedKey !== undefined) {
      setInternalSelectedKey(controlledSelectedKey);
    }
  }, [controlledSelectedKey]);

  return (
    <ul 
      ref={menuRef}
      className={menuClasses}
      role="menubar"
      onKeyDown={handleKeyDown}
      aria-orientation={mode === 'horizontal' ? 'horizontal' : 'vertical'}
    >
      {renderMenuItems(children)}
    </ul>
  );
};

// 菜单项组件
export const MenuItem: React.FC<MenuItemProps & {
  isActive?: boolean;
  mode?: string;
  theme?: string;
}> = ({
  children,
  className = "",
  itemKey,
  onClick,
  disabled = false,
  icon,
  isActive = false,
  mode = "horizontal",
  theme = "light",
  danger = false,
}) => {
  const itemClasses = [
    styles.menuItem,
    isActive && styles.active,
    disabled && styles.disabled,
    danger && styles.danger,
    styles[`item-${mode}`],
    styles[`item-${theme}`],
    className
  ].filter(Boolean).join(" ");

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <li 
      className={itemClasses} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </li>
  );
};

// 子菜单组件
export const SubMenu: React.FC<SubMenuProps & {
  isActive?: boolean;
  isOpen?: boolean;
  onItemSelect?: (key: string) => void;
  onToggle?: (key: string) => void;
  mode?: string;
  theme?: string;
  expandIcon?: React.ReactNode;
}> = ({
  children,
  title,
  className = "",
  itemKey,
  icon,
  disabled = false,
  isActive = false,
  isOpen = false,
  onItemSelect,
  onToggle,
  mode = "horizontal",
  theme = "light",
  expandIcon,
}) => {
  const subMenuRef = useRef<HTMLUListElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  const subMenuClasses = [
    styles.subMenu,
    isOpen && styles.open,
    isActive && styles.active,
    disabled && styles.disabled,
    styles[`submenu-${mode}`],
    styles[`submenu-${theme}`],
    className
  ].filter(Boolean).join(" ");

  const handleToggle = () => {
    if (!disabled && onToggle) {
      onToggle(itemKey);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  useEffect(() => {
    if (subMenuRef.current) {
      setMaxHeight(isOpen ? `${subMenuRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  const renderSubMenuItems = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === MenuItem) {
        const itemProps = child.props as MenuItemProps;
        return React.cloneElement(
          child as React.ReactElement<MenuItemProps & {
            onClick?: () => void;
            mode?: string;
            theme?: string;
          }>,
          {
            onClick: () => {
              onItemSelect?.(itemProps.itemKey);
              itemProps.onClick?.();
            },
            mode,
            theme,
          }
        );
      }
      return null;
    });
  };

  const defaultExpandIcon = isOpen ? (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <li className={subMenuClasses}>
      <div 
        className={styles.subMenuTitle} 
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{title}</span>
        <span className={styles.arrow}>
          {expandIcon || defaultExpandIcon}
        </span>
      </div>
      <ul 
        ref={subMenuRef}
        className={styles.subMenuList}
        style={{ maxHeight }}
        role="menu"
        aria-hidden={!isOpen}
      >
        {renderSubMenuItems()}
      </ul>
    </li>
  );
};