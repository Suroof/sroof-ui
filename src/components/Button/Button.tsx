import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  /* 按钮内容*/
  children: React.ReactNode;
  /* 按钮类型*/
  variant?: "primary" | "secondary" | "outline" | "text";
  /* 按钮大小*/
  size?: "small" | "medium" | "large";
  /* 按钮点击事件*/
  onClick?: () => void;
  /* 按钮禁用状态*/
  disabled?: boolean;
  /* 按钮样式*/
  className?: string;
}

/* 
基础按钮组件
*/
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
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
