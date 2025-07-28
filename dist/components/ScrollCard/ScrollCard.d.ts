import { FC, ReactNode } from 'react';
export interface ScrollCardItem {
    id: string | number;
    imageUrl: string;
    title: ReactNode;
    description?: ReactNode;
}
export interface ScrollCardProps {
    items: ScrollCardItem[];
    /** 动画持续时间（秒）。数值越大，滚动越慢。 */
    speed?: number;
    /** 每个卡片的宽度，单位为像素 */
    cardWidth?: number;
}
export declare const ScrollCard: FC<ScrollCardProps>;
//# sourceMappingURL=ScrollCard.d.ts.map