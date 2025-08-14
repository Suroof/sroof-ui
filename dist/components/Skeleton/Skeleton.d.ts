import React from 'react';
export interface SkeletonProps {
    /** 是否显示动画效果 */
    active?: boolean;
    /** 是否显示头像占位图 */
    avatar?: boolean | {
        /** 头像的大小 */
        size?: 'large' | 'small' | 'default' | number;
        /** 头像的形状 */
        shape?: 'circle' | 'square';
    };
    /** 是否显示加载状态 */
    loading?: boolean;
    /** 设置段落占位图的属性 */
    paragraph?: boolean | {
        /** 段落行数 */
        rows?: number;
        /** 段落宽度，可以是数字、字符串或数组 */
        width?: number | string | Array<number | string>;
    };
    /** 是否显示标题占位图 */
    title?: boolean | {
        /** 标题宽度 */
        width?: number | string;
    };
    /** 当为 true 时，显示占位图。当为 false 时，显示子组件 */
    children?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
declare const Skeleton: React.FC<SkeletonProps>;
export declare const SkeletonButton: React.FC<{
    active?: boolean;
    size?: 'large' | 'small' | 'default';
    shape?: 'circle' | 'round' | 'default';
    block?: boolean;
    className?: string;
    style?: React.CSSProperties;
}>;
export declare const SkeletonInput: React.FC<{
    active?: boolean;
    size?: 'large' | 'small' | 'default';
    block?: boolean;
    className?: string;
    style?: React.CSSProperties;
}>;
export declare const SkeletonImage: React.FC<{
    active?: boolean;
    className?: string;
    style?: React.CSSProperties;
}>;
export default Skeleton;
//# sourceMappingURL=Skeleton.d.ts.map