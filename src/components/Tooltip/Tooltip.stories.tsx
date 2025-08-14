import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '文字提示组件，鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '提示内容',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      description: '显示位置',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: '触发方式',
    },
    arrow: {
      control: 'boolean',
      description: '是否显示箭头',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    mouseEnterDelay: {
      control: 'number',
      description: '显示延迟（毫秒）',
    },
    mouseLeaveDelay: {
      control: 'number',
      description: '隐藏延迟（毫秒）',
    },
    color: {
      control: 'color',
      description: '背景颜色',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 基础用法
export const Default: Story = {
  args: {
    title: '这是一个提示信息',
    placement: 'top',
    trigger: 'hover',
    arrow: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>悬停显示提示</Button>
    </Tooltip>
  ),
};

// 不同位置
export const Placement: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', placeItems: 'center' }}>
      <Tooltip title="顶部左侧" placement="topLeft">
        <Button>TL</Button>
      </Tooltip>
      <Tooltip title="顶部居中" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="顶部右侧" placement="topRight">
        <Button>TR</Button>
      </Tooltip>
      
      <Tooltip title="左侧" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <div></div>
      <Tooltip title="右侧" placement="right">
        <Button>Right</Button>
      </Tooltip>
      
      <Tooltip title="底部左侧" placement="bottomLeft">
        <Button>BL</Button>
      </Tooltip>
      <Tooltip title="底部居中" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="底部右侧" placement="bottomRight">
        <Button>BR</Button>
      </Tooltip>
    </div>
  ),
};

// 不同触发方式
export const Trigger: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Tooltip title="鼠标悬停触发" trigger="hover">
        <Button>悬停触发</Button>
      </Tooltip>
      <Tooltip title="点击触发" trigger="click">
        <Button>点击触发</Button>
      </Tooltip>
      <Tooltip title="焦点触发" trigger="focus">
        <Button>焦点触发</Button>
      </Tooltip>
    </div>
  ),
};

// 自定义颜色
export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Tooltip title="蓝色提示" color="#1890ff">
        <Button variant="primary">蓝色</Button>
      </Tooltip>
      <Tooltip title="绿色提示" color="#52c41a">
        <Button>绿色</Button>
      </Tooltip>
      <Tooltip title="红色提示" color="#ff4d4f">
        <Button variant="danger">红色</Button>
      </Tooltip>
      <Tooltip title="紫色提示" color="#722ed1">
        <Button>紫色</Button>
      </Tooltip>
    </div>
  ),
};

// 无箭头
export const NoArrow: Story = {
  args: {
    title: '无箭头的提示',
    arrow: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>无箭头提示</Button>
    </Tooltip>
  ),
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Tooltip title="正常提示">
        <Button>正常状态</Button>
      </Tooltip>
      <Tooltip title="禁用提示" disabled>
        <Button>禁用提示</Button>
      </Tooltip>
    </div>
  ),
};

// 长文本
export const LongText: Story = {
  args: {
    title: '这是一个很长的提示信息，用来测试文本换行和最大宽度限制。当文本超过最大宽度时，会自动换行显示。',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>长文本提示</Button>
    </Tooltip>
  ),
};

// 延迟显示
export const Delay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Tooltip title="无延迟" mouseEnterDelay={0} mouseLeaveDelay={0}>
        <Button>无延迟</Button>
      </Tooltip>
      <Tooltip title="500ms延迟" mouseEnterDelay={500} mouseLeaveDelay={500}>
        <Button>500ms延迟</Button>
      </Tooltip>
      <Tooltip title="1000ms延迟" mouseEnterDelay={1000} mouseLeaveDelay={1000}>
        <Button>1000ms延迟</Button>
      </Tooltip>
    </div>
  ),
};

// 复杂内容
export const ComplexContent: Story = {
  args: {
    title: (
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>复杂提示内容</div>
        <div>支持 JSX 元素</div>
        <div style={{ color: '#ffd700' }}>可以包含样式</div>
      </div>
    ),
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>复杂内容</Button>
    </Tooltip>
  ),
};