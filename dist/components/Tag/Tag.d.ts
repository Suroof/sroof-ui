import React from 'react';
export interface TagProps {
    /** 标签内容 */
    children?: React.ReactNode;
    /** 标签颜色 */
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | string;
    /** 标签大小 */
    size?: 'small' | 'medium' | 'large';
    /** 标签变体 */
    variant?: 'filled' | 'outlined' | 'light';
    /** 是否可关闭 */
    closable?: boolean;
    /** 是否可选择 */
    checkable?: boolean;
    /** 是否已选择（受控） */
    checked?: boolean;
    /** 默认是否选择（非受控） */
    defaultChecked?: boolean;
    /** 图标 */
    icon?: React.ReactNode;
    /** 关闭图标 */
    closeIcon?: React.ReactNode;
    /** 是否显示边框 */
    bordered?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 点击事件 */
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    /** 关闭事件 */
    onClose?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    /** 选择状态改变事件 */
    onCheckedChange?: (checked: boolean) => void;
}
export declare const Tag: React.FC<TagProps>;
//# sourceMappingURL=Tag.d.ts.map