import React from "react";
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
export declare const Switch: React.FC<SwitchProps>;
//# sourceMappingURL=Switch.d.ts.map