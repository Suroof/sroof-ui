import React, { FC, useEffect, useState } from "react";
import styles from "./Progress.module.scss";

// --- 类型定义 ---
export interface ProgressProps {
  progress: number;
  variant?: "linear" | "circular";
  size?: "small" | "medium" | "large";
  color?: string;
  showPercentage?: boolean;
  className?: string;
  /** 是否为条纹样式 (仅线性进度条有效) */
  striped?: boolean;
}

// 内部的线性进度条组件
const LinearProgress: FC<Omit<ProgressProps, "variant">> = ({
  progress,
  size = "medium",
  color,
  showPercentage = true,
  striped = false,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const clampedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    // 使用 requestAnimationFrame 实现更平滑的动画
    let animationFrameId: number;
    const animate = () => {
      setDisplayProgress(prev => {
        if (Math.abs(clampedProgress - prev) < 0.1) {
          return clampedProgress;
        }
        return prev + (clampedProgress - prev) * 0.1; // 缓动动画
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [clampedProgress]);

  const barStyle: React.CSSProperties = {
    width: `${displayProgress}%`,
    ...(color && { background: color }), // 支持单色覆盖
  };

  const trackClasses = `${styles.linearTrack} ${styles[`linear-${size}`]}`;
  const barClasses = `${styles.linearBar} ${striped ? styles.striped : ''}`;

  return (
    <div className={styles.linearContainer}>
      <div className={trackClasses}>
        <div className={barClasses} style={barStyle} />
      </div>
      {showPercentage && (
        <span className={styles.percentageText}>
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
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setDisplayProgress(prev => {
        if (Math.abs(clampedProgress - prev) < 0.1) return clampedProgress;
        return prev + (clampedProgress - prev) * 0.1;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [clampedProgress]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  const barStyle: React.CSSProperties = {
    strokeDashoffset: offset,
    ...(color && { stroke: color }),
  };

  const containerClasses = `${styles.circularContainer} ${styles[`circular-${size}`]}`;

  return (
    <div className={containerClasses}>
      <svg className={styles.circularSvg} viewBox="0 0 100 100">
        <circle className={styles.circularTrack} cx="50" cy="50" r={radius} />
        <circle className={styles.circularBar} cx="50" cy="50" r={radius} strokeDasharray={circumference} style={barStyle} />
      </svg>
      {showPercentage && (
        <span className={styles.percentageTextCircular}>
          {Math.round(displayProgress)}%
        </span>
      )}
    </div>
  );
};

// 主进度条组件
export const Progress: FC<ProgressProps> = ({
  variant = "linear",
  className = "",
  ...rest
}) => {
  const Component = variant === "circular" ? CircularProgress : LinearProgress;
  return (
    <div className={`${styles.progressWrapper} ${className}`} role="progressbar" aria-valuenow={rest.progress}>
      <Component {...rest} />
    </div>
  );
};