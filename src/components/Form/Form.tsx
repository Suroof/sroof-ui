import React from "react";
import styles from "./Form.module.css";

export interface FormItemProps {
  /** 字段标签 */
  label?: string;
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  error?: string;
  /** 帮助文本 */
  help?: string;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
  /** 标签位置 */
  labelPosition?: 'top' | 'left';
}

export interface FormProps {
  /** 表单提交回调 */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** 表单布局 */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
  /** 表单大小 */
  size?: 'small' | 'medium' | 'large';
  /** 是否显示边框 */
  bordered?: boolean;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  required = false,
  error,
  help,
  className,
  children,
  labelPosition = 'top',
}) => {
  const itemId = React.useId();

  return (
    <div
      className={`${styles.formItem} ${styles[`label-${labelPosition}`]} ${
        error ? styles.error : ''
      } ${className || ''}`}
    >
      {label && (
        <label htmlFor={itemId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.control}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const additionalProps: Record<string, unknown> = {
              id: itemId,
            };
            
            if (error) {
              additionalProps['aria-describedby'] = `${itemId}-error`;
              additionalProps['aria-invalid'] = true;
            } else if (help) {
              additionalProps['aria-describedby'] = `${itemId}-help`;
            }
            
            return React.cloneElement(child, additionalProps);
          }
          return child;
        })}
      </div>
      {error && (
        <div id={`${itemId}-error`} className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
      {help && !error && (
        <div id={`${itemId}-help`} className={styles.helpText}>
          {help}
        </div>
      )}
    </div>
  );
};

export const Form: React.FC<FormProps> = ({
  onSubmit,
  layout = 'vertical',
  className,
  children,
  size = 'medium',
  bordered = true,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      className={`${styles.form} ${styles[layout]} ${styles[size]} ${
        bordered ? styles.bordered : ''
      } ${className || ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {children}
    </form>
  );
};

// 表单操作区域组件
export interface FormActionsProps {
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
}

export const FormActions: React.FC<FormActionsProps> = ({
  align = 'left',
  className,
  children,
}) => {
  return (
    <div className={`${styles.formActions} ${styles[`align-${align}`]} ${className || ''}`}>
      {children}
    </div>
  );
};