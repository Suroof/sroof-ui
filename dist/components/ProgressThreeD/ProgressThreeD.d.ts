import { FC } from "react";
export interface ProgressThreeDProps {
    modelPath?: string;
    sensitivity?: number;
    initialRotation?: [number, number, number];
    onProgressChange?: (progress: number) => void;
}
export declare const ProgressThreeD: FC<ProgressThreeDProps>;
//# sourceMappingURL=ProgressThreeD.d.ts.map