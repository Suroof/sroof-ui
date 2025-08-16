import React from 'react';
interface EventHandler {
    (...args: unknown[]): void;
}
interface ChildProps {
    onMouseEnter?: EventHandler;
    onMouseLeave?: EventHandler;
    onClick?: EventHandler;
    onFocus?: EventHandler;
    onBlur?: EventHandler;
    ref?: React.Ref<HTMLElement>;
    tabIndex?: number;
    'aria-describedby'?: string;
}
export interface TooltipProps {
    /** 提示内容 */
    title: React.ReactNode;
    /** 子元素 */
    children: React.ReactElement<ChildProps>;
    /** 显示位置 */
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    /** 触发方式 */
    trigger?: 'hover' | 'click' | 'focus';
    /** 是否显示箭头 */
    arrow?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 显示延迟（毫秒） */
    mouseEnterDelay?: number;
    /** 隐藏延迟（毫秒） */
    mouseLeaveDelay?: number;
    /** 层级 */
    zIndex?: number;
    /** 颜色主题 */
    color?: string;
}
declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map