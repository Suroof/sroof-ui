import React, { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LineMotion.module.scss";

gsap.registerPlugin(ScrollTrigger);

export interface LineMotionProps {
  /**
   * SVG路径数据字符串，定义要绘制的路径形状
   * 例如: "M10 10 L20 20" 表示从(10,10)到(20,20)的直线
   */
  pathData: string;
  /**
   * 动画是否与滚动关联
   * 默认值: false
   */
  scroll?: boolean;
  /**
   * 滚动动画的 scrub 值，可以是 boolean 或 number
   * 默认值: true
   */
  scrub?: boolean | number;
  /**
   * ScrollTrigger 的起始位置
   * 默认值: "top bottom"
   */
  start?: string;
  /**
   * ScrollTrigger 的结束位置
   * 默认值: "bottom top"
   */
  end?: string;
  /**
   * 动画持续时间（秒），仅在 scroll 为 false 时生效
   * 默认值: 2
   */
  duration?: number;
  /**
   * 动画缓动函数，仅在 scroll 为 false 时生效
   * 默认值: "power1.inOut"
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
    /**
   * 可选的内联样式
   */
  style?: React.CSSProperties;
}

export const LineMotion: React.FC<LineMotionProps> = ({
  pathData,
  scroll = false,
  scrub = true,
  start = "top bottom",
  end = "bottom top",
  duration = 2,
  ease = "power1.inOut",
  stroke = "black",
  strokeWidth = 3,
  autoFit = true,
  width = "100%", 
  height = "100%", 
  style,
  ...props
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const viewBox = useMemo(() => {
    if (!autoFit) {
      return `0 0 100 100`;
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
    if (!pathRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      ease: ease,
      ...(scroll
        ? {
            scrollTrigger: {
              trigger: svgRef.current,
              start: start,
              end: end,
              scrub: scrub,
            },
          }
        : {
            duration: duration,
          }),
    });

    return () => {
      animation.kill();
      if (scroll && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    };
  }, [pathData, duration, ease, viewBox, scroll, scrub, start, end]);

  return (
    <svg
      ref={svgRef}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      style={style}
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
