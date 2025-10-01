import React from 'react';

export interface TimelineItemProps {
  children?: React.ReactNode;
  color?: string;
  dot?: React.ReactNode;
  label?: React.ReactNode;
}

export interface TimelineProps {
  children?: React.ReactNode;
  pending?: boolean | React.ReactNode;
  reverse?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  children,
  color = '#1890ff',
  dot,
  label
}) => {
  return (
    <div style={{
      position: 'relative',
      paddingLeft: '24px',
      paddingBottom: '24px'
    }}>
      {/* 连接线 */}
      <div style={{
        position: 'absolute',
        left: '10px',
        top: '22px',
        bottom: '-2px',
        width: '2px',
        backgroundColor: '#e8e8e8'
      }} />

      {/* 时间节点 */}
      <div style={{
        position: 'absolute',
        left: '4px',
        top: '4px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        {dot}
      </div>

      {/* 标签 */}
      {label && (
        <div style={{
          marginBottom: '8px',
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.45)'
        }}>
          {label}
        </div>
      )}

      {/* 内容 */}
      <div style={{
        fontSize: '14px',
        lineHeight: '1.5',
        color: 'rgba(0, 0, 0, 0.85)'
      }}>
        {children}
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> & { Item: typeof TimelineItem } = ({
  children,
  pending = false,
  reverse = false
}) => {
  const items = React.Children.toArray(children);

  // 添加待处理项
  let processedItems = [...items];
  if (pending) {
    processedItems.push(
      <div style={{
        position: 'relative',
        paddingLeft: '24px',
        paddingBottom: '16px'
      }}>
        {/* 待处理节点 */}
        <div style={{
          position: 'absolute',
          left: '4px',
          top: '4px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '2px solid #bfbfbf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#bfbfbf'
          }} />
        </div>

        <div style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: 'rgba(0, 0, 0, 0.85)'
        }}>
          {typeof pending === 'boolean' ? '进行中...' : pending}
        </div>
      </div>
    );
  }

  // 如果需要倒序，则反转数组
  if (reverse) {
    processedItems = processedItems.reverse();
  }

  return (
    <div style={{
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji'`,
    }}>
      {processedItems}
    </div>
  );
};

Timeline.Item = TimelineItem;
