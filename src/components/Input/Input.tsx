import React from "react";
import styles from "./Input.module.css";

export interface InputProps {
  type?: string;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  size,
  disabled,
  className = "",
  onChange,
}) => {
  const inputClasses = [
    styles.input,
    styles[`input-${type}`],
    styles[`input-${size}`],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <input
      className={inputClasses}
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;
