import React from "react";
import styles from "./Notification.module.scss";

export interface NotificationProps {
  closeIcon?: React.ReactNode;
  duration?: number | null; // 支持 null 表示不自动关闭
  message?: string;
  onClick?: () => void;
  onClose?: () => void;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  show: boolean; // 外部控制显隐
}

export const Notification: React.FC<NotificationProps> = ({
  closeIcon,
  duration = 3000, // 默认 3 秒自动关闭
  message = "",
  onClick,
  onClose,
  position = "top-right",
  className,
  show,
}) => {
  const [internalShow, setInternalShow] = React.useState(show);

  // 监听 show 变化（外部控制）
  React.useEffect(() => {
    setInternalShow(show);
  }, [show]);

  // 处理自动关闭
  React.useEffect(() => {
    if (!internalShow) return;

    if (duration === null) return; // 不自动关闭

    const timer = setTimeout(() => {
      setInternalShow(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [internalShow, duration, onClose]);

  const handleClose = () => {
    setInternalShow(false);
    onClose?.();
  };

  // 只有在显示时才渲染
  if (!internalShow) {
    return null;
  }

  const notificationClass = [styles.notification, styles[position], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={notificationClass}>
      <div className={styles.content} onClick={onClick}>
        {message}
      </div>
      <button
        className={styles.close}
        onClick={handleClose}
        aria-label="关闭通知"
      >
        {closeIcon || "×"}
      </button>
    </div>
  );
};
