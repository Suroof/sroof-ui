import React from 'react';
import styles from './Timeline.module.scss';

export interface TimelineItem {
  /** 时间轴内容 */
  children?: React.ReactNode;
  /** 时间轴颜色 */
  color?: 'blue' | 'red' | 'green' | 'gray' | string;
  /** 自定义时间轴点 */
  dot?: React.ReactNode;
  /** 时间轴标签 */
  label?: React.ReactNode;
  /** 位置 */
  position?: 'left' | 'right';
}

export interface TimelineProps {
  /** 时间轴项目列表 */
  items?: TimelineItem[];
  /** 时间轴模式 */
  mode?: 'left' | 'alternate' | 'right';
  /** 是否为待处理状态 */
  pending?: boolean | React.ReactNode;
  /** 待处理状态的时间轴点 */
  pendingDot?: React.ReactNode;
  /** 是否倒序显示 */
  reverse?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// 时间轴项目组件
const TimelineItemComponent: React.FC<TimelineItem & {
  index?: number;
  mode?: string;
  isLast?: boolean;
  isPending?: boolean;
}> = ({
  children,
  color = 'blue',
  dot,
  label,
  position,
  index = 0,
  mode = 'left',
  isLast = false,
  isPending = false,
}) => {
  const getItemPosition = () => {
    if (position) return position;
    if (mode === 'alternate') {
      return index % 2 === 0 ? 'left' : 'right';
    }
    return mode === 'right' ? 'right' : 'left';
  };

  const itemPosition = getItemPosition();

  const getItemClassName = () => {
    const classes = [styles.timelineItem];

    classes.push(styles[`item-${itemPosition}`]);

    if (isLast) {
      classes.push(styles.last);
    }

    if (isPending) {
      classes.push(styles.pending);
    }

    return classes.join(' ');
  };

  const getDotClassName = () => {
    const classes = [styles.timelineDot];

    if (dot) {
      classes.push(styles.customDot);
    } else {
      const colorClass = ['blue', 'red', 'green', 'gray'].includes(color)
        ? `dot-${color}`
        : 'dot-custom';
      classes.push(styles[colorClass]);
    }

    if (isPending) {
      classes.push(styles.pendingDot);
    }

    return classes.join(' ');
  };

  const getDotStyle = () => {
    if (dot || ['blue', 'red', 'green', 'gray'].includes(color)) {
      return {};
    }
    return { backgroundColor: color };
  };

  return (
    <li className={getItemClassName()}>
      <div className={styles.timelineItemTail} />
      <div className={getDotClassName()} style={getDotStyle()}>
        {dot}
      </div>
      <div className={styles.timelineItemContent}>
        {label && (
          <div className={styles.timelineItemLabel}>
            {label}
          </div>
        )}
        <div className={styles.timelineItemDescription}>
          {children}
        </div>
      </div>
    </li>
  );
};

export const Timeline: React.FC<TimelineProps> = ({
  items = [],
  mode = 'left',
  pending = false,
  pendingDot,
  reverse = false,
  children,
  className,
  style,
}) => {
  const getTimelineClassName = () => {
    const classes = [styles.timeline];

    classes.push(styles[`timeline-${mode}`]);

    if (pending) {
      classes.push(styles.timelinePending);
    }

    if (reverse) {
      classes.push(styles.timelineReverse);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  const renderItems = () => {
    let timelineItems: React.ReactNode[] = [];

    if (children) {
      timelineItems = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            mode,
            isLast: index === React.Children.count(children) - 1 && !pending,
          });
        }
        return child;
      }) || [];
    } else {
      timelineItems = items.map((item, index) => (
        <TimelineItemComponent
          key={index}
          {...item}
          index={index}
          mode={mode}
          isLast={index === items.length - 1 && !pending}
        />
      ));
    }

    if (pending) {
      timelineItems.push(
        <TimelineItemComponent
          key="pending"
          dot={pendingDot || <div className={styles.pendingSpinner} />}
          index={timelineItems.length}
          mode={mode}
          isLast={true}
          isPending={true}
        >
          {typeof pending === 'boolean' ? '处理中...' : pending}
        </TimelineItemComponent>
      );
    }

    return reverse ? timelineItems.reverse() : timelineItems;
  };

  return (
    <ul className={getTimelineClassName()} style={style}>
      {renderItems()}
    </ul>
  );
};

// 时间轴项目组件，用于组合模式
Timeline.Item = TimelineItemComponent;

