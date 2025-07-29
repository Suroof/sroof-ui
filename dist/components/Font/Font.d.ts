import { FC, ReactNode } from 'react';
export interface FontProps {
    /**
     * 要应用浮现效果的内容。
     * 组件会为每个直接子元素应用动画。
     */
    children: ReactNode;
    /**
     * 触发动画的阈值，0.1 表示元素进入视口 10% 时触发。
     * 数值范围 0 到 1。
     */
    threshold?: number;
    /**
     * 每一行动画之间的延迟时间（毫秒）。
     */
    staggerDelay?: number;
    /**
     * 根元素的 HTML 标签，默认为 'div'。
     */
    as?: keyof JSX.IntrinsicElements;
}
export declare const Font: FC<FontProps>;
//# sourceMappingURL=Font.d.ts.map