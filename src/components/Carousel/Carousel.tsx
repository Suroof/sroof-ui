import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.scss';

// 定义轮播项的类型
interface CarouselItem {
  id: number | string;
  imageUrl: string;
  altText: string;
}

// 定义组件的Props类型
export interface CarouselProps {
  items: CarouselItem[];
  autoplayInterval?: number; // 自动播放间隔，单位毫秒
}

export const Carousel: React.FC<CarouselProps> = ({ items, autoplayInterval = 3000 }) => {
  // 如果没有项目或项目少于1个，则不渲染
  if (!items || items.length === 0) {
    return null;
  }

  // 克隆首尾项以实现无限循环
  const displayItems = [items[items.length - 1], ...items, items[0]];

  const [currentIndex, setCurrentIndex] = useState(1); // 初始索引为1，因为0是克隆的最后一项
  const [isTransitioning, setIsTransitioning] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 切换到下一张
  const nextSlide = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  // 切换到上一张
  const prevSlide = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  // 自动播放的核心逻辑
  const startAutoplay = () => {
    if (autoplayInterval > 0) {
      autoplayTimerRef.current = setInterval(nextSlide, autoplayInterval);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  // 使用useEffect来启动和停止自动播放
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // 组件卸载时清除计时器
  }, [currentIndex]); // 当索引变化时重置计时器

  // 处理无限循环的跳转逻辑
  useEffect(() => {
    // 当过渡动画结束时
    const handleTransitionEnd = () => {
      // 如果当前是克隆的第一项，则无缝跳转到真实的最后一项
      if (currentIndex === 0) {
        setIsTransitioning(false); // 禁用过渡
        setCurrentIndex(items.length); // 跳转
      }
      // 如果当前是克隆的最后一项，则无缝跳转到真实的第一项
      else if (currentIndex === displayItems.length - 1) {
        setIsTransitioning(false); // 禁用过渡
        setCurrentIndex(1); // 跳转
      }
    };

    // 监听过渡结束事件
    const carouselWrapper = document.querySelector(`.${styles.carouselWrapper}`);
    carouselWrapper?.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      carouselWrapper?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, items.length, displayItems.length]);

  // 在无缝跳转后，重新启用过渡效果
  useEffect(() => {
    if (!isTransitioning) {
      // 使用一个微小的延迟来确保DOM更新后再启用过渡
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div
        className={styles.carouselWrapper}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {displayItems.map((item, index) => (
          <div className={styles.carouselItem} key={index}>
            <img src={item.imageUrl} alt={item.altText} />
          </div>
        ))}
      </div>

      {/* 左右导航按钮 */}
      <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`}>
        ❮
      </button>
      <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`}>
        ❯
      </button>

      {/* 指示点 */}
      <div className={styles.dotsContainer}>
        {items.map((_, index) => {
          // 计算当前激活的指示点
          let activeIndex = currentIndex - 1;
          if (currentIndex === 0) activeIndex = items.length - 1;
          if (currentIndex === displayItems.length - 1) activeIndex = 0;

          return (
            <span
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index + 1)}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
