import React from 'react';
import styles from './Breadcrumb.module.scss';

export interface BreadcrumbItem {
  /** 路径 */
  path?: string;
  /** 标题 */
  title: React.ReactNode;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}

export interface BreadcrumbProps {
  /** 面包屑项目列表 */
  items?: BreadcrumbItem[];
  /** 分隔符 */
  separator?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 最大显示数量，超出时会折叠 */
  maxCount?: number;
  /** 子元素（可以直接传入 Breadcrumb.Item） */
  children?: React.ReactNode;
}

export interface BreadcrumbItemProps {
  /** 路径 */
  href?: string;
  /** 标题 */
  children: React.ReactNode;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 是否为最后一项 */
  isLast?: boolean;
}

// 面包屑项目组件
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  children,
  onClick,
  disabled = false,
  className,
  isLast = false,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const getItemClassName = () => {
    const classes = [styles.breadcrumbItem];
    
    if (disabled) {
      classes.push(styles.disabled);
    }
    
    if (isLast) {
      classes.push(styles.last);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={getItemClassName()}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  if (onClick && !disabled && !isLast) {
    return (
      <button
        type="button"
        className={getItemClassName()}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={getItemClassName()}>
      {children}
    </span>
  );
};

// 主面包屑组件
const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
} = ({
  items = [],
  separator = '/',
  className,
  style,
  maxCount,
  children,
}) => {
  // 处理子元素
  const processChildren = () => {
    if (children) {
      const childrenArray = React.Children.toArray(children);
      return childrenArray.map((child, index) => {
        if (React.isValidElement(child) && child.type === BreadcrumbItem) {
          return React.cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {
            key: index,
            isLast: index === childrenArray.length - 1,
          });
        }
        return child;
      });
    }
    return null;
  };

  // 处理items数据
  const processItems = () => {
    if (items.length === 0) return null;

    let displayItems = [...items];

    // 如果设置了最大显示数量且超出，进行折叠处理
    if (maxCount && items.length > maxCount) {
      const firstItem = items[0];
      const lastItems = items.slice(-(maxCount - 1));
      displayItems = [firstItem, { title: '...' }, ...lastItems];
    }

    return displayItems.map((item, index) => {
      const isLast = index === displayItems.length - 1;
      const isEllipsis = item.title === '...';

      return (
        <BreadcrumbItem
          key={index}
          href={item.path}
          onClick={item.onClick}
          disabled={item.disabled || isEllipsis}
          className={item.className}
          isLast={isLast}
        >
          {item.title}
        </BreadcrumbItem>
      );
    });
  };

  const getBreadcrumbClassName = () => {
    const classes = [styles.breadcrumb];
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  const renderItems = children ? processChildren() : processItems();

  if (!renderItems || (Array.isArray(renderItems) && renderItems.length === 0)) {
    return null;
  }

  return (
    <nav className={getBreadcrumbClassName()} style={style} aria-label="面包屑导航">
      <ol className={styles.breadcrumbList}>
        {Array.isArray(renderItems) ? renderItems.map((item, index) => {
          const isLast = index === renderItems.length - 1;
          
          return (
            <li key={index} className={styles.breadcrumbListItem}>
              {item}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        }) : null}
      </ol>
    </nav>
  );
};

// 添加 Item 组件到 Breadcrumb
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;