import React from 'react';
export interface DrawerProps {
    /** 是否显示抽屉 */
    open: boolean;
    /** 关闭抽屉的回调 */
    onClose: () => void;
    /** 抽屉标题 */
    title?: string;
    /** 抽屉内容 */
    children: React.ReactNode;
    /** 抽屉位置 */
    placement?: 'left' | 'right' | 'top' | 'bottom';
    /** 抽屉尺寸 */
    size?: 'small' | 'default' | 'large';
    /** 主题 */
    theme?: 'light' | 'dark' | 'glass';
    /** 是否显示关闭按钮 */
    closable?: boolean;
    /** 是否点击遮罩层关闭 */
    maskClosable?: boolean;
    /** 底部操作区域 */
    footer?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义关闭图标 */
    closeIcon?: React.ReactNode;
    /** 动画完成后的回调 */
    afterOpenChange?: (open: boolean) => void;
}
export declare const Drawer: React.FC<DrawerProps>;
//# sourceMappingURL=Drawer.d.ts.map