import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styles from './Slider.module.scss';

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
  step?: number | null;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为范围选择器 */
  range?: boolean;
  /** 是否垂直方向 */
  vertical?: boolean;
  /** 是否包含关系 */
  included?: boolean;
  /** 是否显示工具提示 */
  tooltip?: {
    /** 是否显示 */
    open?: boolean;
    /** 格式化函数 */
    formatter?: (value?: number) => React.ReactNode;
    /** 位置 */
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  };
  /** 刻度标记 */
  marks?: SliderMarks;
  /** 是否只能拖拽到刻度上 */
  dots?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 值变化时的回调 */
  onChange?: (value: number | [number, number]) => void;
  /** 拖拽开始时的回调 */
  onAfterChange?: (value: number | [number, number]) => void;
  /** 拖拽时的回调 */
  onChangeComplete?: (value: number | [number, number]) => void;
  /** 自动获取焦点 */
  autoFocus?: boolean;
  /** 反向坐标轴 */
  reverse?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  range = false,
  vertical = false,
  included = true,
  tooltip,
  marks,
  dots = false,
  className,
  style,
  onChange,
  onAfterChange,
  onChangeComplete,
  autoFocus = false,
  reverse = false,
}) => {
  const getDefaultValue = (): number | [number, number] => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return range ? [min, max] as [number, number] : min;
  };
  
  const [internalValue, setInternalValue] = useState<number | [number, number]>(getDefaultValue());
  const [dragging, setDragging] = useState<number | null>(null); // 0: 左侧/下侧, 1: 右侧/上侧
  const [tooltipVisible, setTooltipVisible] = useState<boolean[]>([false, false]);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  // 确保值在有效范围内
  const clampValue = useCallback((val: number) => {
    let clampedValue = Math.max(min, Math.min(max, val));
    
    // 处理步长
    if (step !== null && step > 0) {
      const steps = Math.round((clampedValue - min) / step);
      clampedValue = min + steps * step;
    }
    
    // 处理刻度点
    if (dots && marks) {
      const markValues = Object.keys(marks).map(Number).sort((a, b) => a - b);
      if (markValues.length > 0) {
        let closestMark = markValues[0];
        let minDistance = Math.abs(clampedValue - closestMark);
        
        for (const markValue of markValues) {
          const distance = Math.abs(clampedValue - markValue);
          if (distance < minDistance) {
            minDistance = distance;
            closestMark = markValue;
          }
        }
        
        clampedValue = closestMark;
      }
    }
    
    return clampedValue;
  }, [min, max, step, dots, marks]);
  
  // 获取位置百分比
  const getPercentage = useCallback((val: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return reverse ? 100 - percentage : percentage;
  }, [min, max, reverse]);
  
  // 从位置获取值
  const getValueFromPosition = useCallback((position: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return min;
    
    let percentage;
    if (vertical) {
      percentage = ((rect.bottom - position) / rect.height) * 100;
    } else {
      percentage = ((position - rect.left) / rect.width) * 100;
    }
    
    if (reverse) {
      percentage = 100 - percentage;
    }
    
    percentage = Math.max(0, Math.min(100, percentage));
    const value = min + (percentage / 100) * (max - min);
    
    return clampValue(value);
  }, [min, max, vertical, reverse, clampValue]);
  
  // 更新值
  const updateValue = useCallback((newValue: number | [number, number]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);
  
  // 处理鼠标按下
  const handleMouseDown = useCallback((event: React.MouseEvent, handleIndex?: number) => {
    if (disabled) return;
    
    event.preventDefault();
    
    if (handleIndex !== undefined) {
      // 点击滑块
      setDragging(handleIndex);
      setTooltipVisible(prev => {
        const newVisible = [...prev];
        newVisible[handleIndex] = true;
        return newVisible;
      });
    } else {
      // 点击轨道
      const newValue = getValueFromPosition(
        vertical ? event.clientY : event.clientX
      );
      
      if (range && Array.isArray(currentValue)) {
        const [left, right] = currentValue;
        const leftDistance = Math.abs(newValue - left);
        const rightDistance = Math.abs(newValue - right);
        
        if (leftDistance < rightDistance) {
          updateValue([newValue, right]);
          setDragging(0);
        } else {
          updateValue([left, newValue]);
          setDragging(1);
        }
      } else {
        updateValue(newValue);
        setDragging(0);
      }
    }
  }, [disabled, vertical, range, currentValue, getValueFromPosition, updateValue]);
  
  // 处理鼠标移动
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (dragging === null || disabled) return;
    
    const newValue = getValueFromPosition(
      vertical ? event.clientY : event.clientX
    );
    
    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;
      if (dragging === 0) {
        updateValue([Math.min(newValue, right), right]);
      } else {
        updateValue([left, Math.max(newValue, left)]);
      }
    } else {
      updateValue(newValue);
    }
  }, [dragging, disabled, vertical, range, currentValue, getValueFromPosition, updateValue]);
  
  // 处理鼠标释放
  const handleMouseUp = useCallback(() => {
    if (dragging !== null) {
      setDragging(null);
      setTooltipVisible([false, false]);
      onAfterChange?.(currentValue);
      onChangeComplete?.(currentValue);
    }
  }, [dragging, currentValue, onAfterChange, onChangeComplete]);
  
  // 处理键盘事件
  const handleKeyDown = useCallback((event: React.KeyboardEvent, handleIndex: number) => {
    if (disabled) return;
    
    let delta = 0;
    const stepValue = step || 1;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -stepValue;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = stepValue;
        break;
      case 'Home':
        delta = min - (Array.isArray(currentValue) ? currentValue[handleIndex] : currentValue);
        break;
      case 'End':
        delta = max - (Array.isArray(currentValue) ? currentValue[handleIndex] : currentValue);
        break;
      case 'PageUp':
        delta = stepValue * 10;
        break;
      case 'PageDown':
        delta = -stepValue * 10;
        break;
      default:
        return;
    }
    
    event.preventDefault();
    
    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;
      if (handleIndex === 0) {
        const newLeft = clampValue(left + delta);
        updateValue([Math.min(newLeft, right), right]);
      } else {
        const newRight = clampValue(right + delta);
        updateValue([left, Math.max(newRight, left)]);
      }
    } else {
      const newValue = clampValue((currentValue as number) + delta);
      updateValue(newValue);
    }
  }, [disabled, step, min, max, range, currentValue, clampValue, updateValue]);
  
  // 绑定全局事件
  useEffect(() => {
    if (dragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);
  
  // 自动聚焦
  useEffect(() => {
    if (autoFocus && sliderRef.current) {
      const firstHandle = sliderRef.current.querySelector('[role="slider"]') as HTMLElement;
      firstHandle?.focus();
    }
  }, [autoFocus]);
  
  // 计算样式
  const trackStyle = useMemo(() => {
    if (!included) return {};
    
    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;
      const leftPercent = getPercentage(left);
      const rightPercent = getPercentage(right);
      
      if (vertical) {
        return {
          bottom: `${Math.min(leftPercent, rightPercent)}%`,
          height: `${Math.abs(rightPercent - leftPercent)}%`,
        };
      } else {
        return {
          left: `${Math.min(leftPercent, rightPercent)}%`,
          width: `${Math.abs(rightPercent - leftPercent)}%`,
        };
      }
    } else {
      const percent = getPercentage(currentValue as number);
      
      if (vertical) {
        return {
          bottom: reverse ? `${100 - percent}%` : '0%',
          height: `${reverse ? 100 - percent : percent}%`,
        };
      } else {
        return {
          left: reverse ? `${percent}%` : '0%',
          width: `${reverse ? 100 - percent : percent}%`,
        };
      }
    }
  }, [currentValue, range, vertical, reverse, included, getPercentage]);
  
  // 渲染刻度
  const renderMarks = () => {
    if (!marks) return null;
    
    return Object.entries(marks).map(([key, mark]) => {
      const value = Number(key);
      const percent = getPercentage(value);
      
      const markStyle: React.CSSProperties = vertical
        ? { bottom: `${percent}%` }
        : { left: `${percent}%` };
      
      const markProps = typeof mark === 'object' && mark !== null && 'style' in mark
        ? mark
        : { label: mark };
      
      return (
        <div
          key={key}
          className={styles.sliderMark}
          style={{ ...markStyle, ...markProps.style }}
        >
          <div className={styles.sliderMarkText}>
            {markProps.label}
          </div>
        </div>
      );
    });
  };
  
  // 渲染点
  const renderDots = () => {
    if (!dots || !marks) return null;
    
    return Object.keys(marks).map(key => {
      const value = Number(key);
      const percent = getPercentage(value);
      
      const dotStyle: React.CSSProperties = vertical
        ? { bottom: `${percent}%` }
        : { left: `${percent}%` };
      
      return (
        <div
          key={key}
          className={styles.sliderDot}
          style={dotStyle}
        />
      );
    });
  };
  
  // 渲染滑块
  const renderHandle = (value: number, index: number) => {
    const percent = getPercentage(value);
    
    const handleStyle: React.CSSProperties = vertical
      ? { bottom: `${percent}%` }
      : { left: `${percent}%` };
    
    const tooltipContent = tooltip?.formatter ? tooltip.formatter(value) : value;
    const showTooltip = tooltip?.open || tooltipVisible[index];
    
    return (
      <div
        key={index}
        className={`${styles.sliderHandle} ${dragging === index ? styles.sliderHandleDragging : ''}`}
        style={handleStyle}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onMouseEnter={() => {
          if (tooltip && !tooltip.open) {
            setTooltipVisible(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        }}
        onMouseLeave={() => {
          if (tooltip && !tooltip.open && dragging !== index) {
            setTooltipVisible(prev => {
              const newVisible = [...prev];
              newVisible[index] = false;
              return newVisible;
            });
          }
        }}
      >
        {tooltip && showTooltip && (
          <div className={`${styles.sliderTooltip} ${styles[`sliderTooltip${tooltip.placement || 'top'}`]}`}>
            {tooltipContent}
          </div>
        )}
      </div>
    );
  };
  
  const sliderClasses = [
    styles.slider,
    vertical ? styles.sliderVertical : styles.sliderHorizontal,
    disabled ? styles.sliderDisabled : '',
    className || '',
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={sliderRef}
      className={sliderClasses}
      style={style}
      onMouseDown={handleMouseDown}
    >
      <div ref={trackRef} className={styles.sliderRail} />
      
      {included && (
        <div className={styles.sliderTrack} style={trackStyle} />
      )}
      
      {renderDots()}
      {renderMarks()}
      
      {range && Array.isArray(currentValue) ? (
        <>
          {renderHandle(currentValue[0], 0)}
          {renderHandle(currentValue[1], 1)}
        </>
      ) : (
        renderHandle(currentValue as number, 0)
      )}
    </div>
  );
};

export { Slider };