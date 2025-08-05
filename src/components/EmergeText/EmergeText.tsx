import React, { useEffect, useRef, FC } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./EmergeText.module.scss";

gsap.registerPlugin(SplitText);

export interface EmergeTextProps {
  /**
   * 需要进行动画的文本内容
   */
  text: string;
  /**
   * 动画的持续时间（秒）
   */
  duration?: number;
  /**
   * 每个单词/字符动画之间的交错延迟（秒）
   */
  stagger?: number;
  /**
   * 动画的垂直偏移量（像素）。正值表示从下方浮现。
   */
  y?: number;
  /**
   * 动画分割的类型
   */
  splitType?: "words" | "chars";
  /**
   * 自定义 CSS 类名
   */
  className?: string;
}

export const EmergeText: FC<EmergeTextProps> = ({
  text,
  duration = 0.8,
  stagger = 0.05,
  y = 20,
  splitType = "words",
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<SplitText | null>(null);

  useEffect(() => {
    const animate = () => {
      // 确保 ref 存在
      if (!containerRef.current || !animateRef.current) return;

      // 使用 GSAP set 立即显示容器，准备动画
      gsap.set(containerRef.current, { opacity: 1 });
      
      // 创建 SplitText 实例
      splitTextRef.current = new SplitText(animateRef.current, {
        type: splitType,
      });

      // 从一个不可见、有偏移的状态开始动画
      gsap.from(splitTextRef.current[splitType], {
        opacity: 0,
        y: y, // 使用 y prop 控制垂直偏移
        duration: duration,
        ease: "power2.out", // 使用更平滑的缓动函数
        stagger: stagger,
      });
    };

    // 确保字体加载完毕再执行动画，防止布局抖动
    document.fonts.ready.then(animate);

    // 清理函数
    return () => {
      // 销毁 SplitText 实例以释放内存和还原 DOM
      splitTextRef.current?.revert();
      gsap.killTweensOf(animateRef.current);
    };
  }, [text, duration, stagger, y, splitType]);

  return (
    //既保留默认样式也支持用户自定义样式
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      {/* 动画的目标元素，对屏幕阅读器隐藏 */}
      <div className={styles.animateMe} ref={animateRef} aria-hidden="true" data-split-type={splitType}>
        {text}
      </div>
      {/* 为屏幕阅读器提供的纯文本，视觉上隐藏 */}
      <p className={styles.srOnly}>
        {text}
      </p>
    </div>
  );
};