import { FC } from "react";
export interface ProgressProps {
    /**
     * 当前进度百分比 (0-100)
     */
    progress: number;
    /**
     * 进度条的样式变体
     * @default 'linear'
     */
    variant?: "linear" | "circular";
    /**
     * 进度条的尺寸/厚度
     * @default 'medium'
     */
    size?: "small" | "medium" | "large";
    /**
     * 自定义进度条颜色 (接受任何有效的 CSS 颜色值)
     */
    color?: string;
    /**
     * 是否显示百分比文字
     * @default true
     */
    showPercentage?: boolean;
    /**
     * 自定义 CSS 类名
     */
    className?: string;
    /**
     * 是否启用动画效果
     * @default true
     */
    animated?: boolean;
    /**
     * 是否显示条纹效果
     * @default false
     */
    striped?: boolean;
    /**
     * 是否启用脉冲效果
     * @default false
     */
    pulse?: boolean;
}
export declare const Progress: FC<ProgressProps>;
//# sourceMappingURL=Progress.d.ts.map