import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {Popover} from './Popover';
import Button from '../Button/Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '气泡弹出框组件，提供丰富的内容展示和多种触发方式。支持12个方向的弹出位置，具有优雅的动画效果和响应式设计。',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
      description: '弹出框的显示位置',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'manual'],
      description: '触发弹出框的方式',
    },
    mouseEnterDelay: {
      control: 'number',
      description: '鼠标移入显示的延迟时间（毫秒）',
    },
    mouseLeaveDelay: {
      control: 'number',
      description: '鼠标移出隐藏的延迟时间（毫秒）',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// 基本用法
export const Default: Story = {
  args: {
    content: '这是一个简单的弹出框内容',
    placement: 'top',
    trigger: 'hover',
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Popover {...args}>
        <Button>鼠标悬停显示</Button>
      </Popover>
    </div>
  ),
};

// 带标题的弹出框
export const WithTitle: Story = {
  args: {
    title: '弹出框标题',
    content: '这里是弹出框的详细内容，可以包含更多信息。',
    placement: 'top',
    trigger: 'hover',
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Popover {...args}>
        <Button>带标题的弹出框</Button>
      </Popover>
    </div>
  ),
};

// 点击触发
export const ClickTrigger: Story = {
  args: {
    title: '点击触发',
    content: '点击按钮触发弹出框，再次点击或点击外部区域关闭。',
    placement: 'bottom',
    trigger: 'click',
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Popover {...args}>
        <Button>点击显示</Button>
      </Popover>
    </div>
  ),
};

// 焦点触发
export const FocusTrigger: Story = {
  args: {
    content: '通过键盘导航或点击获得焦点时显示',
    placement: 'right',
    trigger: 'focus',
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Popover {...args}>
        <Button>获得焦点时显示</Button>
      </Popover>
    </div>
  ),
};

// 12个方向展示
export const AllPlacements: Story = {
  render: () => {
    const placements = [
      { placement: 'topLeft', text: 'TL' },
      { placement: 'top', text: 'Top' },
      { placement: 'topRight', text: 'TR' },
      { placement: 'leftTop', text: 'LT' },
      { placement: 'left', text: 'Left' },
      { placement: 'leftBottom', text: 'LB' },
      { placement: 'rightTop', text: 'RT' },
      { placement: 'right', text: 'Right' },
      { placement: 'rightBottom', text: 'RB' },
      { placement: 'bottomLeft', text: 'BL' },
      { placement: 'bottom', text: 'Bottom' },
      { placement: 'bottomRight', text: 'BR' },
    ] as const;

    return (
      <div style={{ padding: '100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 80px)',
            gridTemplateRows: 'repeat(4, 50px)',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {placements.map(({ placement, text }) => (
            <Popover
              key={placement}
              content={`这是${placement}位置的弹出框`}
              placement={placement}
              trigger="hover"
            >
              <Button size="small" style={{ width: '100%', fontSize: '12px' }}>
                {text}
              </Button>
            </Popover>
          ))}
        </div>
      </div>
    );
  },
};

// 丰富内容
export const RichContent: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Popover
        title="用户信息"
        content={
          <div style={{ maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1890ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginRight: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>John Doe</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>前端工程师</div>
              </div>
            </div>
            <p style={{ margin: '0 0 12px', color: '#6b7280', fontSize: '13px' }}>
              专注于 React 和 TypeScript 开发，热爱创造优秀的用户体验。
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="small" variant="primary">
                关注
              </Button>
              <Button size="small" variant="outline">
                私信
              </Button>
            </div>
          </div>
        }
        placement="rightTop"
        trigger="hover"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginRight: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            JD
          </div>
          <span>悬停查看详情</span>
        </div>
      </Popover>
    </div>
  ),
};

// 列表内容
export const ListContent: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Popover
        title="操作菜单"
        content={
          <div>
            <div
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              📝 编辑
            </div>
            <div
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              📋 复制
            </div>
            <div
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              🗑️ 删除
            </div>
          </div>
        }
        placement="bottomLeft"
        trigger="click"
      >
        <Button>操作菜单</Button>
      </Popover>
    </div>
  ),
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '50px', display: 'flex', gap: '12px' }}>
        <Popover
          content={
            <div>
              <p>这是受控模式的弹出框</p>
              <Button size="small" onClick={() => setOpen(false)}>
                关闭
              </Button>
            </div>
          }
          placement="top"
          trigger="manual"
          open={open}
          onOpenChange={setOpen}
        >
          <Button>触发器</Button>
        </Popover>
        <Button onClick={() => setOpen(!open)}>
          {open ? '关闭' : '打开'}弹出框
        </Button>
      </div>
    );
  },
};

// 自定义延迟
export const CustomDelay: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', gap: '16px' }}>
      <Popover
        content="立即显示，500ms后隐藏"
        placement="top"
        trigger="hover"
        mouseEnterDelay={0}
        mouseLeaveDelay={500}
      >
        <Button>快显示慢隐藏</Button>
      </Popover>
      <Popover
        content="500ms后显示，立即隐藏"
        placement="top"
        trigger="hover"
        mouseEnterDelay={500}
        mouseLeaveDelay={0}
      >
        <Button>慢显示快隐藏</Button>
      </Popover>
    </div>
  ),
};

// 自定义样式
export const CustomStyle: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Popover
        title="自定义样式"
        content="这个弹出框使用了自定义样式"
        placement="top"
        trigger="hover"
        overlayStyle={{
          maxWidth: '200px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
        }}
        overlayClassName="custom-popover"
      >
        <Button>自定义样式</Button>
      </Popover>
    </div>
  ),
};

// 无箭头
export const NoArrow: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Popover
        content="这个弹出框没有箭头指向"
        placement="top"
        trigger="hover"
        arrowPointAtCenter={false}
      >
        <Button>无箭头弹出框</Button>
      </Popover>
    </div>
  ),
};

// 嵌套弹出框
export const Nested: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Popover
        content={
          <div>
            <p>这是外层弹出框</p>
            <Popover
              content="这是内层弹出框"
              placement="right"
              trigger="hover"
            >
              <Button size="small">悬停显示内层</Button>
            </Popover>
          </div>
        }
        placement="top"
        trigger="hover"
      >
        <Button>嵌套弹出框</Button>
      </Popover>
    </div>
  ),
};
