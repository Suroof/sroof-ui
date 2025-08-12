import { FC } from "react";
export interface ProgressThreeDProps {
    modelPath?: string;
    height?: number;
    showProgress?: boolean;
    showInstructions?: boolean;
    sensitivity?: number;
    onProgressChange?: (progress: number) => void;
}
export declare const ProgressThreeD: FC<ProgressThreeDProps>;
//# sourceMappingURL=ProgressThreeD.d.ts.map