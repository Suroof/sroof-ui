import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  /** 卡片标题 */
  title?: string;
  /** 卡片内容 */
  children?: React.ReactNode;
  /** 卡片样式 */
  className?: string;
  /** 卡片尺寸 */
  size?: "small" | "medium" | "large";
  /** 卡片类型 */
  type?: "default" | "primary" | "success" | "warning" | "danger" | "glass" | "gradient";
  /** 是否可点击 */
  clickable?: boolean;
  /** 点击事件 */
  onClick?: () => void;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示阴影 */
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  /** 头部图标 */
  icon?: React.ReactNode;
  /** 操作按钮区域 */
  actions?: React.ReactNode;
  /** 是否加载中 */
  loading?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className,
  size = "medium",
  type = "default",
  clickable = false,
  onClick,
  bordered = true,
  shadow = "md",
  icon,
  actions,
  loading = false,
}) => {
  const cardClasses = [
    styles.card,
    styles[size],
    styles[type],
    bordered ? styles.bordered : styles.borderless,
    styles[`shadow-${shadow}`],
    clickable ? styles.clickable : '',
    loading ? styles.loading : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {loading && <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
      </div>}
      
      {(title || icon || actions) && (
        <div className={styles.header}>
          <div className={styles.titleSection}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {title && <div className={styles.title}>{title}</div>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      
      <div className={styles.content}>{children}</div>
    </div>
  );
};
