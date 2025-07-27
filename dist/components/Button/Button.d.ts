import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** 按钮变体 */
    variant?: "primary" | "secondary" | "outline" | "text" | "danger" | "link" | "success" | "warning";
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
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map