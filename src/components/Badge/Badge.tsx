import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  /** 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 */
  count?: number;
  /** 展示封顶的数字值 */
  overflowCount?: number;
  /** 当数值为 0 时，是否展示 Badge */
  showZero?: boolean;
  /** 设置状态点的位置偏移 */
  offset?: [number, number];
  /** 设置鼠标放在状态点上时显示的文字 */
  title?: string;
  /** 不展示数字，只有一个小红点 */
  dot?: boolean;
  /** 设置 Badge 的状态 */
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  /** 在设置了 status 的前提下有效，设置状态点的文本 */
  text?: React.ReactNode;
  /** 设置状态点的颜色 */
  color?: string;
  /** 设置 Badge 的大小 */
  size?: 'default' | 'small';
  /** 自定义节点，当为空或者 undefined 时，不显示 Badge */
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
  // 计算显示的数字
  const getDisplayCount = () => {
    if (dot) return '';
    if (count === 0 && !showZero) return null;
    if (count > overflowCount) return `${overflowCount}+`;
    return count;
  };

  // 判断是否显示徽标
  const shouldShowBadge = () => {
    if (dot) return true;
    if (status) return true;
    if (count === 0) return showZero;
    return count > 0;
  };

  // 获取徽标类名
  const getBadgeClassName = () => {
    const classes = [styles.badge];
    
    if (dot) {
      classes.push(styles.dot);
    } else if (status) {
      classes.push(styles.status, styles[status]);
    } else {
      classes.push(styles.count);
    }
    
    if (size === 'small') {
      classes.push(styles.small);
    }
    
    if (!children) {
      classes.push(styles.standalone);
    }
    
    return classes.join(' ');
  };

  // 获取徽标样式
  const getBadgeStyle = (): React.CSSProperties => {
    const badgeStyle: React.CSSProperties = {};
    
    if (color && !status) {
      badgeStyle.backgroundColor = color;
    }
    
    if (offset && children) {
      badgeStyle.transform = `translate(${offset[0]}px, ${offset[1]}px)`;
    }
    
    return badgeStyle;
  };

  // 渲染徽标内容
  const renderBadgeContent = () => {
    if (status && text) {
      return (
        <span className={styles.statusWrapper}>
          <span className={getBadgeClassName()} style={getBadgeStyle()} title={title} />
          <span className={styles.statusText}>{text}</span>
        </span>
      );
    }
    
    if (!shouldShowBadge()) return null;
    
    const displayCount = getDisplayCount();
    
    return (
      <span 
        className={getBadgeClassName()} 
        style={getBadgeStyle()}
        title={title || (typeof displayCount === 'number' ? displayCount.toString() : undefined)}
      >
        {displayCount}
      </span>
    );
  };

  // 如果没有子元素，直接返回徽标
  if (!children) {
    const badgeContent = renderBadgeContent();
    if (!badgeContent) return null;
    
    return (
      <span className={`${styles.wrapper} ${className || ''}`} style={style}>
        {badgeContent}
      </span>
    );
  }

  return (
    <span className={`${styles.wrapper} ${className || ''}`} style={style}>
      {children}
      {renderBadgeContent()}
    </span>
  );
};

export default Badge;