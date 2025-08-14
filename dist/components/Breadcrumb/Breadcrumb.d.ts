import React from 'react';
export interface BreadcrumbItem {
    /** 路径 */
    path?: string;
    /** 标题 */
    title: React.ReactNode;
    /** 点击事件 */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 自定义类名 */
    className?: string;
}
export interface BreadcrumbProps {
    /** 面包屑项目列表 */
    items?: BreadcrumbItem[];
    /** 分隔符 */
    separator?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 最大显示数量，超出时会折叠 */
    maxCount?: number;
    /** 子元素（可以直接传入 Breadcrumb.Item） */
    children?: React.ReactNode;
}
export interface BreadcrumbItemProps {
    /** 路径 */
    href?: string;
    /** 标题 */
    children: React.ReactNode;
    /** 点击事件 */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 是否为最后一项 */
    isLast?: boolean;
}
declare const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
declare const Breadcrumb: React.FC<BreadcrumbProps> & {
    Item: typeof BreadcrumbItem;
};
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.d.ts.map