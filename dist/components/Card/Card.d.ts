import React from "react";
export interface CardProps {
    /** 卡片标题 */
    title?: string;
    /** 卡片内容 */
    children?: React.ReactNode;
    /** 卡片样式 */
    className?: string;
    /** 卡片尺寸 */
    size?: "small" | "medium" | "large";
    /** 卡片类型 */
    type?: "default" | "primary" | "success" | "warning" | "danger" | "glass" | "gradient";
    /** 是否可点击 */
    clickable?: boolean;
    /** 点击事件 */
    onClick?: () => void;
    /** 是否显示边框 */
    bordered?: boolean;
    /** 是否显示阴影 */
    shadow?: "none" | "sm" | "md" | "lg" | "xl";
    /** 头部图标 */
    icon?: React.ReactNode;
    /** 操作按钮区域 */
    actions?: React.ReactNode;
    /** 是否加载中 */
    loading?: boolean;
}
export declare const Card: React.FC<CardProps>;
//# sourceMappingURL=Card.d.ts.map