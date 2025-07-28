import { FC, ReactNode } from 'react';
export interface ScrollCardItem {
    id: string | number;
    imageUrl: string;
    title: ReactNode;
    description?: ReactNode;
}
export interface ScrollCardProps {
    items: ScrollCardItem[];
    speed?: number;
    cardWidth?: number;
}
export declare const ScrollCard: FC<ScrollCardProps>;
//# sourceMappingURL=ScrollCard.d.ts.map