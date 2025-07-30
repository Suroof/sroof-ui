import { FC } from "react";
export interface ProgressProps {
    progress: number;
    variant?: "linear" | "circular";
    size?: "small" | "medium" | "large";
    color?: string;
    showPercentage?: boolean;
    className?: string;
    /** 是否为条纹样式 (仅线性进度条有效) */
    striped?: boolean;
}
export declare const Progress: FC<ProgressProps>;
//# sourceMappingURL=Progress.d.ts.map