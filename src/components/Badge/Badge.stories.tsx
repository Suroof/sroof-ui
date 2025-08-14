import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from './Badge';
import Button from '../Button/Button';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '徽标数组件，图标右上角的圆形徽标数字。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: '展示的数字',
    },
    overflowCount: {
      control: 'number',
      description: '展示封顶的数字值',
    },
    showZero: {
      control: 'boolean',
      description: '当数值为 0 时，是否展示 Badge',
    },
    dot: {
      control: 'boolean',
      description: '不展示数字，只有一个小红点',
    },
    status: {
      control: 'select',
      options: ['success', 'processing', 'default', 'error', 'warning'],
      description: '设置 Badge 的状态',
    },
    text: {
      control: 'text',
      description: '在设置了 status 的前提下有效，设置状态点的文本',
    },
    color: {
      control: 'color',
      description: '设置状态点的颜色',
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: '设置 Badge 的大小',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// 基础用法
export const Default: Story = {
  args: {
    count: 5,
  },
  render: (args) => (
    <Badge {...args}>
      <Button>按钮</Button>
    </Badge>
  ),
};

// 独立使用
export const Standalone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={25} />
      <Badge count={4} color="#52c41a" />
      <Badge count={109} color="#faad14" />
    </div>
  ),
};

// 封顶数字
export const OverflowCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={99}>
        <Button>99</Button>
      </Badge>
      <Badge count={100}>
        <Button>100</Button>
      </Badge>
      <Badge count={99} overflowCount={10}>
        <Button>10+</Button>
      </Badge>
      <Badge count={1000} overflowCount={999}>
        <Button>999+</Button>
      </Badge>
    </div>
  ),
};

// 小红点
export const Dot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge dot>
        <Button>消息</Button>
      </Badge>
      <Badge dot>
        <a href="#">链接</a>
      </Badge>
      <Badge dot color="#52c41a">
        <span>文本</span>
      </Badge>
    </div>
  ),
};

// 状态点
export const Status: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Badge status="success" text="成功" />
      <Badge status="error" text="错误" />
      <Badge status="default" text="默认" />
      <Badge status="processing" text="进行中" />
      <Badge status="warning" text="警告" />
    </div>
  ),
};

// 动态变化
export const Dynamic: Story = {
  render: () => {
    const [count, setCount] = React.useState(5);
    const [show, setShow] = React.useState(true);
    
    const increase = () => {
      setCount(count + 1);
    };
    
    const decline = () => {
      let newCount = count - 1;
      if (newCount < 0) {
        newCount = 0;
      }
      setCount(newCount);
    };
    
    const toggle = () => {
      setShow(!show);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div>
          <Badge count={show ? count : 0}>
            <Button>消息</Button>
          </Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" onClick={decline}>-</Button>
          <Button size="small" onClick={increase}>+</Button>
          <Button size="small" onClick={toggle}>{show ? '隐藏' : '显示'}</Button>
        </div>
      </div>
    );
  },
};

// 自定义颜色
export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={5} color="#f50">
        <Button>红色</Button>
      </Badge>
      <Badge count={5} color="#2db7f5">
        <Button>蓝色</Button>
      </Badge>
      <Badge count={5} color="#87d068">
        <Button>绿色</Button>
      </Badge>
      <Badge count={5} color="#108ee9">
        <Button>青色</Button>
      </Badge>
    </div>
  ),
};

// 不同尺寸
export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={5} size="default">
        <Button>默认</Button>
      </Badge>
      <Badge count={5} size="small">
        <Button>小号</Button>
      </Badge>
      <Badge dot size="default">
        <Button>默认点</Button>
      </Badge>
      <Badge dot size="small">
        <Button>小号点</Button>
      </Badge>
    </div>
  ),
};

// 显示零
export const ShowZero: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={0}>
        <Button>隐藏零</Button>
      </Badge>
      <Badge count={0} showZero>
        <Button>显示零</Button>
      </Badge>
    </div>
  ),
};

// 偏移量
export const Offset: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={5}>
        <Button>默认位置</Button>
      </Badge>
      <Badge count={5} offset={[10, 10]}>
        <Button>向右下偏移</Button>
      </Badge>
      <Badge count={5} offset={[-10, -10]}>
        <Button>向左上偏移</Button>
      </Badge>
    </div>
  ),
};

// 复杂示例
export const Complex: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Badge count={5}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            background: '#eee', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            头像
          </div>
        </Badge>
        
        <Badge dot>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            background: '#1890ff', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            图标
          </div>
        </Badge>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Badge status="success" text="成功状态" />
        <Badge status="error" text="错误状态" />
        <Badge status="processing" text="进行中状态" />
        <Badge status="warning" text="警告状态" />
        <Badge status="default" text="默认状态" />
      </div>
    </div>
  ),
};