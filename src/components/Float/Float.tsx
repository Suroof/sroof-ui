
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Float.module.scss";

export interface FloatProps {
    duration?: number;
    delay?: number;
    className?: string;
    rotationSpeed?: number;
    children?: React.ReactNode;
}

export const Float: React.FC<FloatProps> = ({
  duration = 3,
  delay = 0,
  className = "",
  children
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (elementRef.current) {
            const tl = gsap.timeline({
                repeat: -1,
                repeatDelay: delay,
            });
            
            tl.to(elementRef.current, {
                x: '100vw', 
                rotation: 360, 
                duration: duration,
                ease: "none"
            });
        }
        
        // 清理函数
        return () => {
            gsap.killTweensOf(elementRef.current);
        };
    }, [duration, delay]);
    
    return (
        <div ref={elementRef} className={`${styles.float} ${className}`}>
            {children}
        </div>
    );
};