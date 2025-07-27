import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './Carousel.module.scss';

export interface CarouselProps {
  children: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slideSet, setSlideSet] = useState({ prev: 0, current: 0, next: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const realSlideCount = children.length;
  
  // 获取幻灯片内容的稳定函数
  const getSlideContent = useCallback((index: number) => {
    const normalizedIndex = ((index % realSlideCount) + realSlideCount) % realSlideCount;
    return children[normalizedIndex];
  }, [children, realSlideCount]);
  
  // 在开始拖拽时固定当前的幻灯片集合
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTransitionEnabled(false);
    
    // 固定当前的幻灯片集合，防止滑动过程中变化
    const prevIndex = currentIndex - 1;
    const currIndex = currentIndex;
    const nextIndex = currentIndex + 1;
    
    setSlideSet({
      prev: prevIndex,
      current: currIndex,
      next: nextIndex
    });
  };
  
  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setCurrentX(deltaX);
  };
  
  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaX = currentX;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const threshold = containerWidth / 3;
    
    let newIndex = currentIndex;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // 向右滑动
        newIndex = currentIndex - 1;
      } else {
        // 向左滑动
        newIndex = currentIndex + 1;
      }
    }
    
    // 只有在索引真正改变时才更新
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
    
    setCurrentX(0);
    setTransitionEnabled(true);
  };
  
  // 计算当前显示的幻灯片（基于固定的slideSet）
  const renderSlides = () => {
    return [
      <div 
        className={styles.slide} 
        key={`prev-${slideSet.prev}`} 
        data-index={slideSet.prev}
      >
        {getSlideContent(slideSet.prev)}
      </div>,
      <div 
        className={styles.slide} 
        key={`current-${slideSet.current}`} 
        data-index={slideSet.current}
      >
        {getSlideContent(slideSet.current)}
      </div>,
      <div 
        className={styles.slide} 
        key={`next-${slideSet.next}`} 
        data-index={slideSet.next}
      >
        {getSlideContent(slideSet.next)}
      </div>
    ];
  };
  
  // 计算偏移量
  const offset = -100 + (isDragging ? (currentX / (containerRef.current?.offsetWidth || 1)) * 100 : 0);
  
  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };
  
  const handleMouseUp = () => {
    handleEnd();
  };
  
  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    handleEnd();
  };
  
  return (
    <div className={styles.carousel}>
      <div
        ref={containerRef}
        className={styles.container}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`${styles.slides} ${transitionEnabled ? styles.transition : ''}`}
          style={{ transform: `translateX(${offset}%)` }}
        >
          {renderSlides()}
        </div>
      </div>
    </div>
  );
};