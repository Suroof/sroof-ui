import React from "react";
export interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "text";
    size?: "small" | "medium" | "large";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map