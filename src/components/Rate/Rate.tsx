import React, { useState, useRef, useEffect } from 'react';
import styles from './Rate.module.scss';

export interface RateProps {
  /** 当前数，受控值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** star 总数 */
  count?: number;
  /** 是否允许半选 */
  allowHalf?: boolean;
  /** 是否允许再次点击后清除 */
  allowClear?: boolean;
  /** 只读，无法进行交互 */
  disabled?: boolean;
  /** 自定义字符 */
  character?: React.ReactNode | ((props: { index: number; value: number }) => React.ReactNode);
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 选择时的回调 */
  onChange?: (value: number) => void;
  /** 鼠标经过时数值变化的回调 */
  onHoverChange?: (value: number) => void;
  /** 失去焦点时的回调 */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** 获取焦点时的回调 */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** 按键回调 */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /** 自定义每项的提示信息 */
  tooltips?: string[];
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 组件大小 */
  size?: 'small' | 'default' | 'large';
}

const Rate: React.FC<RateProps> = ({
  value,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  character,
  className,
  style,
  onChange,
  onHoverChange,
  onBlur,
  onFocus,
  onKeyDown,
  tooltips,
  autoFocus = false,
  size = 'default',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const rateRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  // 自动聚焦
  useEffect(() => {
    if (autoFocus && rateRef.current) {
      rateRef.current.focus();
    }
  }, [autoFocus]);

  // 处理点击
  const handleClick = (starValue: number, event: React.MouseEvent) => {
    if (disabled) return;

    let newValue = starValue;
    
    // 如果允许清除且点击的是当前值，则清除
    if (allowClear && currentValue === starValue) {
      newValue = 0;
    }

    if (value === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };

  // 处理鼠标悬停
  const handleMouseEnter = (starValue: number) => {
    if (disabled) return;
    setHoverValue(starValue);
    onHoverChange?.(starValue);
  };

  // 处理鼠标离开
  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverValue(null);
    onHoverChange?.(currentValue);
  };

  // 处理键盘事件
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    const { key } = event;
    let newValue = currentValue;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(count, currentValue + (allowHalf ? 0.5 : 1));
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(0, currentValue - (allowHalf ? 0.5 : 1));
        event.preventDefault();
        break;
      case 'Home':
        newValue = allowHalf ? 0.5 : 1;
        event.preventDefault();
        break;
      case 'End':
        newValue = count;
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        // 空格键或回车键确认当前悬停值
        if (hoverValue !== null) {
          newValue = hoverValue;
        }
        event.preventDefault();
        break;
      default:
        break;
    }

    if (newValue !== currentValue) {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }

    onKeyDown?.(event);
  };

  // 处理焦点
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (disabled) return;
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setFocused(false);
    setHoverValue(null);
    onBlur?.(event);
  };

  // 获取星星的显示状态
  const getStarState = (index: number) => {
    const starValue = index + 1;
    const halfStarValue = index + 0.5;
    
    if (displayValue >= starValue) {
      return 'full';
    } else if (allowHalf && displayValue >= halfStarValue) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  // 渲染默认星星字符
  const renderDefaultCharacter = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  // 渲染星星
  const renderStar = (index: number) => {
    const starValue = index + 1;
    const halfStarValue = index + 0.5;
    const state = getStarState(index);
    
    const starClasses = [
      styles.star,
      styles[state],
      disabled && styles.disabled,
    ].filter(Boolean).join(' ');

    const handleStarClick = (event: React.MouseEvent) => {
      if (allowHalf) {
        const rect = event.currentTarget.getBoundingClientRect();
        const isLeft = event.clientX - rect.left < rect.width / 2;
        const clickValue = isLeft ? halfStarValue : starValue;
        handleClick(clickValue, event);
      } else {
        handleClick(starValue, event);
      }
    };

    const handleStarMouseMove = (event: React.MouseEvent) => {
      if (allowHalf) {
        const rect = event.currentTarget.getBoundingClientRect();
        const isLeft = event.clientX - rect.left < rect.width / 2;
        const hoverVal = isLeft ? halfStarValue : starValue;
        handleMouseEnter(hoverVal);
      } else {
        handleMouseEnter(starValue);
      }
    };

    const starCharacter = typeof character === 'function' 
      ? character({ index, value: displayValue })
      : character || renderDefaultCharacter();

    return (
      <div
        key={index}
        ref={(el) => { starsRef.current[index] = el; }}
        className={starClasses}
        onClick={handleStarClick}
        onMouseMove={handleStarMouseMove}
        role="radio"
        aria-checked={state === 'full'}
        aria-posinset={starValue}
        aria-setsize={count}
        tabIndex={-1}
        title={tooltips?.[index]}
      >
        <div className={styles.starFirst}>
          {starCharacter}
        </div>
        <div className={styles.starSecond}>
          {starCharacter}
        </div>
      </div>
    );
  };

  const rateClasses = [
    styles.rate,
    styles[size],
    disabled && styles.disabled,
    focused && styles.focused,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={rateRef}
      className={rateClasses}
      style={style}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="radiogroup"
      aria-label={`评分，当前 ${currentValue} 星，共 ${count} 星`}
    >
      {Array.from({ length: count }, (_, index) => renderStar(index))}
    </div>
  );
};

export default Rate;