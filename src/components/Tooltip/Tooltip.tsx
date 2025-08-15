import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.scss';

interface EventHandler {
  (...args: unknown[]): void;
}

interface ChildProps {
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
  onClick?: EventHandler;
  onFocus?: EventHandler;
  onBlur?: EventHandler;
  ref?: React.Ref<HTMLElement>;
  tabIndex?: number;
  'aria-describedby'?: string;
}

export interface TooltipProps {
  /** 提示内容 */
  title: React.ReactNode;
  /** 子元素 */
  children: React.ReactElement<ChildProps>;
  /** 显示位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus';
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 显示延迟（毫秒） */
  mouseEnterDelay?: number;
  /** 隐藏延迟（毫秒） */
  mouseLeaveDelay?: number;
  /** 层级 */
  zIndex?: number;
  /** 颜色主题 */
  color?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  trigger = 'hover',
  arrow = true,
  className,
  disabled = false,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  zIndex = 1060,
  color,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 计算tooltip位置（带重试机制）
  const calculatePosition = useCallback(() => {
    const calculate = () => {
      if (!triggerRef.current || !tooltipRef.current) {
        // 如果元素还未准备好，延迟重试
        setTimeout(calculate, 10);
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollLeft + 8;
        break;
      case 'topLeft':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft;
        break;
      case 'topRight':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.right + scrollLeft - tooltipRect.width;
        break;
      case 'bottomLeft':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft;
        break;
      case 'bottomRight':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.right + scrollLeft - tooltipRect.width;
        break;
    }

    // 边界检测
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 8;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 8;
    }
    if (top < scrollTop) top = scrollTop + 8;
    if (top + tooltipRect.height > scrollTop + viewportHeight) {
      top = scrollTop + viewportHeight - tooltipRect.height - 8;
    }

      setPosition({ top, left });
    };
    
    calculate();
  }, [placement]);

  // 显示tooltip
  const showTooltip = useCallback(() => {
    if (disabled || !title) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, mouseEnterDelay);
  }, [disabled, title, mouseEnterDelay]);

  // 安全的事件合并策略
  const mergeEventHandlers = useCallback((newHandler: EventHandler, existingHandler?: EventHandler): EventHandler => {
    return existingHandler
      ? (...args: unknown[]) => {
          existingHandler(...args);
          newHandler();
        }
      : newHandler;
  }, []);

  // 隐藏tooltip
  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, mouseLeaveDelay);
  }, [mouseLeaveDelay]);

  // 处理点击触发
  const handleClick = useCallback(() => {
    if (disabled || !title) return;

    if (trigger === 'click') {
      setVisible(!visible);
    }
  }, [disabled, title, trigger, visible]);

  // 处理焦点触发
  const handleFocus = useCallback(() => {
    if (disabled || !title) return;

    if (trigger === 'focus') {
      setVisible(true);
    }
  }, [disabled, title, trigger]);

  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      setVisible(false);
    }
  }, [trigger]);

  // 处理键盘事件
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (trigger === 'focus' && event.key === 'Escape') {
      setVisible(false);
    }
  }, [trigger]);

  // 安全的ref处理
  const handleRef = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
    
    // 处理子组件原有的ref
    const childRef = (children as any).ref;
    if (childRef) {
      if (typeof childRef === 'function') {
        childRef(node);
      } else {
        (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    }
  }, [(children as any).ref]);

  // 更新位置
  useEffect(() => {
    if (visible) {
      calculatePosition();

      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [visible, calculatePosition]);

  // 键盘事件监听
  useEffect(() => {
    if (visible && trigger === 'focus') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, trigger, handleKeyDown]);

  // 点击外部关闭
  useEffect(() => {
    if (trigger === 'click' && visible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          tooltipRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !tooltipRef.current.contains(event.target as Node)
        ) {
          setVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger, visible]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 克隆子元素并添加事件处理
  const clonedChild = React.cloneElement(children, {
    ref: handleRef,
    onMouseEnter: trigger === 'hover' 
      ? mergeEventHandlers(showTooltip, children.props.onMouseEnter)
      : children.props.onMouseEnter,
    onMouseLeave: trigger === 'hover' 
      ? mergeEventHandlers(hideTooltip, children.props.onMouseLeave)
      : children.props.onMouseLeave,
    onClick: trigger === 'click' 
      ? mergeEventHandlers(handleClick, children.props.onClick)
      : children.props.onClick,
    onFocus: trigger === 'focus' 
      ? mergeEventHandlers(handleFocus, children.props.onFocus)
      : children.props.onFocus,
    onBlur: trigger === 'focus' 
      ? mergeEventHandlers(handleBlur, children.props.onBlur)
      : children.props.onBlur,
    'aria-describedby': visible ? `tooltip-${Math.random().toString(36).substr(2, 9)}` : undefined,
    tabIndex: trigger === 'focus' && !children.props.tabIndex ? 0 : children.props.tabIndex,
  });

  const tooltipContent = visible && title && (
    <div
      ref={tooltipRef}
      className={`${styles.tooltip} ${styles[placement]} ${className || ''}`}
      style={{
        top: position.top,
        left: position.left,
        zIndex,
        backgroundColor: color,
      }}
      role="tooltip"
      aria-hidden={!visible}
      onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
      onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
    >
      <div className={styles.tooltipContent}>{title}</div>
      {arrow && <div className={styles.tooltipArrow} />}
    </div>
  );

  return (
    <>
      {clonedChild}
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;