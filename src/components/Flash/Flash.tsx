import React, { FC, ReactNode, useRef, useEffect, useState, useCallback } from "react";
import styles from "./Flash.module.scss";

export interface FlashProps {
  children: ReactNode[];
  duration?: number; // 每个元素显示的持续时间（毫秒）
  fadeInDuration?: number; // 淡入动画时间（毫秒）
  fadeOutDuration?: number; // 淡出动画时间（毫秒）
  maxVisible?: number; // 最大同时显示数量
  threshold?: number; // 触发动画的视口交集比例
  autoPlay?: boolean; // 是否自动播放
  loop?: boolean; // 是否循环播放
  onElementChange?: (currentIndex: number, element: ReactNode) => void;
  className?: string;
}

interface ElementState {
  index: number;
  isVisible: boolean;
  isAnimating: boolean;
  phase: 'entering' | 'visible' | 'leaving' | 'hidden';
}

export const Flash: FC<FlashProps> = ({
  children,
  duration = 2000,
  fadeInDuration = 500,
  fadeOutDuration = 500,
  maxVisible = 2,
  threshold = 0.1,
  autoPlay = true,
  loop = true,
  onElementChange,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [elementStates, setElementStates] = useState<ElementState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // 初始化元素状态
  useEffect(() => {
    const initialStates: ElementState[] = children.map((_, index) => ({
      index,
      isVisible: false,
      isAnimating: false,
      phase: 'hidden'
    }));
    setElementStates(initialStates);
  }, [children]);

  // 清理所有定时器
  const clearAllTimeouts = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  }, []);

  // 隐藏元素
  const hideElement = useCallback((index: number) => {
    setElementStates(prev => 
      prev.map(state => 
        state.index === index 
          ? { ...state, isAnimating: true, phase: 'leaving' }
          : state
      )
    );

    // 淡出完成后设置为隐藏状态
    const fadeOutTimeout = setTimeout(() => {
      setElementStates(prev => 
        prev.map(state => 
          state.index === index 
            ? { ...state, isVisible: false, isAnimating: false, phase: 'hidden' }
            : state
        )
      );
    }, fadeOutDuration);
    timeoutRefs.current.push(fadeOutTimeout);
  }, [fadeOutDuration]);

  // 显示元素
  const showElement = useCallback((index: number) => {
    setElementStates(prev => 
      prev.map(state => 
        state.index === index 
          ? { ...state, isVisible: true, isAnimating: true, phase: 'entering' }
          : state
      )
    );

    // 淡入完成后设置为可见状态
    const fadeInTimeout = setTimeout(() => {
      setElementStates(prev => 
        prev.map(state => 
          state.index === index 
            ? { ...state, isAnimating: false, phase: 'visible' }
            : state
        )
      );
    }, fadeInDuration);
    timeoutRefs.current.push(fadeInTimeout);

    // 显示持续时间后开始淡出
    const hideTimeout = setTimeout(() => {
      hideElement(index);
    }, duration);
    timeoutRefs.current.push(hideTimeout);

    onElementChange?.(index, children[index]);
  }, [children, duration, fadeInDuration, onElementChange, hideElement]);

  // 获取当前可见元素数量
  const getVisibleCount = useCallback(() => {
    return elementStates.filter(state => state.isVisible).length;
  }, [elementStates]);

  // 动画循环逻辑
  const startAnimation = useCallback(() => {
    if (!autoPlay || children.length === 0) return;

    clearAllTimeouts();
    setCurrentIndex(0); // 重置索引

    let index = 0;

    const showNextElement = () => {
      // 检查是否应该停止（非循环模式且已完成一轮）
      if (!loop && index >= children.length) {
        return;
      }

      // 获取当前要显示的元素索引（循环模式下取模）
      const currentElementIndex = index % children.length;
      
      // 显示当前元素
      showElement(currentElementIndex);
      
      // 移动到下一个元素
      index++;
      
      // 计算下一个元素的显示时间：当前元素的完整生命周期
      const nextElementDelay = duration + fadeOutDuration;
      
      // 设置下次显示的定时器
      const nextTimeout = setTimeout(showNextElement, nextElementDelay);
      timeoutRefs.current.push(nextTimeout);
    };

    // 开始动画
    showNextElement();
  }, [autoPlay, children.length, duration, fadeOutDuration, loop, showElement, clearAllTimeouts]);

  // Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // 当进入视口时开始动画
  useEffect(() => {
    if (isInView) {
      startAnimation();
    } else {
      clearAllTimeouts();
    }

    return () => {
      clearAllTimeouts();
    };
  }, [isInView, startAnimation, clearAllTimeouts]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.flashContainer} ${className}`.trim()}
    >
      {elementStates.map((state) => {
        const child = children[state.index];
        if (!child) return null;

        return (
          <div
            key={state.index}
            className={`
              ${styles.flashElement}
              ${state.isVisible ? styles.visible : styles.hidden}
              ${state.phase === 'entering' ? styles.entering : ''}
              ${state.phase === 'leaving' ? styles.leaving : ''}
            `.trim()}
            style={{
              '--fade-in-duration': `${fadeInDuration}ms`,
              '--fade-out-duration': `${fadeOutDuration}ms`,
            } as React.CSSProperties}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};