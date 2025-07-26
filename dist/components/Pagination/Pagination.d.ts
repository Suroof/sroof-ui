import React from "react";
export interface PaginationProps {
    /** 总页数 */
    total: number;
    /** 当前页码 */
    current: number;
    /** 每页显示的数量 */
    pageSize: number;
    /** 页码改变时的回调函数 */
    onChange: (page: number) => void;
    /** 页码按钮的数量 */
    siblingCount?: number;
    /** 省略页码的样式 */
    ellipsis?: string;
    /** 自定义类名 */
    className?: string;
}
export declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map