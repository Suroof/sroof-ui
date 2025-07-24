import React from "react";
import styles from "./Radio.module.css";

export interface RadioProps {
  /** 禁用 */
  disabled?: boolean;
  /** 选项值 */
  value: string;
  /** 选项内容 */
  children: React.ReactNode;
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中 */
  defaultChecked?: boolean;
  /** 单选框组名称 */
  name?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 自定义类名 */
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  children,
  value,
  disabled = false,
  checked,
  defaultChecked = false,
  name,
  onChange,
  className,
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

  // 受控或非受控模式
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // 非受控模式下更新内部状态
    if (checked === undefined) {
      setInternalChecked(isChecked);
    }

    // 调用外部回调
    if (onChange && isChecked) {
      onChange(value);
    }
  };

  const radioId = React.useId();

  return (
    <label
      className={`${styles.radio} ${disabled ? styles.disabled : ""} ${
        className || ""
      }`}
      htmlFor={radioId}
    >
      <input
        id={radioId}
        type="radio"
        value={value}
        checked={isChecked}
        disabled={disabled}
        name={name}
        onChange={handleChange}
      />
      <span className={styles.label}>{children}</span>
    </label>
  );
};

export interface RadioGroupProps {
  /** 单选框组的值 */
  value?: string;
  /** 默认选中的值 */
  defaultValue?: string;
  /** 单选框组名称 */
  name?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 是否禁用整个组 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
  /** 布局方向 */
  direction?: "horizontal" | "vertical";
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  name,
  onChange,
  disabled = false,
  className,
  children,
  direction = "vertical",
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const groupName = name || React.useId();

  // 受控或非受控模式
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    // 非受控模式下更新内部状态
    if (value === undefined) {
      setInternalValue(newValue);
    }

    // 调用外部回调
    if (onChange) {
      onChange(newValue);
    }
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Radio) {
        const radioProps = child.props as RadioProps;
        return React.cloneElement(child as React.ReactElement<RadioProps>, {
          ...radioProps,
          name: groupName,
          checked: currentValue !== "" && radioProps.value === currentValue,
          disabled: disabled || radioProps.disabled,
          onChange: handleChange,
        });
      }
      return child;
    });
  };

  return (
    <div
      className={`${styles.radioGroup} ${styles[direction]} ${className || ""}`}
      role="radiogroup"
    >
      {renderChildren()}
    </div>
  );
};
