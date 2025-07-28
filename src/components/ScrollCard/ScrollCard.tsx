import React, { FC, ReactNode } from 'react';
import styles from './ScrollCard.module.scss';

// --- 类型定义 ---
export interface ScrollCardItem {
  id: string | number;
  imageUrl: string;
  title: ReactNode;
  description?: ReactNode;
}

export interface ScrollCardProps {
  items: ScrollCardItem[];
  speed?: number;
  cardWidth?: number;
}

export const ScrollCard: FC<ScrollCardProps> = ({
  items,
  speed = 40, // 默认 40 秒完成一次循环
  cardWidth = 300,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  // 复制数组以实现无限滚动
  const displayItems = [...items, ...items];
  
  // --animation-duration 是一个 CSS 变量，将 speed 传递给它
  const containerStyle = {
    '--animation-duration': `${speed}s`,
    '--card-width': `${cardWidth}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.scrollContainer} style={containerStyle}>
      <div className={styles.scrollWrapper}>
        {displayItems.map((item, index) => (
          <div className={styles.card} key={`${item.id}-${index}`}>
            <img src={item.imageUrl} alt={typeof item.title === 'string' ? item.title : ''} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && <p className={styles.cardDescription}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};