import React from 'react';
import styles from './Steps.module.scss';

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface StepsProps {
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  items: StepItem[];
  onChange?: (current: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Steps: React.FC<StepsProps> = ({
  current = 0,
  direction = 'horizontal',
  size = 'default',
  status = 'process',
  items = [],
  onChange,
  className,
  style
}) => {
  const handleStepClick = (index: number) => {
    if (onChange && !items[index]?.disabled) {
      onChange(index);
    }
  };

  return (
    <div 
      className={`${styles.steps} ${styles[direction]} ${styles[size]} ${className || ''}`}
      style={style}
    >
      {items.map((item, index) => {
        const stepStatus = index < current ? 'finish' : 
                          index === current ? status : 'wait';
        
        return (
          <div
            key={index}
            className={`${styles.step} ${styles[stepStatus]} ${
              item.disabled ? styles.disabled : ''
            }`}
            onClick={() => handleStepClick(index)}
          >
            <div className={styles.stepIcon}>
              {item.icon || <span>{index + 1}</span>}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{item.title}</div>
              {item.description && (
                <div className={styles.stepDescription}>{item.description}</div>
              )}
            </div>
            {index < items.length - 1 && (
              <div className={styles.stepConnector} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;