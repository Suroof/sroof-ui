import React, {
  FC,
  ReactNode,
  useRef,
  useEffect,
  useState,
  Children,
  isValidElement,
} from "react";
import styles from "./ScrollReveal.module.scss";

export interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  staggerDelay?: number;
  as?: React.ElementType;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  staggerDelay = 150,
  as: Component = "div",
  direction = "up",
  distance = 20,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedChildren, setAnimatedChildren] = useState<number[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          // 使用 setTimeout 来实现交错动画
          const childCount = Children.count(children);
          for (let i = 0; i < childCount; i++) {
            setTimeout(() => {
              setAnimatedChildren((prev) => [...prev, i]);
            }, i * staggerDelay);
          }

          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [threshold, staggerDelay, children]);

  // 为子元素添加动画状态
  const childrenWithStagger = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      const isAnimated = animatedChildren.includes(index);
      const existingClassName =
        (child.props as React.PropsWithChildren<{ className?: string }>)
          ?.className || "";

      const childProps = {
        className: `${existingClassName} ${styles.revealChild} ${
          isAnimated ? styles.revealed : ""
        }`.trim(),
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  const containerClasses = `
    ${styles.scrollRevealContainer}
    ${isVisible ? styles.isVisible : ""}
    ${styles[`from-${direction}`]}
  `;

  const containerStyle = {
    "--reveal-distance": `${distance}px`,
  } as React.CSSProperties;

  return React.createElement(
    Component,
    {
      ref: containerRef,
      className: containerClasses.trim(),
      style: containerStyle,
    },
    childrenWithStagger
  );
};
