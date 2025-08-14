import React from 'react';
export interface AvatarProps {
    /** 头像的图片地址 */
    src?: string;
    /** 图像无法显示时的替代文本 */
    alt?: string;
    /** 头像的尺寸 */
    size?: number | 'large' | 'default' | 'small';
    /** 头像的形状 */
    shape?: 'circle' | 'square';
    /** 头像的图标 */
    icon?: React.ReactNode;
    /** 文字头像 */
    children?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 */
    onError?: () => boolean | void;
    /** 点击事件 */
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    /** 是否可拖拽 */
    draggable?: boolean;
    /** 头像组合时的间距，可以是数字或响应式对象 */
    gap?: number;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map