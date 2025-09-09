import React from 'react';
export interface TimelineItem {
    /** 时间轴内容 */
    children?: React.ReactNode;
    /** 时间轴颜色 */
    color?: 'blue' | 'red' | 'green' | 'gray' | string;
    /** 自定义时间轴点 */
    dot?: React.ReactNode;
    /** 时间轴标签 */
    label?: React.ReactNode;
    /** 位置 */
    position?: 'left' | 'right';
}
export interface TimelineProps {
    /** 时间轴项目列表 */
    items?: TimelineItem[];
    /** 时间轴模式 */
    mode?: 'left' | 'alternate' | 'right';
    /** 是否为待处理状态 */
    pending?: boolean | React.ReactNode;
    /** 待处理状态的时间轴点 */
    pendingDot?: React.ReactNode;
    /** 是否倒序显示 */
    reverse?: boolean;
    /** 子元素 */
    children?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
export declare const Timeline: React.FC<TimelineProps>;
//# sourceMappingURL=Timeline.d.ts.map