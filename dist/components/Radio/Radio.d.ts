import React from "react";
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
export declare const Radio: React.FC<RadioProps>;
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
export declare const RadioGroup: React.FC<RadioGroupProps>;
//# sourceMappingURL=Radio.d.ts.map