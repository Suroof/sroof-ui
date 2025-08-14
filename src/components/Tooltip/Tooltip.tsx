import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.scss';

export interface TooltipProps {
  /** 提示内容 */
  title: React.ReactNode;
  /** 子元素 */
  children: React.ReactElement;
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

  // 计算tooltip位置
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

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

  // 显示tooltip
  const showTooltip = () => {
    if (disabled || !title) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, mouseEnterDelay);
  };

  // 隐藏tooltip
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, mouseLeaveDelay);
  };

  // 处理点击触发
  const handleClick = () => {
    if (disabled || !title) return;
    
    if (trigger === 'click') {
      setVisible(!visible);
    }
  };

  // 处理焦点触发
  const handleFocus = () => {
    if (disabled || !title) return;
    
    if (trigger === 'focus') {
      setVisible(true);
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      setVisible(false);
    }
  };

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
  }, [visible, placement]);

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
    ref: triggerRef,
    onMouseEnter: trigger === 'hover' ? showTooltip : children.props.onMouseEnter,
    onMouseLeave: trigger === 'hover' ? hideTooltip : children.props.onMouseLeave,
    onClick: trigger === 'click' ? handleClick : children.props.onClick,
    onFocus: trigger === 'focus' ? handleFocus : children.props.onFocus,
    onBlur: trigger === 'focus' ? handleBlur : children.props.onBlur,
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