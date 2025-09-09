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
        component: '时间轴组件，用于垂直展示时间流信息。支持多种模式、自定义样式和丰富的交互效果。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['left', 'alternate', 'right'],
      description: '时间轴模式',
    },
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
  args: {
    items: [
      {
        children: '创建服务现场 2023-05-01',
        color: 'green',
      },
      {
        children: '初步排除网络异常 2023-05-02',
        color: 'green',
      },
      {
        children: '技术测试异常 2023-05-03',
        color: 'red',
      },
      {
        children: '网络异常正在修复 2023-05-04',
        color: 'blue',
      },
    ],
  },
};

// 带标签
export const WithLabels: Story = {
  args: {
    items: [
      {
        label: '2023-05-01',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>项目启动</h4>
            <p>成功启动新项目，团队成员已就位，开始制定详细的项目计划。</p>
          </div>
        ),
        color: 'green',
      },
      {
        label: '2023-05-05',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>需求分析</h4>
            <p>完成用户需求收集和分析，确定了核心功能和技术架构。</p>
          </div>
        ),
        color: 'blue',
      },
      {
        label: '2023-05-10',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>设计评审</h4>
            <p>UI/UX 设计稿完成，通过了设计评审，准备进入开发阶段。</p>
          </div>
        ),
        color: 'blue',
      },
      {
        label: '2023-05-15',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>开发遇阻</h4>
            <p>在开发过程中遇到技术难题，需要重新评估技术方案。</p>
          </div>
        ),
        color: 'red',
      },
    ],
  },
};

// 自定义图标
export const CustomDots: Story = {
  args: {
    items: [
      {
        dot: <span style={{ color: '#52c41a', fontSize: '16px' }}>✓</span>,
        children: '任务完成 - 用户注册功能',
        color: 'green',
      },
      {
        dot: <span style={{ color: '#1890ff', fontSize: '16px' }}>⚠</span>,
        children: '任务进行中 - 支付模块开发',
        color: 'blue',
      },
      {
        dot: <span style={{ color: '#ff4d4f', fontSize: '16px' }}>✗</span>,
        children: '任务失败 - 数据迁移出错',
        color: 'red',
      },
      {
        dot: <span style={{ color: '#fa8c16', fontSize: '14px' }}>🕒</span>,
        children: '等待执行 - 性能优化',
        color: 'gray',
      },
    ],
  },
};

// 交替模式
export const AlternateMode: Story = {
  args: {
    mode: 'alternate',
    items: [
      {
        label: '第一阶段',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>项目规划</h4>
            <p>制定项目计划，分配资源，确定时间节点。</p>
          </div>
        ),
        color: 'blue',
      },
      {
        label: '第二阶段',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>需求设计</h4>
            <p>收集用户需求，进行原型设计和技术选型。</p>
          </div>
        ),
        color: 'green',
      },
      {
        label: '第三阶段',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>开发实施</h4>
            <p>按照设计文档进行编码开发，完成核心功能。</p>
          </div>
        ),
        color: 'blue',
      },
      {
        label: '第四阶段',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>测试部署</h4>
            <p>进行全面测试，修复问题，部署到生产环境。</p>
          </div>
        ),
        color: 'green',
      },
    ],
  },
};

// 待处理状态
export const PendingState: Story = {
  args: {
    pending: true,
    items: [
      {
        children: '已完成用户界面设计',
        color: 'green',
      },
      {
        children: '已完成后端API开发',
        color: 'green',
      },
      {
        children: '正在进行集成测试',
        color: 'blue',
      },
    ],
  },
};

// 自定义待处理状态
export const CustomPending: Story = {
  args: {
    pending: '正在处理中，请稍后...',
    pendingDot: <span style={{ color: '#1890ff' }}>⏳</span>,
    items: [
      {
        children: '提交订单',
        color: 'green',
      },
      {
        children: '支付确认',
        color: 'green',
      },
      {
        children: '商家接单',
        color: 'blue',
      },
    ],
  },
};

// 右侧模式
export const RightMode: Story = {
  args: {
    mode: 'right',
    items: [
      {
        label: '09:30',
        children: '开始日常工作，检查邮件和消息',
        color: 'blue',
      },
      {
        label: '10:00',
        children: '参加团队晨会，讨论今日计划',
        color: 'green',
      },
      {
        label: '14:30',
        children: '完成重要功能开发',
        color: 'green',
      },
      {
        label: '16:00',
        children: '代码评审和测试',
        color: 'blue',
      },
    ],
  },
};

// 倒序显示
export const ReverseOrder: Story = {
  args: {
    reverse: true,
    items: [
      {
        label: '最新',
        children: '版本 3.0 发布 - 新增多项功能',
        color: 'green',
      },
      {
        label: '1 天前',
        children: '完成性能优化和Bug修复',
        color: 'blue',
      },
      {
        label: '3 天前',
        children: '用户反馈收集和分析',
        color: 'blue',
      },
      {
        label: '1 周前',
        children: '版本 2.5 发布',
        color: 'gray',
      },
    ],
  },
};

// 丰富内容示例
export const RichContent: Story = {
  args: {
    items: [
      {
        label: '2023-12-01',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>🚀 项目启动</h4>
            <p>正式启动新的产品开发项目，组建跨职能团队。</p>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>确定项目目标和范围</li>
              <li>分配团队角色和职责</li>
              <li>制定初步时间计划</li>
            </ul>
            <blockquote style={{
              margin: '8px 0',
              padding: '8px 16px',
              borderLeft: '4px solid #1890ff',
              backgroundColor: 'rgba(24, 144, 255, 0.05)'
            }}>
              预计项目周期：3个月
            </blockquote>
          </div>
        ),
        color: 'blue',
      },
      {
        label: '2023-12-10',
        children: (
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
        ),
        color: 'green',
      },
      {
        label: '2023-12-20',
        children: (
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#fa8c16' }}>⚠️ 技术难题</h4>
            <p>在实现核心算法时遇到性能瓶颈。</p>
            <p>
              需要重新评估技术方案，考虑使用 <code>WebWorker</code> 来处理大量数据计算。
            </p>
            <p>
              相关链接：
              <a href="#" style={{ color: '#1890ff', textDecoration: 'none', marginLeft: '8px' }}>
                技术调研报告
              </a>
            </p>
          </div>
        ),
        color: 'red',
      },
    ],
  },
};

// 组合使用方式
export const CompositeUsage: Story = {
  render: () => (
    <Timeline mode="alternate">
      <Timeline.Item
        label="Phase 1"
        color="green"
        dot={<span style={{ color: '#52c41a', fontSize: '16px' }}>🎯</span>}
      >
        <h4 style={{ margin: '0 0 8px 0' }}>目标设定</h4>
        <p>明确产品定位和用户需求，制定可行的发展目标。</p>
      </Timeline.Item>

      <Timeline.Item
        label="Phase 2"
        color="blue"
        dot={<span style={{ color: '#1890ff', fontSize: '16px' }}>🛠</span>}
      >
        <h4 style={{ margin: '0 0 8px 0' }}>开发阶段</h4>
        <p>基于目标开始产品开发，包括前端、后端和数据库设计。</p>
      </Timeline.Item>

      <Timeline.Item
        label="Phase 3"
        color="red"
        dot={<span style={{ color: '#ff4d4f', fontSize: '16px' }}>🧪</span>}
      >
        <h4 style={{ margin: '0 0 8px 0' }}>测试验证</h4>
        <p>进行全面的功能测试、性能测试和用户体验测试。</p>
      </Timeline.Item>

      <Timeline.Item
        label="Phase 4"
        color="gray"
        dot={<span style={{ color: '#fa8c16', fontSize: '16px' }}>🚀</span>}
      >
        <h4 style={{ margin: '0 0 8px 0' }}>产品发布</h4>
        <p>准备发布到生产环境，进行最终的部署和监控。</p>
      </Timeline.Item>
    </Timeline>
  ),
};
