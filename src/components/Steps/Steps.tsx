import React from 'react';
import styles from './Steps.module.scss';

export interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 自定义状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

export interface StepsProps {
  /** 当前步骤，从 0 开始计数 */
  current?: number;
  /** 起始序号，从 0 开始计数 */
  initial?: number;
  /** 指定步骤条方向 */
  direction?: 'horizontal' | 'vertical';
  /** 指定标签放置位置 */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 指定大小 */
  size?: 'default' | 'small';
  /** 指定当前步骤的状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 当前 process 步骤显示的进度条进度 */
  percent?: number;
  /** 点状步骤条 */
  progressDot?: boolean | ((iconDot: React.ReactNode, options: { index: number; status: string; title: string; description?: string }) => React.ReactNode);
  /** 当屏幕宽度小于 532px 时自动变为垂直模式 */
  responsive?: boolean;
  /** 步骤条类型 */
  type?: 'default' | 'navigation';
  /** 配置选项卡内容 */
  items: StepItem[];
  /** 点击切换步骤时触发 */
  onChange?: (current: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Steps: React.FC<StepsProps> = ({
  current = 0,
  initial = 0,
  direction = 'horizontal',
  labelPlacement = 'horizontal',
  size = 'default',
  status = 'process',
  percent,
  progressDot = false,
  responsive = true,
  type = 'default',
  items = [],
  onChange,
  className,
  style
}) => {
  const handleStepClick = (index: number) => {
    if (onChange && !items[index]?.disabled && type === 'navigation') {
      onChange(index);
    }
  };

  const getStepStatus = (index: number): 'wait' | 'process' | 'finish' | 'error' => {
    const item = items[index];
    if (item?.status) {
      return item.status;
    }

    const adjustedCurrent = current + initial;
    if (index < adjustedCurrent) {
      return 'finish';
    } else if (index === adjustedCurrent) {
      return status;
    } else {
      return 'wait';
    }
  };

  const renderStepIcon = (item: StepItem, index: number, stepStatus: string) => {
    if (typeof progressDot === 'function') {
      return progressDot(
        <span className={styles.stepIconDot} />,
        { index, status: stepStatus, title: item.title, description: item.description }
      );
    }

    if (progressDot) {
      return <span className={styles.stepIconDot} />;
    }

    if (item.icon) {
      return item.icon;
    }

    if (stepStatus === 'finish') {
      return <span className={styles.stepIconCheck}>✓</span>;
    }

    if (stepStatus === 'error') {
      return <span className={styles.stepIconError}>✕</span>;
    }

    return <span className={styles.stepIconNumber}>{index + 1 - initial}</span>;
  };

  const renderProgressBar = (index: number, stepStatus: string) => {
    if (index >= items.length - 1) return null;

    const isActive = stepStatus === 'process' && percent !== undefined;
    const progressStyle = isActive ? { width: `${percent}%` } : undefined;

    return (
      <div className={styles.stepTail}>
        <div className={styles.stepTailContent}>
          {isActive && (
            <div className={styles.stepTailProgress} style={progressStyle} />
          )}
        </div>
      </div>
    );
  };

  const getStepsClassName = () => {
    const classes = [styles.steps];

    if (direction === 'vertical') {
      classes.push(styles.stepsVertical);
    }

    if (size === 'small') {
      classes.push(styles.stepsSmall);
    }

    if (progressDot) {
      classes.push(styles.stepsDot);
    }

    if (type === 'navigation') {
      classes.push(styles.stepsNavigation);
    }

    if (labelPlacement === 'vertical') {
      classes.push(styles.stepsLabelVertical);
    }

    if (responsive) {
      classes.push(styles.stepsResponsive);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={getStepsClassName()}
      style={style}
      role="navigation"
      aria-label="步骤导航"
    >
      {items.map((item, index) => {
        const stepStatus = getStepStatus(index);
        const isClickable = type === 'navigation' && !item.disabled;

        return (
          <div
            key={index}
            className={`${styles.stepsItem} ${styles[`stepsItem-${stepStatus}`]} ${
              item.disabled ? styles.stepsItemDisabled : ''
            } ${isClickable ? styles.stepsItemClickable : ''}`}
            onClick={() => handleStepClick(index)}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-current={index === current ? 'step' : undefined}
            aria-disabled={item.disabled}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleStepClick(index);
              }
            }}
          >
            <div className={styles.stepsItemContainer}>
              <div className={styles.stepsItemTail}>
                {renderProgressBar(index, stepStatus)}
              </div>

              <div className={styles.stepsItemIcon}>
                <span className={`${styles.stepsItemIconInner} ${
                  progressDot ? styles.stepsItemIconDot : ''
                }`}>
                  {renderStepIcon(item, index, stepStatus)}
                </span>
              </div>

              <div className={styles.stepsItemContent}>
                <div className={styles.stepsItemTitle}>
                  {item.title}
                  {item.subTitle && (
                    <span className={styles.stepsItemSubtitle}>
                      {item.subTitle}
                    </span>
                  )}
                </div>
                {item.description && (
                  <div className={styles.stepsItemDescription}>
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
