import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  /** 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 */
  count?: number;
  /** 展示封顶的数字值，默认为 99 */
  overflowCount?: number;
  /** 当数值为 0 时，是否展示 Badge */
  showZero?: boolean;
  /** 设置徽标的位置偏移，格式为 [x, y] */
  offset?: [number, number];
  /** 设置鼠标悬停时显示的提示文字 */
  title?: string;
  /** 不展示数字，只显示一个小红点 */
  dot?: boolean;
  /** 设置 Badge 的状态类型 */
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  /** 在设置了 status 的前提下有效，设置状态点的描述文本 */
  text?: React.ReactNode;
  /** 设置徽标的自定义颜色（不适用于 status 模式） */
  color?: string;
  /** 设置 Badge 的大小 */
  size?: 'default' | 'small';
  /** 包裹的子元素，当为空时 Badge 将独立显示 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  count = 0,
  overflowCount = 99,
  showZero = false,
  offset,
  title,
  dot = false,
  status,
  text,
  color,
  size = 'default',
  children,
  className,
  style,
}) => {
  // 参数验证
  if (overflowCount < 0) {
    console.warn('Badge: overflowCount should be a positive number');
  }
  
  if (count !== undefined && typeof count !== 'number') {
    console.warn('Badge: count should be a number');
  }
  // 计算显示的数字
  const getDisplayCount = () => {
    if (dot) return '';
    if (typeof count !== 'number') return null;
    if (count === 0 && !showZero) return null;
    if (count > overflowCount) return `${overflowCount}+`;
    return count;
  };

  // 判断是否显示徽标
  const shouldShowBadge = () => {
    if (dot) return true;
    if (status) return true;
    if (typeof count !== 'number') return false;
    if (count === 0) return showZero;
    return count > 0;
  };

  // 获取徽标类名
  const getBadgeClassName = () => {
    const classes = [styles.badge];
    
    if (dot) {
      classes.push(styles.dot);
    } else if (status) {
      classes.push(styles.status);
      if (styles[status]) {
        classes.push(styles[status]);
      }
    } else {
      classes.push(styles.count);
    }
    
    if (size === 'small') {
      classes.push(styles.small);
    }
    
    if (!children) {
      classes.push(styles.standalone);
    }
    
    return classes.filter(Boolean).join(' ');
  };

  // 获取徽标样式
  const getBadgeStyle = (): React.CSSProperties => {
    const badgeStyle: React.CSSProperties = {};
    
    // 自定义颜色（仅在非状态模式下生效）
    if (color && !status) {
      badgeStyle.backgroundColor = color;
      // 确保文本颜色对比度
      if (!color.includes('rgb') && !color.includes('#')) {
        badgeStyle.color = '#fff';
      }
    }
    
    // 位置偏移（仅在有子元素时生效）
    if (offset && children && Array.isArray(offset) && offset.length === 2) {
      const [x, y] = offset;
      if (typeof x === 'number' && typeof y === 'number') {
        badgeStyle.transform = `translate(${x}px, ${y}px)`;
      }
    }
    
    return badgeStyle;
  };

  // 渲染徽标内容
  const renderBadgeContent = () => {
    // 状态点模式：显示状态点和文本
    if (status) {
      return (
        <span className={styles.statusWrapper}>
          <span 
            className={getBadgeClassName()} 
            style={getBadgeStyle()} 
            title={title}
            role="status"
            aria-label={`状态: ${status}${text ? `, ${text}` : ''}`}
          />
          {text && <span className={styles.statusText}>{text}</span>}
        </span>
      );
    }
    
    // 检查是否应该显示徽标
    if (!shouldShowBadge()) return null;
    
    const displayCount = getDisplayCount();
    
    // 数字或点模式
    return (
      <span 
        className={getBadgeClassName()} 
        style={getBadgeStyle()}
        title={title || (typeof displayCount === 'number' ? displayCount.toString() : undefined)}
        role={dot ? "status" : "img"}
        aria-label={dot ? "通知指示器" : `计数: ${displayCount}`}
      >
        {displayCount}
      </span>
    );
  };

  const badgeContent = renderBadgeContent();
  
  // 如果没有徽标内容且没有子元素，返回 null
  if (!badgeContent && !children) {
    return null;
  }
  
  // 构建包装器类名
  const wrapperClassName = [
    styles.wrapper,
    className
  ].filter(Boolean).join(' ');
  
  // 如果没有子元素，直接返回徽标
  if (!children) {
    return (
      <span className={wrapperClassName} style={style}>
        {badgeContent}
      </span>
    );
  }

  return (
    <span className={wrapperClassName} style={style}>
      {children}
      {badgeContent}
    </span>
  );
};

export default Badge;