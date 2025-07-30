import React, { FC, useEffect, useState } from "react";
import styles from "./Progress.module.scss";

// --- 类型定义 ---
export interface ProgressProps {
  /**
   * 当前进度百分比 (0-100)
   */
  progress: number;
  /**
   * 进度条的样式变体
   * @default 'linear'
   */
  variant?: "linear" | "circular";
  /**
   * 进度条的尺寸/厚度
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /**
   * 自定义进度条颜色 (接受任何有效的 CSS 颜色值)
   */
  color?: string;
  /**
   * 是否显示百分比文字
   * @default true
   */
  showPercentage?: boolean;
  /**
   * 自定义 CSS 类名
   */
  className?: string;
  /**
   * 是否启用动画效果
   * @default true
   */
  animated?: boolean;
  /**
   * 是否显示条纹效果
   * @default false
   */
  striped?: boolean;
  /**
   * 是否启用脉冲效果
   * @default false
   */
  pulse?: boolean;
}

// 内部的线性进度条组件
const LinearProgress: FC<Omit<ProgressProps, "variant">> = ({
  progress,
  size = "medium",
  color,
  showPercentage = true,
  animated = true,
  striped = false,
  pulse = false,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // 动画效果：逐步增加到目标进度
  useEffect(() => {
    if (!animated) {
      setDisplayProgress(clampedProgress);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayProgress(clampedProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [clampedProgress, animated]);

  const barStyle: React.CSSProperties = {
    width: `${displayProgress}%`,
    ...(color && { 
      background: color,
      boxShadow: `0 0 10px ${color}33, inset 0 1px 0 rgba(255,255,255,0.3)`
    }),
  };

  const containerClasses = [
    styles.linearContainer,
    pulse && styles.pulse,
  ].filter(Boolean).join(' ');

  const trackClasses = [
    styles.linearTrack,
    styles[`linear-${size}`],
  ].filter(Boolean).join(' ');

  const barClasses = [
    styles.linearBar,
    striped && styles.striped,
    animated && styles.animated,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={trackClasses}>
        <div className={barClasses} style={barStyle}>
          {striped && <div className={styles.stripePattern} />}
        </div>
      </div>
      {showPercentage && (
        <span className={`${styles.percentageText} ${styles[`percentage-${size}`]}`}>
          {Math.round(displayProgress)}%
        </span>
      )}
    </div>
  );
};

// 内部的圆形进度条组件
const CircularProgress: FC<Omit<ProgressProps, "variant">> = ({
  progress,
  size = "medium",
  color,
  showPercentage = true,
  animated = true,
  pulse = false,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // 动画效果：逐步增加到目标进度
  useEffect(() => {
    if (!animated) {
      setDisplayProgress(clampedProgress);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayProgress(clampedProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [clampedProgress, animated]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  const barStyle: React.CSSProperties = {
    strokeDashoffset: offset,
    ...(color && { 
      stroke: color,
      filter: `drop-shadow(0 0 6px ${color}66)`
    }),
  };

  const containerClasses = [
    styles.circularContainer,
    styles[`circular-${size}`],
    pulse && styles.pulse,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <svg className={styles.circularSvg} viewBox="0 0 100 100">
        {/* 背景光晕 */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color || "#4facfe"} />
            <stop offset="100%" stopColor={color || "#00f2fe"} />
          </linearGradient>
        </defs>
        
        <circle className={styles.circularTrack} cx="50" cy="50" r={radius} />
        <circle
          className={styles.circularBar}
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          style={barStyle}
          filter="url(#glow)"
        />
      </svg>
      {showPercentage && (
        <span className={`${styles.percentageTextCircular} ${styles[`percentage-circular-${size}`]}`}>
          {Math.round(displayProgress)}%
        </span>
      )}
    </div>
  );
};

// 主进度条组件
export const Progress: FC<ProgressProps> = ({
  variant = "linear",
  size = "medium",
  showPercentage = true,
  className = "",
  animated = true,
  striped = false,
  pulse = false,
  ...rest
}) => {
  const Component = variant === "circular" ? CircularProgress : LinearProgress;

  return (
    <div
      className={`${styles.progressWrapper} ${className}`}
      role="progressbar"
      aria-valuenow={rest.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`进度: ${Math.round(rest.progress)}%`}
    >
      <Component 
        size={size} 
        showPercentage={showPercentage} 
        animated={animated}
        striped={striped}
        pulse={pulse}
        {...rest} 
      />
    </div>
  );
};
