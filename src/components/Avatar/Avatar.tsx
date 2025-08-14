import React, { useState } from 'react';
import styles from './Avatar.module.scss';

export interface AvatarProps {
  /** 头像的图片地址 */
  src?: string;
  /** 图像无法显示时的替代文本 */
  alt?: string;
  /** 头像的尺寸 */
  size?: number | 'large' | 'default' | 'small';
  /** 头像的形状 */
  shape?: 'circle' | 'square';
  /** 头像的图标 */
  icon?: React.ReactNode;
  /** 文字头像 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 */
  onError?: () => boolean | void;
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 头像组合时的间距，可以是数字或响应式对象 */
  gap?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'default',
  shape = 'circle',
  icon,
  children,
  className,
  style,
  onError,
  onClick,
  draggable = false,
  gap,
}) => {
  const [isImgExist, setIsImgExist] = useState(true);
  const [scale, setScale] = useState(1);
  const avatarRef = React.useRef<HTMLSpanElement>(null);
  const textRef = React.useRef<HTMLSpanElement>(null);

  // 获取尺寸值
  const getSizeValue = () => {
    if (typeof size === 'number') return size;
    const sizeMap = {
      large: 40,
      default: 32,
      small: 24,
    };
    return sizeMap[size];
  };

  // 获取头像类名
  const getAvatarClassName = () => {
    const classes = [styles.avatar];
    
    if (typeof size === 'string') {
      classes.push(styles[size]);
    }
    
    classes.push(styles[shape]);
    
    if (onClick) {
      classes.push(styles.clickable);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  // 获取头像样式
  const getAvatarStyle = (): React.CSSProperties => {
    const avatarStyle: React.CSSProperties = { ...style };
    
    if (typeof size === 'number') {
      avatarStyle.width = size;
      avatarStyle.height = size;
      avatarStyle.lineHeight = `${size}px`;
      avatarStyle.fontSize = size / 2.5;
    }
    
    if (gap !== undefined) {
      avatarStyle.marginLeft = -gap;
    }
    
    return avatarStyle;
  };

  // 处理图片加载错误
  const handleImgLoadError = () => {
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };

  // 计算文字缩放
  const setTextScale = () => {
    if (!textRef.current || !avatarRef.current) return;
    
    const textWidth = textRef.current.offsetWidth;
    const avatarWidth = avatarRef.current.offsetWidth;
    
    if (textWidth !== 0 && avatarWidth !== 0) {
      if (gap && gap * 2 < avatarWidth) {
        setScale((avatarWidth - gap * 2) / textWidth);
      } else {
        setScale(avatarWidth / textWidth);
      }
    }
  };

  // 监听文字内容变化
  React.useEffect(() => {
    setTextScale();
  }, [children, gap]);

  // 渲染头像内容
  const renderAvatarContent = () => {
    // 如果有图片且图片存在
    if (src && isImgExist) {
      return (
        <img
          src={src}
          alt={alt}
          onError={handleImgLoadError}
          draggable={draggable}
          className={styles.avatarImg}
        />
      );
    }
    
    // 如果有图标
    if (icon) {
      return <span className={styles.avatarIcon}>{icon}</span>;
    }
    
    // 如果有文字内容
    if (children) {
      const textStyle: React.CSSProperties = {
        transform: `scale(${scale}) translateX(-50%)`,
      };
      
      if (typeof size === 'number') {
        textStyle.lineHeight = `${size}px`;
      }
      
      return (
        <span 
          ref={textRef}
          className={styles.avatarString} 
          style={textStyle}
        >
          {children}
        </span>
      );
    }
    
    // 默认用户图标
    return (
      <span className={styles.avatarIcon}>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
        </svg>
      </span>
    );
  };

  return (
    <span
      ref={avatarRef}
      className={getAvatarClassName()}
      style={getAvatarStyle()}
      onClick={onClick}
    >
      {renderAvatarContent()}
    </span>
  );
};

export default Avatar;