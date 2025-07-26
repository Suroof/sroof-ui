import React, { useMemo } from "react";
import styles from "./Pagination.module.css";

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

// 生成页码范围的工具函数
const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = '...';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  pageSize,
  onChange,
  siblingCount = 1,
  ellipsis = "...",
  className = "",
}) => {
  // 计算总页数
  const totalPageCount = Math.ceil(total / pageSize);

  // 生成分页数组
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // 首页 + 末页 + 当前页 + 2*siblingCount

    // 如果页数少于要显示的页码数，直接返回所有页码
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(current - siblingCount, 1);
    const rightSiblingIndex = Math.min(current + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // 只显示右侧省略号
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // 只显示左侧省略号
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // 显示两侧省略号
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalPageCount, siblingCount, current]);

  // 如果页数小于等于1，不显示分页
  if (current < 1 || totalPageCount < 2) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPageCount && page !== current) {
      onChange(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(current - 1);
  };

  const handleNext = () => {
    handlePageChange(current + 1);
  };

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label="分页导航">
      {/* 上一页按钮 */}
      <button
        className={`${styles.pageButton} ${styles.prevButton} ${
          current === 1 ? styles.disabled : ''
        }`}
        onClick={handlePrevious}
        disabled={current === 1}
        aria-label="上一页"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 12l-4-4 4-4v8z"/>
        </svg>
      </button>

      {/* 页码按钮 */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span key={`dots-${index}`} className={styles.dots}>
              {ellipsis}
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            className={`${styles.pageButton} ${
              pageNumber === current ? styles.active : ''
            }`}
            onClick={() => handlePageChange(pageNumber as number)}
            aria-label={`第 ${pageNumber} 页`}
            aria-current={pageNumber === current ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 下一页按钮 */}
      <button
        className={`${styles.pageButton} ${styles.nextButton} ${
          current === totalPageCount ? styles.disabled : ''
        }`}
        onClick={handleNext}
        disabled={current === totalPageCount}
        aria-label="下一页"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 4l4 4-4 4V4z"/>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
