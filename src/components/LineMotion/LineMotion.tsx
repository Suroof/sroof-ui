import React, { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import styles from "./LineMotion.module.scss";

export interface LineMotionProps {
  /**
   * SVG路径数据字符串，定义要绘制的路径形状
   * 例如: "M10 10 L20 20" 表示从(10,10)到(20,20)的直线
   */
  pathData: string;
  /**
   * 动画持续时间（秒）
   * 默认值: 2
   */
  duration?: number;
  /**
   * 动画缓动函数
   * 默认值: "power1.inOut"
   * 可选值参考GSAP的ease选项
   */
  ease?: string;
  /**
   * 路径描边颜色
   * 默认值: "black"
   */
  stroke?: string;
  /**
   * 路径描边宽度
   * 默认值: 3
   */
  strokeWidth?: number;
  /**
   * 可选的CSS类名，用于自定义样式
   */
  className?: string;
  /**
   * 可选的元素ID
   */
  id?: string;
  /**
   * 是否自动适应路径的边界框
   * 默认值: true
   */
  autoFit?: boolean;
  width?: string | number;
  height?: string | number;
}

export const LineMotion: React.FC<LineMotionProps> = ({
  pathData,
  duration = 2,
  ease = "power1.inOut",
  stroke = "black",
  strokeWidth = 3,
  autoFit = true,
  width = "100%", // 这个prop现在将作用于<svg>
  height = "100%", // 这个prop现在将作用于<svg>
  ...props
}) => {
  const pathRef = useRef<SVGPathElement>(null);

  // viewBox的计算逻辑是正确的，无需修改
  const viewBox = useMemo(() => {
    if (!autoFit) {
      return `0 0 100 100`; // 默认viewBox
    }
    // 客户端环境才执行
    if (typeof window === "undefined") {
      return "0 0 100 100";
    }
    try {
      const tempSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      const tempPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      tempPath.setAttribute("d", pathData);
      tempSvg.appendChild(tempPath);

      tempSvg.style.position = "absolute";
      tempSvg.style.left = "-9999px";
      document.body.appendChild(tempSvg);

      const bbox = tempPath.getBBox();
      document.body.removeChild(tempSvg);

      const margin = strokeWidth * 2;
      const minX = bbox.x - margin;
      const minY = bbox.y - margin;
      const w = bbox.width + margin * 2;
      const h = bbox.height + margin * 2;

      return `${minX} ${minY} ${w} ${h}`;
    } catch (error) {
      console.warn("Failed to calculate viewBox, using default", error);
      return "0 0 100 100";
    }
  }, [pathData, strokeWidth, autoFit]);

  useLayoutEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      duration: duration,
      ease: ease,
    });

    return () => {
      animation.kill();
    };
  }, [pathData, duration, ease, viewBox]);

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}   
      height={height} 
    >
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={styles.wideSvg}
      />
    </svg>
  );
};

export default LineMotion;