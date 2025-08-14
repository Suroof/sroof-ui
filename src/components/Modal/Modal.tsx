import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export interface ModalProps {
  /** 是否显示模态框 */
  open: boolean;
  /** 关闭模态框的回调 */
  onClose: () => void;
  /** 模态框标题 */
  title?: string;
  /** 模态框内容 */
  children: React.ReactNode;
  /** 模态框宽度 */
  width?: string | number;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 是否点击遮罩层关闭 */
  maskClosable?: boolean;
  /** 是否显示遮罩层 */
  mask?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 底部操作区域 */
  footer?: React.ReactNode;
  /** 是否居中显示 */
  centered?: boolean;
  /** 层级 */
  zIndex?: number;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width = 520,
  closable = true,
  maskClosable = true,
  mask = true,
  className,
  footer,
  centered = false,
  zIndex = 1000,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 处理ESC键关闭
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // 禁止body滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // 处理点击遮罩层关闭
  const handleMaskClick = (event: React.MouseEvent) => {
    if (maskClosable && event.target === event.currentTarget) {
      onClose();
    }
  };

  // 焦点管理
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const modalContent = (
    <div
      className={`${styles.modalMask} ${className || ''}`}
      style={{ zIndex }}
      onClick={handleMaskClick}
    >
      {mask && <div className={styles.mask} />}
      <div className={`${styles.modalWrap} ${centered ? styles.centered : ''}`}>
        <div
          ref={modalRef}
          className={styles.modal}
          style={{ width }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {(title || closable) && (
            <div className={styles.modalHeader}>
              {title && (
                <div id="modal-title" className={styles.modalTitle}>
                  {title}
                </div>
              )}
              {closable && (
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label="关闭"
                >
                  ×
                </button>
              )}
            </div>
          )}
          <div className={styles.modalBody}>{children}</div>
          {footer && <div className={styles.modalFooter}>{footer}</div>}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;