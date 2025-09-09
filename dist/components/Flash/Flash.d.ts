import { FC, ReactNode } from "react";
export interface FlashProps {
    children: ReactNode[];
    duration?: number;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    maxVisible?: number;
    threshold?: number;
    autoPlay?: boolean;
    loop?: boolean;
    onElementChange?: (currentIndex: number, element: ReactNode) => void;
    className?: string;
}
export declare const Flash: FC<FlashProps>;
//# sourceMappingURL=Flash.d.ts.map