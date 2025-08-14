import React, { useState } from 'react';
import styles from './Alert.module.scss';

export interface AlertProps {
  /** 警告提示内容 */
  message?: React.ReactNode;
  /** 警告提示的辅助性文字介绍 */
  description?: React.ReactNode;
  /** 指定警告提示的样式 */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 默认不显示关闭按钮 */
  closable?: boolean;
  /** 关闭时触发的回调函数 */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 自定义关闭按钮 */
  closeText?: React.ReactNode;
  /** 相关操作 */
  action?: React.ReactNode;
  /** 辅助图标 */
  icon?: React.ReactNode;
  /** 是否显示辅助图标 */
  showIcon?: boolean;
  /** 是否用作顶部公告 */
  banner?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 动画结束后触发的回调函数 */
  afterClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  message,
  description,
  type = 'info',
  closable = false,
  onClose,
  closeText,
  action,
  icon,
  showIcon = false,
  banner = false,
  className,
  style,
  afterClose,
}) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  // 获取默认图标
  const getDefaultIcon = () => {
    const iconMap = {
      success: (
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
        </svg>
      ),
      info: (
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" />
        </svg>
      ),
      warning: (
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" />
        </svg>
      ),
      error: (
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130.1 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
        </svg>
      ),
    };
    return iconMap[type];
  };

  // 处理关闭
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosing(true);
    onClose?.(e);
    
    // 延迟隐藏以显示动画
    setTimeout(() => {
      setVisible(false);
      afterClose?.();
    }, 300);
  };

  // 获取Alert类名
  const getAlertClassName = () => {
    const classes = [styles.alert];
    
    classes.push(styles[type]);
    
    if (banner) {
      classes.push(styles.banner);
    }
    
    if (showIcon || icon) {
      classes.push(styles.withIcon);
    }
    
    if (description) {
      classes.push(styles.withDescription);
    }
    
    if (closing) {
      classes.push(styles.closing);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={getAlertClassName()} style={style} role="alert">
      {(showIcon || icon) && (
        <div className={styles.icon}>
          {icon || getDefaultIcon()}
        </div>
      )}
      
      <div className={styles.content}>
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
        
        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}
      </div>
      
      {action && (
        <div className={styles.action}>
          {action}
        </div>
      )}
      
      {closable && (
        <button 
          type="button" 
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="关闭"
        >
          {closeText || (
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3.1-3.6-7.6-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3.1 3.6 7.6 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default Alert;