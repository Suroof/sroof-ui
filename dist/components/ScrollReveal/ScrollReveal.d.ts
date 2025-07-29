import React, { FC, ReactNode } from "react";
export interface ScrollRevealProps {
    children: ReactNode;
    threshold?: number;
    staggerDelay?: number;
    as?: React.ElementType;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
}
export declare const ScrollReveal: FC<ScrollRevealProps>;
//# sourceMappingURL=ScrollReveal.d.ts.map