import React from 'react';
export interface TimelineItemProps {
    children?: React.ReactNode;
    color?: string;
    dot?: React.ReactNode;
    label?: React.ReactNode;
}
export interface TimelineProps {
    children?: React.ReactNode;
    pending?: boolean | React.ReactNode;
    reverse?: boolean;
}
export declare const TimelineItem: React.FC<TimelineItemProps>;
export declare const Timeline: React.FC<TimelineProps> & {
    Item: typeof TimelineItem;
};
//# sourceMappingURL=Timeline.d.ts.map