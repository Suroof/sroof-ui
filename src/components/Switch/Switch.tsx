import React from "react";
import styles from "./Switch.module.css";

export interface SwitchProps {
  /** 选中状态 */
  checked?: boolean;
  /** 默认选中状态 */
  defaultChecked?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 值变化回调 */
  onChange?: (checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 开关大小 */
  size?: 'small' | 'medium' | 'large';
  /** 开关标签 */
  children?: React.ReactNode;
  /** 标签位置 */
  labelPosition?: 'left' | 'right';
  /** 加载状态 */
  loading?: boolean;
  /** 自定义颜色 */
  color?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  size = 'medium',
  children,
  labelPosition = 'right',
  loading = false,
  color,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  
  // 判断是否为受控模式
  const isControlled = checked !== undefined;
  
  // 受控或非受控模式的当前值
  const isChecked = isControlled ? checked : internalChecked;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    // 非受控模式下更新内部状态
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    // 调用外部回调
    if (onChange && !loading) {
      onChange(newChecked);
    }
  };

  const switchId = React.useId();

  const switchElement = (
    <label 
      className={`${styles.switch} ${styles[size]} ${disabled ? styles.disabled : ''} ${loading ? styles.loading : ''} ${className || ''}`}
      htmlFor={switchId}
    >
      <input 
        id={switchId}
        type="checkbox" 
        checked={isChecked}
        disabled={disabled || loading}
        onChange={handleChange}
        className={styles.input}
        role="switch"
        aria-checked={isChecked.toString()}
        aria-disabled={(disabled || loading).toString()}
      />
      <span 
        className={styles.slider}
        style={color && isChecked ? { backgroundColor: color } : undefined}
      >
        {loading && <span className={styles.spinner} />}
      </span>
    </label>
  );

  if (children) {
    return (
      <div className={`${styles.switchWrapper} ${styles[`label-${labelPosition}`]}`}>
        {labelPosition === 'left' && (
          <span className={styles.label}>{children}</span>
        )}
        {switchElement}
        {labelPosition === 'right' && (
          <span className={styles.label}>{children}</span>
        )}
      </div>
    );
  }

  return switchElement;
};
