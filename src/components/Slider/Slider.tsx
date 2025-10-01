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
  className,
  style
}) => {
  // 确定组件是否受控
  const isControlled = value !== undefined;

  // 初始化状态值
  const getInitialValue = (): number | [number, number] => {
    if (isControlled) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return range ? [min, min] : min;
  };

  const [internalValue, setInternalValue] = useState<number | [number, number]>(getInitialValue());
  const [draggingHandle, setDraggingHandle] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  // 当前值（受控或非受控）
  const currentValue = isControlled ? value : internalValue;

  // 计算标记值
  const markValues = useMemo(() => {
    if (!marks) return [];
    return Object.keys(marks)
      .map(Number)
      .filter(val => !isNaN(val))
      .sort((a, b) => a - b);
  }, [marks]);

  // 确保值在有效范围内并符合步长
  const normalizeValue = useCallback((val: number): number => {
    // 确保在范围内
    val = Math.max(min, Math.min(max, val));

    // 对齐到步长
    if (step > 0) {
      const steps = Math.round((val - min) / step);
      val = min + steps * step;
    }

    // 确保仍在范围内（防止浮点数精度问题）
    return Math.max(min, Math.min(max, val));
  }, [min, max, step]);

  // 获取值对应的百分比位置
  const getPercentage = useCallback((val: number): number => {
    if (max === min) return 0;
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  // 根据位置计算值
  const getValueFromPosition = useCallback((position: number): number => {
    const sliderRect = sliderRef.current?.getBoundingClientRect();
    if (!sliderRect) return min;

    let percentage: number;
    if (vertical) {
      const positionInSlider = Math.min(Math.max(position - sliderRect.top, 0), sliderRect.height);
      percentage = (positionInSlider / sliderRect.height) * 100;
      if (!reverse) percentage = 100 - percentage;
    } else {
      const positionInSlider = Math.min(Math.max(position - sliderRect.left, 0), sliderRect.width);
      percentage = (positionInSlider / sliderRect.width) * 100;
      if (reverse) percentage = 100 - percentage;
    }

    const value = min + (percentage / 100) * (max - min);
    return normalizeValue(value);
  }, [min, max, vertical, reverse, normalizeValue]);

  // 更新值
  const updateValue = useCallback((newValue: number | [number, number]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  // 处理鼠标按下事件
  const handleMouseDown = useCallback((e: React.MouseEvent, handleIndex?: number) => {
    if (disabled || !sliderRef.current) return;

    e.preventDefault();
    const position = vertical ? e.clientY : e.clientX;
    const newValue = getValueFromPosition(position);

    if (range && Array.isArray(currentValue)) {
      const [left, right] = currentValue;

      // 确定要拖动哪个手柄
      let targetHandle: number;
      if (handleIndex !== undefined) {
        targetHandle = handleIndex;
      } else {
        const leftDistance = Math.abs(newValue - left);
        const rightDistance = Math.abs(newValue - right);
        targetHandle = leftDistance < rightDistance ? 0 : 1;
      }

      setDraggingHandle(targetHandle);

      // 更新值
      const newRangeValue: [number, number] = [...currentValue] as [number, number];
      newRangeValue[targetHandle] = newValue;

      // 确保左值不大于右值
      if (newRangeValue[0] > newRangeValue[1]) {
        // 交换手柄
        setDraggingHandle(targetHandle === 0 ? 1 : 0);
        newRangeValue.reverse();
      }

      updateValue(newRangeValue);
    } else {
      setDraggingHandle(0);
      updateValue(newValue);
    }
  }, [disabled, vertical, range, currentValue, getValueFromPosition, updateValue]);

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingHandle === null || disabled) return;

    e.preventDefault();
    const position = vertical ? e.clientY : e.clientX;
    const newValue = getValueFromPosition(position);

    if (range && Array.isArray(currentValue)) {
      const newRangeValue: [number, number] = [...currentValue] as [number, number];
      newRangeValue[draggingHandle] = newValue;

      // 确保左值不大于右值
      if (newRangeValue[0] <= newRangeValue[1]) {
        updateValue(newRangeValue);
      }
    } else {
      updateValue(newValue);
    }
  }, [draggingHandle, disabled, vertical, range, currentValue, getValueFromPosition, updateValue]);

  // 处理鼠标释放事件
  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (draggingHandle === null) return;

    e.preventDefault();
    setDraggingHandle(null);
    setActiveTooltip(null);

    // 触发 onAfterChange 回调
    onAfterChange?.(currentValue);
  }, [draggingHandle, currentValue, onAfterChange]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent, handleIndex: number) => {
    if (disabled) return;

    let stepValue = step || 1;
    let newValue: number;

    if (range && Array.isArray(currentValue)) {
      newValue = currentValue[handleIndex];
    } else {
      newValue = currentValue as number;
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = normalizeValue(newValue + (reverse ? stepValue : -stepValue));
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = normalizeValue(newValue + (reverse ? -stepValue : stepValue));
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageUp':
        newValue = normalizeValue(newValue + stepValue * 10);
        break;
      case 'PageDown':
        newValue = normalizeValue(newValue - stepValue * 10);
        break;
      default:
        return;
    }

    e.preventDefault();

    if (range && Array.isArray(currentValue)) {
      const newRangeValue: [number, number] = [...currentValue] as [number, number];
      newRangeValue[handleIndex] = newValue;

      // 确保范围正确
      if (handleIndex === 0) {
        newRangeValue[1] = Math.max(newRangeValue[0], newRangeValue[1]);
      } else {
        newRangeValue[0] = Math.min(newRangeValue[0], newRangeValue[1]);
      }

      updateValue(newRangeValue);
    } else {
      updateValue(newValue);
    }

    onAfterChange?.(range && Array.isArray(currentValue) ?
      ((() => {
        const newRangeValue: [number, number] = [...currentValue] as [number, number];
        newRangeValue[handleIndex] = newValue;
        if (handleIndex === 0) {
          newRangeValue[1] = Math.max(newRangeValue[0], newRangeValue[1]);
        } else {
          newRangeValue[0] = Math.min(newRangeValue[0], newRangeValue[1]);
        }
        return newRangeValue;
      })()) :
      newValue
    );
  }, [disabled, step, min, max, reverse, range, currentValue, normalizeValue, updateValue, onAfterChange]);

  // 绑定全局事件监听器
  useEffect(() => {
    if (draggingHandle !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingHandle, handleMouseMove, handleMouseUp]);

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
          bottom: `${Math.min(leftPercent, rightPercent)}%`,
          height: `${Math.abs(rightPercent - leftPercent)}%`
        };
      } else {
        return {
          left: `${Math.min(leftPercent, rightPercent)}%`,
          width: `${Math.abs(rightPercent - leftPercent)}%`
        };
      }
    } else {
      const percent = getPercentage(currentValue as number);

      if (vertical) {
        return {
          bottom: '0%',
          height: `${percent}%`
        };
      } else {
        return {
          left: '0%',
          width: `${percent}%`
        };
      }
    }
  }, [currentValue, range, vertical, getPercentage]);

  // 渲染标记
  const renderMarks = useCallback(() => {
    if (!marks) return null;

    return (
      <div className={styles.marks}>
        {Object.entries(marks).map(([key, mark]) => {
          const value = Number(key);
          if (isNaN(value)) return null;

          const percent = getPercentage(value);
          const positionStyle = vertical
            ? { bottom: `${percent}%` }
            : { left: `${percent}%` };

          return (
            <div
              key={key}
              className={styles.mark}
              style={positionStyle}
            >
              <div className={styles.markDot} />
              <div className={styles.markLabel}>
                {typeof mark === 'object' && mark !== null && 'label' in mark
                  ? mark.label
                  : mark}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [marks, vertical, getPercentage]);

  // 渲染点
  const renderDots = useCallback(() => {
    if (!dots) return null;

    const dotElements = [];
    const stepValue = step > 0 ? step : 1;
    const count = Math.floor((max - min) / stepValue) + 1;

    for (let i = 0; i < count; i++) {
      const value = min + i * stepValue;
      const percent = getPercentage(value);
      const positionStyle = vertical
        ? { bottom: `${percent}%` }
        : { left: `${percent}%` };

      dotElements.push(
        <div
          key={i}
          className={styles.dot}
          style={positionStyle}
        />
      );
    }

    return <div className={styles.dots}>{dotElements}</div>;
  }, [dots, min, max, step, vertical, getPercentage]);

  // 渲染手柄
  const renderHandle = useCallback((value: number, index: number) => {
    const percent = getPercentage(value);
    const positionStyle = vertical
      ? { bottom: `${percent}%` }
      : { left: `${percent}%` };

    const isDragging = draggingHandle === index;
    const showTooltip = tooltip === 'always' ||
      (tooltip && activeTooltip === index) ||
      (tooltip && isDragging);

    return (
      <div
        key={index}
        className={`${styles.handle} ${isDragging ? styles.handleActive : ''} ${disabled ? styles.handleDisabled : ''}`}
        style={positionStyle}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onMouseEnter={() => setActiveTooltip(index)}
        onMouseLeave={() => setActiveTooltip(null)}
      >
        {showTooltip && (
          <div className={styles.tooltip}>
            {tipFormatter ? tipFormatter(value) : value}
          </div>
        )}
      </div>
    );
  }, [vertical, getPercentage, draggingHandle, disabled, min, max, tooltip, activeTooltip, tipFormatter, handleMouseDown, handleKeyDown]);

  // 渲染所有手柄
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
      tabIndex={disabled ? -1 : 0}
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