import React, { FC, ReactNode } from 'react';
import styles from './ScrollCard.module.scss';

// --- 类型定义 (无变化) ---
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
  speed = 40,
  cardWidth = 400,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const displayItems = [...items, ...items];
  
  const componentStyle = {
    '--animation-duration': `${speed}s`,
    '--card-width': `${cardWidth}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.componentRoot} style={componentStyle}>
      <div className={styles.scrollContainer}>
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
    </div>
  );
};