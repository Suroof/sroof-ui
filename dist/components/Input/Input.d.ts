import React from "react";
export interface InputProps {
    type?: string;
    placeholder?: string;
    size?: "small" | "medium" | "large";
    value?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
export declare const Input: React.FC<InputProps>;
export default Input;
//# sourceMappingURL=Input.d.ts.map