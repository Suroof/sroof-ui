import React from "react";
export interface CarouselItem {
    id: number | string;
    imageUrl: string;
    altText: string;
}
export interface CarouselProps {
    items: CarouselItem[];
    autoplayInterval?: number;
}
export declare const Carousel: React.FC<CarouselProps>;
//# sourceMappingURL=Carousel.d.ts.map