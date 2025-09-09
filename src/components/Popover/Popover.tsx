import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './Popover.module.scss';

export interface PopoverProps {
  /** 弹出框内容 */
  content?: React.ReactNode;
  /** 弹出框标题 */
  title?: React.ReactNode;
  /** 触发元素 */
  children: React.ReactElement;
  /** 显示位置 */
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  /** 触发方式 */
  trigger?: 'hover' | 'focus' | 'click' | 'manual';
  /** 是否可见（受控） */
  open?: boolean;
  /** 默认是否可见（非受控） */
  defaultOpen?: boolean;
  /** 显示延迟（毫秒） */
  mouseEnterDelay?: number;
  /** 隐藏延迟（毫秒） */
  mouseLeaveDelay?: number;
  /** 弹出框最大宽度 */
  overlayStyle?: React.CSSProperties;
  /** 弹出框类名 */
  overlayClassName?: string;
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 距离目标的偏移量 [x, y] */
  offset?: [number, number];
  /** 可见性变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 获取弹出容器 */
  getPopupContainer?: () => HTMLElement;
  /** 是否在关闭时销毁内容 */
  destroyTooltipOnHide?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  children,
  placement = 'top',
  trigger = 'hover',
  open,
  defaultOpen = false,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  overlayStyle,
  overlayClassName,
  arrowPointAtCenter = false,
  className,
  offset = [0, 0],
  onOpenChange,
  getPopupContainer,
  destroyTooltipOnHide = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<NodeJS.Timeout>();
  const leaveTimerRef = useRef<NodeJS.Timeout>();

  const isControlled = open !== undefined;
  const finalOpen = isControlled ? open : internalOpen;

  // 清理定时器
  const clearTimers = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
  }, []);

  // 更新弹出框位置
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let top = 0;
    let left = 0;

    // 根据 placement 计算位置
    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - popoverRect.height - 12;
        left = triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'topLeft':
        top = triggerRect.top + scrollY - popoverRect.height - 12;
        left = triggerRect.left + scrollX;
        break;
      case 'topRight':
        top = triggerRect.top + scrollY - popoverRect.height - 12;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 12;
        left = triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottomLeft':
        top = triggerRect.bottom + scrollY + 12;
        left = triggerRect.left + scrollX;
        break;
      case 'bottomRight':
        top = triggerRect.bottom + scrollY + 12;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left + scrollX - popoverRect.width - 12;
        break;
      case 'leftTop':
        top = triggerRect.top + scrollY;
        left = triggerRect.left + scrollX - popoverRect.width - 12;
        break;
      case 'leftBottom':
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.left + scrollX - popoverRect.width - 12;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + scrollX + 12;
        break;
      case 'rightTop':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + scrollX + 12;
        break;
      case 'rightBottom':
        top = triggerRect.bottom + scrollY - popoverRect.height;
        left = triggerRect.right + scrollX + 12;
        break;
    }

    // 应用偏移量
    top += offset[1];
    left += offset[0];

    // 边界检测和自动调整
    if (left < 0) {
      left = 8;
    } else if (left + popoverRect.width > viewportWidth) {
      left = viewportWidth - popoverRect.width - 8;
    }

    if (top < 0) {
      top = 8;
    } else if (top + popoverRect.height > viewportHeight + scrollY) {
      top = viewportHeight + scrollY - popoverRect.height - 8;
    }

    setPosition({ top, left });
  }, [placement, offset]);

  // 显示弹出框
  const showPopover = useCallback(() => {
    clearTimers();
    enterTimerRef.current = setTimeout(() => {
      if (!isControlled) setInternalOpen(true);
      onOpenChange?.(true);
    }, mouseEnterDelay);
  }, [clearTimers, isControlled, mouseEnterDelay, onOpenChange]);

  // 隐藏弹出框
  const hidePopover = useCallback(() => {
    clearTimers();
    leaveTimerRef.current = setTimeout(() => {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
    }, mouseLeaveDelay);
  }, [clearTimers, isControlled, mouseLeaveDelay, onOpenChange]);

  // 事件处理函数
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      showPopover();
    }
  }, [trigger, showPopover]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      hidePopover();
    }
  }, [trigger, hidePopover]);

  const handleFocus = useCallback(() => {
    if (trigger === 'focus') {
      showPopover();
    }
  }, [trigger, showPopover]);

  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      hidePopover();
    }
  }, [trigger, hidePopover]);

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      if (finalOpen) {
        hidePopover();
      } else {
        showPopover();
      }
    }
  }, [trigger, finalOpen, hidePopover, showPopover]);

  // 监听位置变化
  useEffect(() => {
    if (finalOpen) {
      updatePosition();
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [finalOpen, updatePosition]);

  // 点击外部关闭
  useEffect(() => {
    if (trigger === 'click' && finalOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          triggerRef.current &&
          !popoverRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          hidePopover();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger, finalOpen, hidePopover]);

  // 清理定时器
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // 获取弹出框类名
  const getPopoverClassName = () => {
    const classes = [styles.popover];
    classes.push(styles[`popover-${placement}`]);
    if (overlayClassName) classes.push(overlayClassName);
    return classes.join(' ');
  };

  // 获取弹出框样式
  const getPopoverStyle = (): React.CSSProperties => {
    return {
      top: position.top,
      left: position.left,
      maxWidth: '350px',
      ...overlayStyle,
    };
  };

  // 克隆触发元素
  const clonedChildren = React.cloneElement(children, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;

      // 保持原有的 ref
      const { ref } = children;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object') {
        (ref as any).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouseEnter();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouseLeave();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      handleFocus();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      handleBlur();
      children.props.onBlur?.(e);
    },
    onClick: (e: React.MouseEvent) => {
      handleClick();
      children.props.onClick?.(e);
    },
    className: `${children.props.className || ''} ${className || ''}`.trim(),
  });

  // 弹出框内容
  const popoverContent = (finalOpen || !destroyTooltipOnHide) && (
    <div
      ref={popoverRef}
      className={getPopoverClassName()}
      style={getPopoverStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="tooltip"
      data-placement={placement}
    >
      <div className={styles.popoverArrow} />
      <div className={styles.popoverInner}>
        {title && <div className={styles.popoverTitle}>{title}</div>}
        <div className={styles.popoverContent}>{content}</div>
      </div>
    </div>
  );

  const container = getPopupContainer ? getPopupContainer() : document.body;

  return (
    <>
      {clonedChildren}
      {(finalOpen || !destroyTooltipOnHide) && ReactDOM.createPortal(popoverContent, container)}
    </>
  );
};

