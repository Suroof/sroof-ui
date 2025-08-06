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
  autoFit: boolean;
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
  width = "100%",
  height = "100%",
  ...props
}) => {
  const pathRef = useRef<SVGPathElement>(null);

  // 解析路径数据并计算边界框
  const viewBox = useMemo(() => {
    if (!autoFit) {
      return `0 0 100 100`; // 默认viewBox
    }

    try {
      // 创建临时SVG元素来解析路径
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

      // 将临时元素添加到DOM以获取边界框
      tempSvg.style.position = "absolute";
      tempSvg.style.left = "-9999px";
      document.body.appendChild(tempSvg);

      const bbox = tempPath.getBBox();

      // 移除临时元素
      document.body.removeChild(tempSvg);

      // 添加一些边距，确保线条不会紧贴边界
      const margin = strokeWidth * 2;
      const minX = bbox.x - margin;
      const minY = bbox.y - margin;
      const width = bbox.width + margin * 2;
      const height = bbox.height + margin * 2;

      return `${minX} ${minY} ${width} ${height}`;
    } catch (error) {
      console.warn("Failed to calculate viewBox, using default", error);
      return "0 0 100 100";
    }
  }, [pathData, strokeWidth, autoFit]);

  useLayoutEffect(() => {
    // 确保路径元素存在
    if (!pathRef.current) return;

    const path = pathRef.current;

    // 获取路径的总长度
    const pathLength = path.getTotalLength();

    // 设置初始状态（动画开始前）
    // stroke-dasharray: 将路径的描边变成一段虚线，线段长度等于路径总长度。
    // stroke-dashoffset: 将虚线的起点偏移整个路径的长度，使其完全不可见。
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 创建动画
    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      duration: duration,
      ease: ease,
      // 需要在动画完成后做些什么，可以在这里添加
    });

    // 清理函数
    return () => {
      animation.kill();
    };
  }, [pathData, duration, ease, viewBox]); // 依赖项数组

  // SVG 的尺寸和 viewBox 设为可配置的，以增加组件的灵活性。
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={styles.wideSvg}
      />
    </svg>
  );
};

export default LineMotion;
