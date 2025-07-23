import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './Tabs';
import React, { ReactElement } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '标签页组件，支持受控和非受控模式',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeKey: {
      description: '当前激活的标签页 key（受控模式）',
      control: 'text',
    },
    defaultActiveKey: {
      description: '默认激活的标签页 key（非受控模式）',
      control: 'text',
    },
    centered: {
      description: '标签页是否居中显示',
      control: 'boolean',
    },
    className: {
      description: '自定义样式类名',
      control: 'text',
    },
    onChange: {
      description: '标签页切换时的回调函数',
      action: 'changed',
    },
    children: {
      description: 'Tab 子组件',
      control: false,
    },
  },
  args: {
    centered: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// 默认示例
export const Default: Story = {
  args: {
    defaultActiveKey: 'tab1',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tab key="tab1" label="标签页 1">
        <div style={{ padding: '20px' }}>
          <h3>标签页 1 内容</h3>
          <p>这是第一个标签页的内容。</p>
        </div>
      </Tab>
      <Tab key="tab2" label="标签页 2">
        <div style={{ padding: '20px' }}>
          <h3>标签页 2 内容</h3>
          <p>这是第二个标签页的内容。</p>
        </div>
      </Tab>
      <Tab key="tab3" label="标签页 3">
        <div style={{ padding: '20px' }}>
          <h3>标签页 3 内容</h3>
          <p>这是第三个标签页的内容。</p>
        </div>
      </Tab>
    </Tabs>
  ),
};

// 受控模式示例
export const Controlled: Story = {
  args: {
    activeKey: 'tab2',
  },
  render: (args): ReactElement => {
    const [activeKey, setActiveKey] = React.useState(args.activeKey || 'tab2');

    return (
      <Tabs
        {...args}
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          args.onChange?.(key);
        }}
      >
        <Tab key="tab1" label="首页">
          <div style={{ padding: '20px' }}>
            <h3>首页内容</h3>
            <p>欢迎来到首页！</p>
          </div>
        </Tab>
        <Tab key="tab2" label="产品">
          <div style={{ padding: '20px' }}>
            <h3>产品页面</h3>
            <p>这里展示我们的产品信息。</p>
          </div>
        </Tab>
        <Tab key="tab3" label="关于我们">
          <div style={{ padding: '20px' }}>
            <h3>关于我们</h3>
            <p>了解更多关于我们公司的信息。</p>
          </div>
        </Tab>
      </Tabs>
    );
  },
};

// 多标签页示例
export const ManyTabs: Story = {
  args: {
    defaultActiveKey: 'tab1',
  },
  render: (args) => (
    <Tabs {...args}>
      {Array.from({ length: 8 }, (_, index) => (
        <Tab key={`tab${index + 1}`} label={`标签 ${index + 1}`}>
          <div style={{ padding: '20px' }}>
            <h3>标签 {index + 1} 内容</h3>
            <p>这是第 {index + 1} 个标签页的内容。</p>
          </div>
        </Tab>
      ))}
    </Tabs>
  ),
};

// 自定义样式示例
export const CustomStyle: Story = {
  args: {
    defaultActiveKey: 'tab1',
    className: 'custom-tabs',
  },
  render: (args) => (
    <div>
      <style>{`
        .custom-tabs {
          border: 2px solid #1890ff;
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
      <Tabs {...args}>
        <Tab key="tab1" label="🏠 首页">
          <div style={{ padding: '20px' }}>
            <h3>带图标的标签页</h3>
            <p>这个示例展示了如何在标签页中使用图标。</p>
          </div>
        </Tab>
        <Tab key="tab2" label="📊 数据">
          <div style={{ padding: '20px' }}>
            <h3>数据页面</h3>
            <p>这里展示数据统计信息。</p>
          </div>
        </Tab>
        <Tab key="tab3" label="⚙️ 设置">
          <div style={{ padding: '20px' }}>
            <h3>设置页面</h3>
            <p>在这里可以配置系统设置。</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  ),
};