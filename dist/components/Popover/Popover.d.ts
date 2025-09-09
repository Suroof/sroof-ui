import React from 'react';
export interface PopoverProps {
    /** 弹出框内容 */
    content?: React.ReactNode;
    /** 弹出框标题 */
    title?: React.ReactNode;
    /** 触发元素 */
    children: React.ReactElement;
    /** 显示位置 */
    placement?: 'top' | 'right' | 'bottom' | 'left' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    /** 触发方式 */
    trigger?: 'hover' | 'focus' | 'click' | 'manual';
    /** 是否可见（受控） */
    open?: boolean;
    /** 默认是否可见（非受控） */
    defaultOpen?: boolean;
    /** 显示延迟（毫秒） */
    mouseEnterDelay?: number;
    /** 隐藏延迟（毫秒） */
    mouseLeaveDelay?: number;
    /** 弹出框最大宽度 */
    overlayStyle?: React.CSSProperties;
    /** 弹出框类名 */
    overlayClassName?: string;
    /** 箭头是否指向目标元素中心 */
    arrowPointAtCenter?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 距离目标的偏移量 [x, y] */
    offset?: [number, number];
    /** 可见性变化回调 */
    onOpenChange?: (open: boolean) => void;
    /** 获取弹出容器 */
    getPopupContainer?: () => HTMLElement;
    /** 是否在关闭时销毁内容 */
    destroyTooltipOnHide?: boolean;
}
export declare const Popover: React.FC<PopoverProps>;
//# sourceMappingURL=Popover.d.ts.map