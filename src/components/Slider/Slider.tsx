import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import styles from './Slider.module.scss';

// 节流函数
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// 防抖函数
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export interface SliderMarks {
  [key: number]: React.ReactNode | {
    style?: React.CSSProperties;
    label?: React.ReactNode;
  };
}

export interface SliderProps {
  /** 当前值 */
  value?: number | [number, number];
  /** 默认值 */
  defaultValue?: number | [number, number];
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 是否为范围选择器 */
  range?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否垂直方向 */
  vertical?: boolean;
  /** 是否反向 */
  reverse?: boolean;
  /** 是否显示标记 */
  marks?: SliderMarks;
  /** 是否显示点 */
  dots?: boolean;
  /** 是否显示提示信息 */
  tooltip?: boolean | 'always';
  /** 提示信息格式化函数 */
  tipFormatter?: (value: number) => React.ReactNode;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 值变化时的回调 */
  onChange?: (value: number | [number, number]) => void;
  /** 拖拽结束后的回调 */
  onAfterChange?: (value: number | [number, number]) => void;
  /** 拖拽完成后的回调 */
  onChangeComplete?: (value: number | [number, number]) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  disabled = false,
  vertical = false,
  reverse = false,
  marks,
  dots = false,
  tooltip = true,
  tipFormatter,
  autoFocus = false,
  onChange,
  onAfterChange,
  onChangeComplete,
  className,
  style
}) => {
  // 受控组件检测
  const isControlled = value !== undefined;
  
  // 内部状态
  const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
    if (isControlled) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return range ? [min, min] : min;
  });
  
  const [dragging, setDragging] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean | [boolean, boolean]>(
    range ? [false, false] : false
  );
  
  // Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const pendingValueRef = useRef<number | [number, number] | null>(null);
  
  // 当前值
  const currentValue = isControlled ? value : internalValue;
  
  // 缓存标记值
  const markValues = useMemo(() => {
    if (!marks) return [];
    return Object.keys(marks).map(Number).sort((a, b) => a - b);
  }, [marks]);
  
  // 确保值在有效范围内
  const clampValue = useCallback((val: number) => {
    // 处理异常输入
    if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
      console.warn('Slider: Invalid value provided, using min value as fallback');
      return min;
    }
    
    let clampedValue = Math.max(min, Math.min(max, val));
    
    // 如果有步长，调整到最近的步长值
    if (step && step > 0) {
      const steps = Math.round((clampedValue - min) / step);
      clampedValue = min + steps * step;
      // 确保不超出范围
      clampedValue = Math.max(min, Math.min(max, clampedValue));
    }
    
    // 如果有标记点，优先吸附到标记点
    if (markValues.length > 0) {
      const closest = markValues.reduce((prev, curr) => 
        Math.abs(curr - clampedValue) < Math.abs(prev - clampedValue) ? curr : prev
      );
      
      // 如果距离标记点很近，吸附到标记点
      if (Math.abs(closest - clampedValue) < (step || 1) / 2) {
        clampedValue = closest;
      }
    }
    
    return clampedValue;
  }, [min, max, step, markValues]);
  
  // 获取百分比
  const getPercentage = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);
  
  // 从位置获取值
  const getValueFromPosition = useCallback((position: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) {
      console.warn('Slider: Invalid slider dimensions, using min value as fallback');
      return min;
    }
    
    // 处理异常输入
    if (typeof position !== 'number' || isNaN(position) || !isFinite(position)) {
      console.warn('Slider: Invalid position provided, using min value as fallback');
      return min;
    }
    
    let percentage;
    if (vertical) {
      const height = rect.height;
      if (height === 0) return min;
      percentage = ((rect.bottom - position) / height) * 100;
    } else {
      const width = rect.width;
      if (width === 0) return min;
      percentage = ((position - rect.left) / width) * 100;
    }
    
    if (reverse) {
      percentage = 100 - percentage;
    }
    
    // 确保百分比在有效范围内
    percentage = Math.max(0, Math.min(100, percentage));
    
    // 计算原始值
    const rawValue = min + (percentage / 100) * (max - min);
    
    // 应用约束
    return clampValue(rawValue);
  }, [min, max, vertical, reverse, clampValue]);
  
  // 更新值（立即更新内部状态，节流调用onChange）
  const updateValue = useCallback((newValue: number | [number, number], immediate = false) => {
    try {
      // 验证新值的有效性
      if (Array.isArray(newValue)) {
        if (newValue.length !== 2 || 
            typeof newValue[0] !== 'number' || typeof newValue[1] !== 'number' ||
            isNaN(newValue[0]) || isNaN(newValue[1]) ||
            !isFinite(newValue[0]) || !isFinite(newValue[1])) {
          console.warn('Slider: Invalid range value provided, ignoring update');
          return;
        }
      } else {
        if (typeof newValue !== 'number' || isNaN(newValue) || !isFinite(newValue)) {
          console.warn('Slider: Invalid single value provided, ignoring update');
          return;
        }
      }
      
      if (!isControlled) {
        setInternalValue(newValue);
      }
      
      if (immediate) {
        onChange?.(newValue);
      } else {
        throttledOnChange(newValue);
      }
      
      // 防抖调用onAfterChange
      if (!immediate) {
        debouncedOnAfterChange(newValue);
      }
    } catch (error) {
      console.error('Slider: Error updating value:', error);
    }
  }, [isControlled, onChange]);
  
  // 节流的onChange回调
  const throttledOnChange = useMemo(
    () => onChange ? throttle(onChange, 16) : () => {}, // ~60fps
    [onChange]
  );
  
  // 防抖的onAfterChange回调
  const debouncedOnAfterChange = useMemo(
    () => debounce((value: number | [number, number]) => {
      onAfterChange?.(value);
    }, 100),
    [onAfterChange]
  );
  
  // 处理鼠标按下
  const handleMouseDown = useCallback((event: React.MouseEvent, handleIndex?: number) => {
    if (disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const position = vertical ? event.clientY : event.clientX;
    const newValue = getValueFromPosition(position);
    
    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;
      const leftDistance = Math.abs(newValue - left);
      const rightDistance = Math.abs(newValue - right);
      
      if (handleIndex !== undefined) {
        setDragging(handleIndex);
      } else if (leftDistance < rightDistance) {
        // 确保新值不超过右边界
        const clampedValue = Math.min(newValue, right);
        updateValue([clampedValue, right], true);
        setDragging(0);
      } else {
        // 确保新值不小于左边界
        const clampedValue = Math.max(newValue, left);
        updateValue([left, clampedValue], true);
        setDragging(1);
      }
    } else {
      updateValue(newValue, true);
      setDragging(0);
    }
    
    setTooltipVisible(range ? [true, true] : true);
  }, [disabled, vertical, getValueFromPosition, range, currentValue, updateValue]);
  
  // 处理鼠标移动
  const handleMouseMove = useCallback((event: React.MouseEvent | MouseEvent) => {
    if (dragging === null || disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const position = vertical ? event.clientY : event.clientX;
    const newValue = getValueFromPosition(position);
    
    // 使用requestAnimationFrame优化性能，确保60fps流畅度
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      try {
        pendingValueRef.current = newValue;
        
        if (range && Array.isArray(currentValue)) {
          const [left, right] = currentValue;
          let newRangeValue: [number, number];
          
          if (dragging === 0) {
            // 拖动左侧滑块
            const newLeft = Math.min(newValue, right);
            newRangeValue = [newLeft, right];
          } else {
            // 拖动右侧滑块
            const newRight = Math.max(newValue, left);
            newRangeValue = [left, newRight];
          }
          
          // 立即更新内部状态以确保同步
          if (!isControlled) {
            setInternalValue(newRangeValue);
          }
          
          // 节流调用onChange
          if (throttledOnChange) {
            throttledOnChange(newRangeValue);
          }
        } else {
          // 单值模式
          if (!isControlled) {
            setInternalValue(newValue);
          }
          
          // 节流调用onChange
          if (throttledOnChange) {
            throttledOnChange(newValue);
          }
        }
      } catch (error) {
        console.error('Slider: Error in mouse move handler:', error);
      }
    });
  }, [dragging, disabled, vertical, getValueFromPosition, range, currentValue, isControlled, throttledOnChange]);
  
  // 处理鼠标释放
  const handleMouseUp = useCallback(() => {
    if (dragging !== null) {
      try {
        // 清理动画帧
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        
        // 获取最终值
        let finalValue: number | [number, number];
        if (pendingValueRef.current !== null) {
          finalValue = pendingValueRef.current;
          pendingValueRef.current = null;
        } else {
          finalValue = currentValue;
        }
        
        // 确保最终值的正确性
        if (range && Array.isArray(finalValue)) {
          const [left, right] = finalValue;
          finalValue = [clampValue(left), clampValue(right)];
          // 确保左值不大于右值
          if (finalValue[0] > finalValue[1]) {
            finalValue = [finalValue[1], finalValue[0]];
          }
        } else if (!Array.isArray(finalValue)) {
          finalValue = clampValue(finalValue);
        }
        
        // 触发最终的onChange（如果值发生了变化）
        if (onChange && JSON.stringify(finalValue) !== JSON.stringify(currentValue)) {
          onChange(finalValue);
        }
        
        setDragging(null);
        setTooltipVisible(range ? [false, false] : false);
        
        // 触发onAfterChange和onChangeComplete
        onAfterChange?.(finalValue);
        onChangeComplete?.(finalValue);
      } catch (error) {
        console.error('Slider: Error in mouse up handler:', error);
        // 确保状态被重置
        setDragging(null);
        setTooltipVisible(range ? [false, false] : false);
      }
    }
  }, [dragging, currentValue, onAfterChange, onChangeComplete, onChange, range, clampValue]);
  
  // 处理键盘事件
  const handleKeyDown = useCallback((event: React.KeyboardEvent, handleIndex: number) => {
    if (disabled) return;
    
    let delta = 0;
    const stepValue = step || 1;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = reverse ? stepValue : -stepValue;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = reverse ? -stepValue : stepValue;
        break;
      case 'Home':
        delta = min - (Array.isArray(currentValue) ? currentValue[handleIndex] : currentValue);
        break;
      case 'End':
        delta = max - (Array.isArray(currentValue) ? currentValue[handleIndex] : currentValue);
        break;
      case 'PageUp':
        delta = reverse ? -stepValue * 10 : stepValue * 10;
        break;
      case 'PageDown':
        delta = reverse ? stepValue * 10 : -stepValue * 10;
        break;
      default:
        return;
    }
    
    event.preventDefault();
    
    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;
      if (handleIndex === 0) {
        const newLeft = clampValue(left + delta);
        // 确保左侧值不超过右侧值
        const finalLeft = Math.min(newLeft, right);
        if (finalLeft !== left) {
          updateValue([finalLeft, right], true);
        }
      } else {
        const newRight = clampValue(right + delta);
        // 确保右侧值不小于左侧值
        const finalRight = Math.max(newRight, left);
        if (finalRight !== right) {
          updateValue([left, finalRight], true);
        }
      }
    } else {
      const newValue = clampValue((currentValue as number) + delta);
      if (newValue !== currentValue) {
        updateValue(newValue, true);
      }
    }
  }, [disabled, step, min, max, range, currentValue, clampValue, updateValue, reverse]);
  
  // 绑定全局事件
  useEffect(() => {
    if (dragging !== null) {
      const handleGlobalMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        handleMouseMove(event);
      };
      
      const handleGlobalMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        handleMouseUp();
      };
      
      const handleGlobalTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        if (event.touches.length > 0) {
          const touch = event.touches[0];
          const mouseEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY,
            preventDefault: () => event.preventDefault(),
            stopPropagation: () => event.stopPropagation()
          } as MouseEvent;
          handleMouseMove(mouseEvent);
        }
      };
      
      const handleGlobalTouchEnd = (event: TouchEvent) => {
        event.preventDefault();
        handleMouseUp();
      };
      
      // 添加键盘事件支持（ESC键取消拖拽）
      const handleGlobalKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleMouseUp();
        }
      };
      
      // 使用passive: false确保可以preventDefault
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalMouseUp, { passive: false });
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd, { passive: false });
      document.addEventListener('keydown', handleGlobalKeyDown, { passive: false });
      
      return () => {
        // 移除所有事件监听器
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
        document.removeEventListener('keydown', handleGlobalKeyDown);
        
        // 清理动画帧
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        
        // 清理pending值
        pendingValueRef.current = null;
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);
  
  // 组件卸载时的清理
  useEffect(() => {
    return () => {
      // 清理所有定时器和动画帧
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      pendingValueRef.current = null;
    };
  }, []);
  
  // 自动聚焦
  useEffect(() => {
    if (autoFocus && sliderRef.current) {
      sliderRef.current.focus();
    }
  }, [autoFocus]);
  
  // 计算轨道样式
  const trackStyle = useMemo(() => {
    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;
      const leftPercent = getPercentage(left);
      const rightPercent = getPercentage(right);
      
      if (vertical) {
        return {
          [reverse ? 'top' : 'bottom']: `${Math.min(leftPercent, rightPercent)}%`,
          height: `${Math.abs(rightPercent - leftPercent)}%`
        };
      } else {
        return {
          [reverse ? 'right' : 'left']: `${Math.min(leftPercent, rightPercent)}%`,
          width: `${Math.abs(rightPercent - leftPercent)}%`
        };
      }
    } else {
      const percent = getPercentage(currentValue as number);
      
      if (vertical) {
        return {
          [reverse ? 'top' : 'bottom']: 0,
          height: `${percent}%`
        };
      } else {
        return {
          [reverse ? 'right' : 'left']: 0,
          width: `${percent}%`
        };
      }
    }
  }, [currentValue, range, vertical, reverse, getPercentage]);
  
  // 渲染标记
  const renderMarks = useCallback(() => {
    if (!marks) return null;
    
    return (
      <div className={styles.marks}>
        {Object.entries(marks).map(([value, mark]) => {
          const percent = getPercentage(Number(value));
          const markStyle = {
            [vertical ? 'bottom' : 'left']: `${reverse ? 100 - percent : percent}%`
          };
          
          return (
            <div
              key={value}
              className={styles.mark}
              style={markStyle}
            >
              <div className={styles.markDot} />
              {typeof mark === 'object' && 'label' in mark ? (
                <div 
                  className={styles.markLabel}
                  style={mark.style}
                >
                  {mark.label}
                </div>
              ) : (
                <div className={styles.markLabel}>{mark}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [marks, vertical, reverse, getPercentage]);
  
  // 渲染点
  const renderDots = useCallback(() => {
    if (!dots) return null;
    
    const dotCount = Math.floor((max - min) / (step || 1)) + 1;
    const dotElements = [];
    
    for (let i = 0; i < dotCount; i++) {
      const value = min + i * (step || 1);
      const percent = getPercentage(value);
      const dotStyle = {
        [vertical ? 'bottom' : 'left']: `${reverse ? 100 - percent : percent}%`
      };
      
      dotElements.push(
        <div
          key={i}
          className={styles.dot}
          style={dotStyle}
        />
      );
    }
    
    return <div className={styles.dots}>{dotElements}</div>;
  }, [dots, min, max, step, vertical, reverse, getPercentage]);
  
  // 渲染滑块
  const renderHandle = useCallback((value: number, index: number) => {
    const percent = getPercentage(value);
    const handleStyle = {
      [vertical ? 'bottom' : 'left']: `${reverse ? 100 - percent : percent}%`
    };
    
    const isActive = dragging === index;
    const showTooltip = tooltip === 'always' || 
      (tooltip && (isActive || (Array.isArray(tooltipVisible) ? tooltipVisible[index] : tooltipVisible)));
    
    return (
      <div
        key={index}
        className={`${styles.handle} ${isActive ? styles.handleActive : ''} ${disabled ? styles.handleDisabled : ''}`}
        style={handleStyle}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onMouseEnter={() => {
          if (tooltip && !disabled) {
            if (range) {
              const newVisible = [...(tooltipVisible as [boolean, boolean])];
              newVisible[index] = true;
              setTooltipVisible(newVisible as [boolean, boolean]);
            } else {
              setTooltipVisible(true);
            }
          }
        }}
        onMouseLeave={() => {
          if (tooltip && !isActive) {
            if (range) {
              const newVisible = [...(tooltipVisible as [boolean, boolean])];
              newVisible[index] = false;
              setTooltipVisible(newVisible as [boolean, boolean]);
            } else {
              setTooltipVisible(false);
            }
          }
        }}
      >
        {showTooltip && (
          <div className={styles.tooltip}>
            {tipFormatter ? tipFormatter(value) : value}
          </div>
        )}
      </div>
    );
  }, [vertical, reverse, getPercentage, dragging, tooltip, tooltipVisible, disabled, min, max, handleMouseDown, handleKeyDown, tipFormatter, range]);
  
  // 渲染滑块组
  const renderHandles = useCallback(() => {
    if (range && Array.isArray(currentValue)) {
      return currentValue.map((value, index) => renderHandle(value, index));
    } else {
      return renderHandle(currentValue as number, 0);
    }
  }, [range, currentValue, renderHandle]);
  
  const sliderClasses = [
    styles.slider,
    vertical ? styles.sliderVertical : styles.sliderHorizontal,
    disabled ? styles.sliderDisabled : '',
    className || ''
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={sliderRef}
      className={sliderClasses}
      style={style}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.rail} />
      <div className={styles.track} style={trackStyle} />
      {renderDots()}
      {renderMarks()}
      {renderHandles()}
    </div>
  );
};

export default Slider;