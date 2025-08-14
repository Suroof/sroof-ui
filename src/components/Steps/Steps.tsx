import React from 'react';
import styles from './Steps.module.scss';

export interface StepItem {
  /** 标题 */
  title: React.ReactNode;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 是否禁用 */
  disabled?: boolean;
}

export interface StepsProps {
  /** 当前步骤 */
  current?: number;
  /** 指定当前步骤的状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 步骤条方向 */
  direction?: 'horizontal' | 'vertical';
  /** 步骤条类型 */
  type?: 'default' | 'navigation';
  /** 尺寸 */
  size?: 'default' | 'small';
  /** 步骤数据 */
  items?: StepItem[];
  /** 点击步骤时的回调 */
  onChange?: (current: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素（可以直接传入 Steps.Step） */
  children?: React.ReactNode;
  /** 标签放置位置 */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 是否显示进度点 */
  progressDot?: boolean | ((iconDot: React.ReactNode, { index, status, title, description }: { index: number; status: string; title: React.ReactNode; description?: React.ReactNode }) => React.ReactNode);
  /** 起始序号，从 0 开始记数 */
  initial?: number;
}

export interface StepProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 是否禁用 */
  disabled?: boolean;
}

// 单个步骤组件
const Step: React.FC<StepProps> = () => {
  // 这个组件主要用于类型定义，实际渲染在 Steps 组件中处理
  return null;
};

// 主步骤条组件
const Steps: React.FC<StepsProps> & {
  Step: typeof Step;
} = ({
  current = 0,
  status = 'process',
  direction = 'horizontal',
  type = 'default',
  size = 'default',
  items = [],
  onChange,
  className,
  style,
  children,
  labelPlacement = 'horizontal',
  progressDot = false,
  initial = 0,
}) => {
  // 处理子元素
  const processChildren = () => {
    if (children) {
      const childrenArray = React.Children.toArray(children);
      return childrenArray
        .filter(child => React.isValidElement(child) && child.type === Step)
        .map((child, index) => {
          const stepProps = (child as React.ReactElement<StepProps>).props;
          return {
            title: stepProps.title,
            subTitle: stepProps.subTitle,
            description: stepProps.description,
            icon: stepProps.icon,
            status: stepProps.status,
            disabled: stepProps.disabled,
          };
        });
    }
    return [];
  };

  // 获取步骤数据
  const getStepsData = () => {
    if (children) {
      return processChildren();
    }
    return items;
  };

  // 获取步骤状态
  const getStepStatus = (index: number, step: StepItem) => {
    if (step.status) {
      return step.status;
    }
    
    const adjustedIndex = index + initial;
    const adjustedCurrent = current + initial;
    
    if (adjustedIndex < adjustedCurrent) {
      return 'finish';
    }
    if (adjustedIndex === adjustedCurrent) {
      return status;
    }
    return 'wait';
  };

  // 处理步骤点击
  const handleStepClick = (index: number, step: StepItem) => {
    if (step.disabled || !onChange) {
      return;
    }
    onChange(index);
  };

  // 渲染图标
  const renderIcon = (step: StepItem, index: number, stepStatus: string) => {
    if (progressDot) {
      const dotNode = <span className={styles.progressDot} />;
      if (typeof progressDot === 'function') {
        return progressDot(dotNode, {
          index,
          status: stepStatus,
          title: step.title,
          description: step.description,
        });
      }
      return dotNode;
    }

    if (step.icon) {
      return step.icon;
    }

    if (stepStatus === 'finish') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
      );
    }

    if (stepStatus === 'error') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      );
    }

    return <span className={styles.stepNumber}>{index + 1 + initial}</span>;
  };

  // 获取Steps类名
  const getStepsClassName = () => {
    const classes = [styles.steps];
    
    classes.push(styles[direction]);
    classes.push(styles[type]);
    classes.push(styles[size]);
    
    if (labelPlacement === 'vertical' && direction === 'horizontal') {
      classes.push(styles.labelVertical);
    }
    
    if (progressDot) {
      classes.push(styles.progressDot);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  // 获取步骤类名
  const getStepClassName = (index: number, step: StepItem, stepStatus: string) => {
    const classes = [styles.step];
    
    classes.push(styles[stepStatus]);
    
    if (step.disabled) {
      classes.push(styles.disabled);
    }
    
    if (onChange && !step.disabled) {
      classes.push(styles.clickable);
    }
    
    return classes.join(' ');
  };

  const stepsData = getStepsData();

  if (stepsData.length === 0) {
    return null;
  }

  return (
    <div className={getStepsClassName()} style={style}>
      {stepsData.map((step, index) => {
        const stepStatus = getStepStatus(index, step);
        const isLast = index === stepsData.length - 1;
        
        return (
          <div
            key={index}
            className={getStepClassName(index, step, stepStatus)}
            onClick={() => handleStepClick(index, step)}
          >
            {/* 步骤图标 */}
            <div className={styles.stepIcon}>
              {renderIcon(step, index, stepStatus)}
            </div>
            
            {/* 连接线 */}
            {!isLast && (
              <div className={styles.stepTail}>
                <div className={styles.stepTailLine} />
              </div>
            )}
            
            {/* 步骤内容 */}
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>
                {step.title}
                {step.subTitle && (
                  <div className={styles.stepSubTitle}>{step.subTitle}</div>
                )}
              </div>
              {step.description && (
                <div className={styles.stepDescription}>{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 添加 Step 组件到 Steps
Steps.Step = Step;

export default Steps;