import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {Timeline} from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '简洁的时间轴组件，用于垂直展示时间流信息。提供清晰的视觉层次和灵活的内容展示能力。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pending: {
      control: 'boolean',
      description: '是否为待处理状态',
    },
    reverse: {
      control: 'boolean',
      description: '是否倒序显示',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// 基本使用
export const Default: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>创建服务现场 2023-05-01</Timeline.Item>
      <Timeline.Item>初步排除网络异常 2023-05-02</Timeline.Item>
      <Timeline.Item>技术测试异常 2023-05-03</Timeline.Item>
      <Timeline.Item>网络异常正在修复 2023-05-04</Timeline.Item>
    </Timeline>
  )
};

// 带标签
export const WithLabels: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item
        label="2023-05-01"
        color="#52c41a"
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>项目启动</h4>
          <p>成功启动新项目，团队成员已就位，开始制定详细的项目计划。</p>
        </div>
      </Timeline.Item>
      <Timeline.Item
        label="2023-05-05"
        color="#1890ff"
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>需求分析</h4>
          <p>完成用户需求收集和分析，确定了核心功能和技术架构。</p>
        </div>
      </Timeline.Item>
      <Timeline.Item
        label="2023-05-10"
        color="#722ed1"
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>设计评审</h4>
          <p>UI/UX 设计稿完成，通过了设计评审，准备进入开发阶段。</p>
        </div>
      </Timeline.Item>
    </Timeline>
  )
};

// 自定义图标
export const CustomDots: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item
        dot={<span>✓</span>}
        color="#52c41a"
      >
        任务完成 - 用户注册功能
      </Timeline.Item>
      <Timeline.Item
        dot={<span>⚙</span>}
        color="#1890ff"
      >
        任务进行中 - 支付模块开发
      </Timeline.Item>
      <Timeline.Item
        dot={<span>✗</span>}
        color="#ff4d4f"
      >
        任务失败 - 数据迁移出错
      </Timeline.Item>
      <Timeline.Item
        dot={<span>⋯</span>}
        color="#fa8c16"
      >
        等待执行 - 性能优化
      </Timeline.Item>
    </Timeline>
  )
};

// 待处理状态
export const PendingState: Story = {
  args: {
    pending: true,
  },
  render: (args) => (
    <Timeline pending={args.pending}>
      <Timeline.Item color="#52c41a">已完成用户界面设计</Timeline.Item>
      <Timeline.Item color="#52c41a">已完成后端API开发</Timeline.Item>
      <Timeline.Item color="#1890ff">正在进行集成测试</Timeline.Item>
    </Timeline>
  )
};

// 自定义待处理状态
export const CustomPending: Story = {
  args: {
    pending: '正在处理中，请稍后...',
  },
  render: (args) => (
    <Timeline pending={args.pending}>
      <Timeline.Item color="#52c41a">提交订单</Timeline.Item>
      <Timeline.Item color="#52c41a">支付确认</Timeline.Item>
      <Timeline.Item color="#1890ff">商家接单</Timeline.Item>
    </Timeline>
  )
};

// 倒序显示
export const ReverseOrder: Story = {
  args: {
    reverse: true,
  },
  render: (args) => (
    <Timeline reverse={args.reverse}>
      <Timeline.Item label="最新" color="#52c41a">
        版本 3.0 发布 - 新增多项功能
      </Timeline.Item>
      <Timeline.Item label="1 天前" color="#1890ff">
        完成性能优化和Bug修复
      </Timeline.Item>
      <Timeline.Item label="3 天前" color="#fa8c16">
        用户反馈收集和分析
      </Timeline.Item>
      <Timeline.Item label="1 周前" color="#d9d9d9">
        版本 2.5 发布
      </Timeline.Item>
    </Timeline>
  )
};

// 丰富内容示例
export const RichContent: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item
        label="2023-12-01"
        color="#1890ff"
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>🚀 项目启动</h4>
          <p>正式启动新的产品开发项目，组建跨职能团队。</p>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>确定项目目标和范围</li>
            <li>分配团队角色和职责</li>
            <li>制定初步时间计划</li>
          </ul>
        </div>
      </Timeline.Item>
      <Timeline.Item
        label="2023-12-10"
        color="#52c41a"
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#52c41a' }}>✅ 需求确认</h4>
          <p>完成详细的需求分析和用户故事梳理。</p>
          <p>关键成果：</p>
          <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>用户画像和使用场景分析</li>
            <li>功能需求优先级排序</li>
            <li>技术架构设计方案</li>
          </ol>
        </div>
      </Timeline.Item>
      <Timeline.Item
        label="2023-12-20"
        color="#fa8c16"
      >
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#fa8c16' }}>⚠️ 技术难题</h4>
          <p>在实现核心算法时遇到性能瓶颈。</p>
          <p>
            需要重新评估技术方案，考虑使用 <code>WebWorker</code> 来处理大量数据计算。
          </p>
        </div>
      </Timeline.Item>
    </Timeline>
  )
};