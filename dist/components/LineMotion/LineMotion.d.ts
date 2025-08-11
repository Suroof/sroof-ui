import React from "react";
export interface LineMotionProps {
    /**
     * SVG路径数据字符串，定义要绘制的路径形状
     * 例如: "M10 10 L20 20" 表示从(10,10)到(20,20)的直线
     */
    pathData: string;
    /**
     * 动画是否与滚动关联
     * 默认值: false
     */
    scroll?: boolean;
    /**
     * 滚动动画的 scrub 值，可以是 boolean 或 number
     * 默认值: true
     */
    scrub?: boolean | number;
    /**
     * ScrollTrigger 的起始位置
     * 默认值: "top bottom"
     */
    start?: string;
    /**
     * ScrollTrigger 的结束位置
     * 默认值: "bottom top"
     */
    end?: string;
    /**
     * 动画持续时间（秒），仅在 scroll 为 false 时生效
     * 默认值: 2
     */
    duration?: number;
    /**
     * 动画缓动函数，仅在 scroll 为 false 时生效
     * 默认值: "power1.inOut"
     */
    ease?: string;
    /**
     * 路径描边颜色
     * 默认值: "black"
     */
    stroke?: string;
    /**
     * 路径描边宽度
     * 默认值: 3
     */
    strokeWidth?: number;
    /**
     * 可选的CSS类名，用于自定义样式
     */
    className?: string;
    /**
     * 可选的元素ID
     */
    id?: string;
    /**
     * 是否自动适应路径的边界框
     * 默认值: true
     */
    autoFit?: boolean;
    width?: string | number;
    height?: string | number;
    /**
     * 可选的内联样式
     */
    style?: React.CSSProperties;
}
export declare const LineMotion: React.FC<LineMotionProps>;
export default LineMotion;
//# sourceMappingURL=LineMotion.d.ts.map