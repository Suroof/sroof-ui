import { FC } from "react";
export interface EmergeProps {
    /**
     * 需要进行动画的文本内容
     */
    text: string;
    /**
     * 动画的持续时间（秒）
     */
    duration?: number;
    /**
     * 每个单词/字符动画之间的交错延迟（秒）
     */
    stagger?: number;
    /**
     * 动画的垂直偏移量（像素）。正值表示从下方浮现。
     */
    y?: number;
    /**
     * 动画分割的类型
     */
    splitType?: "words" | "chars" | "lines";
    /**
     * 自定义 CSS 类名
     */
    className?: string;
}
export declare const Emerge: FC<EmergeProps>;
//# sourceMappingURL=Emerge.d.ts.map