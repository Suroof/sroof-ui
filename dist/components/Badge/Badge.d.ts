import React from 'react';
export interface BadgeProps {
    /** 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 */
    count?: number;
    /** 展示封顶的数字值，默认为 99 */
    overflowCount?: number;
    /** 当数值为 0 时，是否展示 Badge */
    showZero?: boolean;
    /** 设置徽标的位置偏移，格式为 [x, y] */
    offset?: [number, number];
    /** 设置鼠标悬停时显示的提示文字 */
    title?: string;
    /** 不展示数字，只显示一个小红点 */
    dot?: boolean;
    /** 设置 Badge 的状态类型 */
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    /** 在设置了 status 的前提下有效，设置状态点的描述文本 */
    text?: React.ReactNode;
    /** 设置徽标的自定义颜色（不适用于 status 模式） */
    color?: string;
    /** 设置 Badge 的大小 */
    size?: 'default' | 'small';
    /** 包裹的子元素，当为空时 Badge 将独立显示 */
    children?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map