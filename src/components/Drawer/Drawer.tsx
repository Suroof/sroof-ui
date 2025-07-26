
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Drawer.module.scss';

export interface DrawerProps {
  /** 是否显示抽屉 */
  open: boolean;
  /** 关闭抽屉的回调 */
  onClose: () => void;
  /** 抽屉标题 */
  title?: string;
  /** 抽屉内容 */
  children: React.ReactNode;
  /** 抽屉位置 */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** 抽屉尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 主题 */
  theme?: 'light' | 'dark' | 'glass';
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否点击遮罩层关闭 */
  maskClosable?: boolean;
  /** 底部操作区域 */
  footer?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 动画完成后的回调 */
  afterOpenChange?: (open: boolean) => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  placement = 'right',
  size = 'default',
  theme = 'light',
  closable = true,
  maskClosable = true,
  footer,
  className,
  closeIcon,
  afterOpenChange,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = React.useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

  // 处理动画状态
  useEffect(() => {
    if (open) {
      setAnimationState('entering');
      const timer = setTimeout(() => {
        setAnimationState('entered');
        afterOpenChange?.(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimationState('exiting');
      const timer = setTimeout(() => {
        setAnimationState('exited');
        afterOpenChange?.(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, afterOpenChange]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // 焦点管理
  useEffect(() => {
    if (open && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [open]);

  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const drawerClasses = [
    styles.drawer,
    styles[`drawer-${placement}`],
    styles[`drawer-${theme}`],
    size !== 'default' && styles[`drawer-${size}`],
    styles[animationState],
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    styles.overlay,
    styles[animationState]
  ].join(' ');

  if (!open && animationState === 'exited') {
    return null;
  }

  const drawerContent = (
    <div className={overlayClasses} onClick={handleMaskClick}>
      <div
        ref={drawerRef}
        className={drawerClasses}
        onClick={handleDrawerClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {(title || closable) && (
          <div className={styles.header}>
            {title && (
              <h3 id="drawer-title" className={styles.title}>
                {title}
              </h3>
            )}
            {closable && (
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="关闭抽屉"
              >
                {closeIcon || (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 7.293l2.146-2.147a.5.5 0 01.708.708L8.707 8l2.147 2.146a.5.5 0 01-.708.708L8 8.707l-2.146 2.147a.5.5 0 01-.708-.708L7.293 8 5.146 5.854a.5.5 0 01.708-.708L8 7.293z"/>
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
        
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

