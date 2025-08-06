import React from "react";
export interface LineMotionProps {
    /**
     * SVG路径数据字符串，定义要绘制的路径形状
     * 例如: "M10 10 L20 20" 表示从(10,10)到(20,20)的直线
     */
    pathData: string;
    /**
     * 动画持续时间（秒）
     * 默认值: 2
     */
    duration?: number;
    /**
     * 动画缓动函数
     * 默认值: "power1.inOut"
     * 可选值参考GSAP的ease选项
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
}
export declare const LineMotion: React.FC<LineMotionProps>;
export default LineMotion;
//# sourceMappingURL=LineMotion.d.ts.map