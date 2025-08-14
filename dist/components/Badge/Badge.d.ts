import React from 'react';
export interface BadgeProps {
    /** 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 */
    count?: number;
    /** 展示封顶的数字值 */
    overflowCount?: number;
    /** 当数值为 0 时，是否展示 Badge */
    showZero?: boolean;
    /** 设置状态点的位置偏移 */
    offset?: [number, number];
    /** 设置鼠标放在状态点上时显示的文字 */
    title?: string;
    /** 不展示数字，只有一个小红点 */
    dot?: boolean;
    /** 设置 Badge 的状态 */
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    /** 在设置了 status 的前提下有效，设置状态点的文本 */
    text?: React.ReactNode;
    /** 设置状态点的颜色 */
    color?: string;
    /** 设置 Badge 的大小 */
    size?: 'default' | 'small';
    /** 自定义节点，当为空或者 undefined 时，不显示 Badge */
    children?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map