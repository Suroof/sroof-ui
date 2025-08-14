import React from 'react';
import styles from './Skeleton.module.scss';

export interface SkeletonProps {
  /** 是否显示动画效果 */
  active?: boolean;
  /** 是否显示头像占位图 */
  avatar?: boolean | {
    /** 头像的大小 */
    size?: 'large' | 'small' | 'default' | number;
    /** 头像的形状 */
    shape?: 'circle' | 'square';
  };
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 设置段落占位图的属性 */
  paragraph?: boolean | {
    /** 段落行数 */
    rows?: number;
    /** 段落宽度，可以是数字、字符串或数组 */
    width?: number | string | Array<number | string>;
  };
  /** 是否显示标题占位图 */
  title?: boolean | {
    /** 标题宽度 */
    width?: number | string;
  };
  /** 当为 true 时，显示占位图。当为 false 时，显示子组件 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({
  active = false,
  avatar = false,
  loading = true,
  paragraph = true,
  title = true,
  children,
  className,
  style,
}) => {
  // 如果不是加载状态且有子组件，直接显示子组件
  if (!loading && children) {
    return <>{children}</>;
  }

  // 获取头像配置
  const getAvatarConfig = () => {
    if (typeof avatar === 'boolean') {
      return avatar ? { size: 'default', shape: 'circle' } : null;
    }
    return avatar;
  };

  // 获取标题配置
  const getTitleConfig = () => {
    if (typeof title === 'boolean') {
      return title ? { width: '38%' } : null;
    }
    return title;
  };

  // 获取段落配置
  const getParagraphConfig = () => {
    if (typeof paragraph === 'boolean') {
      return paragraph ? { rows: 3 } : null;
    }
    return paragraph;
  };

  // 获取头像大小值
  const getAvatarSize = (size: 'large' | 'small' | 'default' | number = 'default') => {
    if (typeof size === 'number') return size;
    const sizeMap = {
      large: 40,
      default: 32,
      small: 24,
    };
    return sizeMap[size];
  };

  // 获取段落行宽度
  const getParagraphWidth = (width: number | string | Array<number | string> | undefined, index: number, total: number) => {
    if (Array.isArray(width)) {
      return width[index] || width[width.length - 1] || '100%';
    }
    if (width !== undefined) {
      return width;
    }
    // 默认宽度：最后一行较短
    if (index === total - 1) {
      return '61%';
    }
    return '100%';
  };

  // 获取Skeleton类名
  const getSkeletonClassName = () => {
    const classes = [styles.skeleton];
    
    if (active) {
      classes.push(styles.active);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  const avatarConfig = getAvatarConfig();
  const titleConfig = getTitleConfig();
  const paragraphConfig = getParagraphConfig();

  return (
    <div className={getSkeletonClassName()} style={style}>
      <div className={styles.content}>
        {/* 头像 */}
        {avatarConfig && (
          <div className={styles.header}>
            <div 
              className={`${styles.avatar} ${styles[avatarConfig.shape || 'circle']}`}
              style={{
                width: getAvatarSize(avatarConfig.size as 'large' | 'small' | 'default' | number),
                height: getAvatarSize(avatarConfig.size as 'large' | 'small' | 'default' | number),
              }}
            />
          </div>
        )}
        
        {/* 内容区域 */}
        <div className={styles.body}>
          {/* 标题 */}
          {titleConfig && (
            <div 
              className={styles.title}
              style={{ width: titleConfig.width }}
            />
          )}
          
          {/* 段落 */}
          {paragraphConfig && (
            <div className={styles.paragraph}>
              {Array.from({ length: paragraphConfig.rows || 3 }, (_, index) => (
                <div 
                  key={index}
                  className={styles.line}
                  style={{
                    width: getParagraphWidth(
                      paragraphConfig.width, 
                      index, 
                      paragraphConfig.rows || 3
                    ),
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 骨架屏按钮
export const SkeletonButton: React.FC<{
  active?: boolean;
  size?: 'large' | 'small' | 'default';
  shape?: 'circle' | 'round' | 'default';
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ active = false, size = 'default', shape = 'default', block = false, className, style }) => {
  const getButtonClassName = () => {
    const classes = [styles.skeletonButton];
    
    if (active) {
      classes.push(styles.active);
    }
    
    classes.push(styles[size]);
    classes.push(styles[shape]);
    
    if (block) {
      classes.push(styles.block);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return <div className={getButtonClassName()} style={style} />;
};

// 骨架屏输入框
export const SkeletonInput: React.FC<{
  active?: boolean;
  size?: 'large' | 'small' | 'default';
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ active = false, size = 'default', block = false, className, style }) => {
  const getInputClassName = () => {
    const classes = [styles.skeletonInput];
    
    if (active) {
      classes.push(styles.active);
    }
    
    classes.push(styles[size]);
    
    if (block) {
      classes.push(styles.block);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return <div className={getInputClassName()} style={style} />;
};

// 骨架屏图片
export const SkeletonImage: React.FC<{
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({ active = false, className, style }) => {
  const getImageClassName = () => {
    const classes = [styles.skeletonImage];
    
    if (active) {
      classes.push(styles.active);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <div className={getImageClassName()} style={style}>
      <div className={styles.imageIcon}>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1L677.8 583c-16.1-13.3-39.4-13.3-55.5 0l-77.4 64.2-245.9-204.1c-16.1-13.3-39.4-13.3-55.5 0L112 563.6V792h739.9v-50.9z" />
        </svg>
      </div>
    </div>
  );
};

export default Skeleton;