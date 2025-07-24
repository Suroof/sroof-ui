import React from "react";
export interface FormItemProps {
    /** 字段标签 */
    label?: string;
    /** 是否必填 */
    required?: boolean;
    /** 错误信息 */
    error?: string;
    /** 帮助文本 */
    help?: string;
    /** 自定义类名 */
    className?: string;
    /** 子元素 */
    children: React.ReactNode;
    /** 标签位置 */
    labelPosition?: 'top' | 'left';
}
export interface FormProps {
    /** 表单提交回调 */
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    /** 表单布局 */
    layout?: 'vertical' | 'horizontal' | 'inline';
    /** 自定义类名 */
    className?: string;
    /** 子元素 */
    children: React.ReactNode;
    /** 表单大小 */
    size?: 'small' | 'medium' | 'large';
    /** 是否显示边框 */
    bordered?: boolean;
}
export declare const FormItem: React.FC<FormItemProps>;
export declare const Form: React.FC<FormProps>;
export interface FormActionsProps {
    /** 对齐方式 */
    align?: 'left' | 'center' | 'right';
    /** 自定义类名 */
    className?: string;
    /** 子元素 */
    children: React.ReactNode;
}
export declare const FormActions: React.FC<FormActionsProps>;
//# sourceMappingURL=Form.d.ts.map