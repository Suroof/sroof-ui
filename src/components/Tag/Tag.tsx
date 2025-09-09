import React, { useState } from 'react';
import styles from './Tag.module.scss';

export interface TagProps {
  /** 标签内容 */
  children?: React.ReactNode;
  /** 标签颜色 */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
  /** 标签大小 */
  size?: 'small' | 'medium' | 'large';
  /** 标签变体 */
  variant?: 'filled' | 'outlined' | 'light';
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否可选择 */
  checkable?: boolean;
  /** 是否已选择（受控） */
  checked?: boolean;
  /** 默认是否选择（非受控） */
  defaultChecked?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  /** 关闭图标 */
  closeIcon?: React.ReactNode;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /** 关闭事件 */
  onClose?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /** 选择状态改变事件 */
  onCheckedChange?: (checked: boolean) => void;
}

export const Tag: React.FC<TagProps> = ({
  children,
  color = 'default',
  size = 'medium',
  variant = 'filled',
  closable = false,
  checkable = false,
  checked,
  defaultChecked = false,
  icon,
  closeIcon,
  bordered = true,
  className,
  style,
  onClick,
  onClose,
  onCheckedChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [isVisible, setIsVisible] = useState(true);

  const finalChecked = checked !== undefined ? checked : isChecked;

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (checkable) {
      const newChecked = !finalChecked;
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    }
    onClick?.(event);
  };

  const handleClose = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsVisible(false);
    onClose?.(event);
  };

  const getTagClassName = () => {
    const classes = [styles.tag];

    // 尺寸
    classes.push(styles[`tag-${size}`]);

    // 变体
    classes.push(styles[`tag-${variant}`]);

    // 颜色
    const predefinedColors = ['default', 'primary', 'success', 'warning', 'danger', 'info'];
    if (predefinedColors.includes(color)) {
      classes.push(styles[`tag-${color}`]);
    } else {
      classes.push(styles.tagCustomColor);
    }

    // 状态
    if (checkable) {
      classes.push(styles.tagCheckable);
      if (finalChecked) {
        classes.push(styles.tagChecked);
      }
    }

    if (closable) {
      classes.push(styles.tagClosable);
    }

    if (!bordered) {
      classes.push(styles.tagNoBorder);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  const getCustomColorStyle = () => {
    const predefinedColors = ['default', 'primary', 'success', 'warning', 'danger', 'info'];
    if (!predefinedColors.includes(color)) {
      if (variant === 'filled') {
        return {
          backgroundColor: color,
          borderColor: color,
          color: '#ffffff',
        };
      } else if (variant === 'outlined') {
        return {
          borderColor: color,
          color: color,
          backgroundColor: 'transparent',
        };
      } else if (variant === 'light') {
        return {
          backgroundColor: `${color}20`,
          borderColor: `${color}40`,
          color: color,
        };
      }
    }
    return {};
  };

  const renderCloseIcon = () => {
    if (!closable) return null;

    return (
      <span className={styles.tagCloseIcon} onClick={handleClose}>
        {closeIcon || (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <path d="M6 4.586L2.707 1.293a1 1 0 0 0-1.414 1.414L4.586 6 1.293 9.293a1 1 0 1 0 1.414 1.414L6 7.414l3.293 3.293a1 1 0 0 0 1.414-1.414L7.414 6l3.293-3.293a1 1 0 0 0-1.414-1.414L6 4.586z" />
          </svg>
        )}
      </span>
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <span
      className={getTagClassName()}
      style={{ ...getCustomColorStyle(), ...style }}
      onClick={handleClick}
      role={checkable ? 'checkbox' : undefined}
      aria-checked={checkable ? finalChecked : undefined}
      tabIndex={checkable || onClick ? 0 : undefined}
      onKeyDown={
        checkable || onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e as any);
              }
            }
          : undefined
      }
    >
      {icon && <span className={styles.tagIcon}>{icon}</span>}
      <span className={styles.tagContent}>{children}</span>
      {renderCloseIcon()}
    </span>
  );
};
