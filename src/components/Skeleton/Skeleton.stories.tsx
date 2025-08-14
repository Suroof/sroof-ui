import type { Meta, StoryObj } from '@storybook/react';
import Skeleton, { SkeletonButton, SkeletonInput, SkeletonImage } from './Skeleton';
import React from 'react';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '在需要等待加载内容的位置提供一个占位图形组合。',
      },
    },
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: '是否显示动画效果',
    },
    avatar: {
      control: 'object',
      description: '是否显示头像占位图',
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态',
    },
    paragraph: {
      control: 'object',
      description: '设置段落占位图的属性',
    },
    title: {
      control: 'object',
      description: '是否显示标题占位图',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// 基础用法
export const Basic: Story = {
  args: {
    active: false,
    loading: true,
  },
};

// 动画效果
export const Active: Story = {
  args: {
    active: true,
    loading: true,
  },
};

// 复杂的组合
export const Complex: Story = {
  args: {
    active: true,
    avatar: true,
    loading: true,
    paragraph: { rows: 4 },
  },
};

// 自定义头像
export const CustomAvatar: Story = {
  args: {
    active: true,
    avatar: {
      size: 'large',
      shape: 'square',
    },
    loading: true,
  },
};

// 自定义段落
export const CustomParagraph: Story = {
  args: {
    active: true,
    loading: true,
    paragraph: {
      rows: 5,
      width: ['100%', '80%', '60%', '40%', '20%'],
    },
  },
};

// 只显示段落
export const ParagraphOnly: Story = {
  args: {
    active: true,
    avatar: false,
    title: false,
    loading: true,
    paragraph: { rows: 3 },
  },
};

// 只显示标题
export const TitleOnly: Story = {
  args: {
    active: true,
    avatar: false,
    title: { width: '50%' },
    paragraph: false,
    loading: true,
  },
};

// 加载完成状态
export const LoadingComplete: Story = {
  args: {
    loading: false,
    children: (
      <div>
        <h3>加载完成的内容</h3>
        <p>这是实际的内容，当 loading 为 false 时显示。</p>
      </div>
    ),
  },
};

// 骨架屏按钮
export const ButtonSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <SkeletonButton active />
      <SkeletonButton active size="large" />
      <SkeletonButton active size="small" />
      <SkeletonButton active shape="round" />
      <SkeletonButton active shape="circle" />
      <SkeletonButton active block style={{ width: '200px' }} />
    </div>
  ),
};

// 骨架屏输入框
export const InputSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <SkeletonInput active />
      <SkeletonInput active size="large" />
      <SkeletonInput active size="small" />
    </div>
  ),
};

// 骨架屏图片
export const ImageSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: '300px' }}>
      <SkeletonImage active />
    </div>
  ),
};

// 列表骨架屏
export const ListSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
          <Skeleton
            active
            avatar
            paragraph={{ rows: 2 }}
          />
        </div>
      ))}
    </div>
  ),
};

// 卡片骨架屏
export const CardSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', border: '1px solid #f0f0f0', borderRadius: '8px', padding: '16px' }}>
      <SkeletonImage active style={{ marginBottom: '16px', height: '200px' }} />
      <Skeleton
        active
        title={{ width: '60%' }}
        paragraph={{ rows: 3, width: ['100%', '80%', '40%'] }}
      />
    </div>
  ),
};

// 表格骨架屏
export const TableSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      {/* 表头 */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
        <SkeletonInput active style={{ flex: 1 }} />
        <SkeletonInput active style={{ flex: 1 }} />
        <SkeletonInput active style={{ flex: 1 }} />
        <SkeletonButton active />
      </div>
      
      {/* 表格行 */}
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '12px', padding: '12px', alignItems: 'center' }}>
          <SkeletonInput active style={{ flex: 1 }} />
          <SkeletonInput active style={{ flex: 1 }} />
          <SkeletonInput active style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <SkeletonButton active size="small" />
            <SkeletonButton active size="small" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// 动态演示
export const DynamicDemo: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
      const timer = setInterval(() => {
        setLoading(prev => !prev);
      }, 3000);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div style={{ maxWidth: '500px' }}>
        <p>每3秒切换一次加载状态</p>
        <Skeleton
          active
          avatar
          loading={loading}
          paragraph={{ rows: 3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              U
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0' }}>用户名</h3>
              <p style={{ margin: '0', color: '#666' }}>这是用户的详细信息描述，包含了一些重要的内容。</p>
              <p style={{ margin: '8px 0 0 0', color: '#999', fontSize: '14px' }}>最后活跃时间：2小时前</p>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  },
};