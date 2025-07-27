import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "text"
    | "danger"
    | "link"
    | "success"
    | "warning";
  /** 按钮大小 */
  size?: "small" | "medium" | "large";
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children: React.ReactNode;
  /** 按钮类型 */
  type?: "button" | "submit" | "reset";
  /** 圆角控制 */
  rounded?: "none" | "small" | "medium" | "large";
}

/* 
基础按钮组件
*/
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  rounded="medium",
  onClick,
  disabled = false,
  className = "",
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    styles[`button-rounded-${rounded}`],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
export default Button;
