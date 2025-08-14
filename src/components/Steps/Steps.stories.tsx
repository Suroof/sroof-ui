import type { Meta, StoryObj } from '@storybook/react';
import Steps from './Steps';
import React from 'react';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '引导用户按照流程完成任务的导航条。',
      },
    },
  },
  argTypes: {
    current: {
      control: 'number',
      description: '当前步骤',
    },
    status: {
      control: 'select',
      options: ['wait', 'process', 'finish', 'error'],
      description: '指定当前步骤的状态',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '步骤条方向',
    },
    type: {
      control: 'select',
      options: ['default', 'navigation'],
      description: '步骤条类型',
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: '尺寸',
    },
    labelPlacement: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '标签放置位置',
    },
    progressDot: {
      control: 'boolean',
      description: '是否显示进度点',
    },
    initial: {
      control: 'number',
      description: '起始序号',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

// 基础用法
export const Basic: Story = {
  args: {
    current: 1,
    items: [
      {
        title: '已完成',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '进行中',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '待运行',
        description: '这里是该步骤的描述信息',
      },
    ],
  },
};

// 使用子组件
export const WithChildren: Story = {
  render: () => (
    <Steps current={1}>
      <Steps.Step title="已完成" description="这里是该步骤的描述信息" />
      <Steps.Step title="进行中" description="这里是该步骤的描述信息" />
      <Steps.Step title="待运行" description="这里是该步骤的描述信息" />
    </Steps>
  ),
};

// 小尺寸
export const Small: Story = {
  args: {
    current: 1,
    size: 'small',
    items: [
      { title: '已完成' },
      { title: '进行中' },
      { title: '待运行' },
    ],
  },
};

// 带图标
export const WithIcon: Story = {
  args: {
    current: 1,
    items: [
      {
        title: '登录',
        status: 'finish',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47z" />
          </svg>
        ),
      },
      {
        title: '验证',
        status: 'process',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
          </svg>
        ),
      },
      {
        title: '支付',
        status: 'wait',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zM9 1a1 1 0 0 0-2 0v3h2V1z" />
          </svg>
        ),
      },
      {
        title: '完成',
        status: 'wait',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        ),
      },
    ],
  },
};

// 垂直方向
export const Vertical: Story = {
  args: {
    current: 1,
    direction: 'vertical',
    items: [
      {
        title: '已完成',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '进行中',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '待运行',
        description: '这里是该步骤的描述信息',
      },
    ],
  },
};

// 垂直标签
export const VerticalLabel: Story = {
  args: {
    current: 1,
    labelPlacement: 'vertical',
    items: [
      { title: '已完成' },
      { title: '进行中' },
      { title: '待运行' },
    ],
  },
};

// 进度点
export const ProgressDot: Story = {
  args: {
    current: 1,
    progressDot: true,
    items: [
      {
        title: '已完成',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '进行中',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '待运行',
        description: '这里是该步骤的描述信息',
      },
    ],
  },
};

// 自定义进度点
export const CustomProgressDot: Story = {
  render: () => (
    <Steps
      current={1}
      progressDot={(iconDot, { index, status }) => (
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: status === 'finish' ? '#52c41a' : status === 'process' ? '#1890ff' : '#d9d9d9',
            display: 'inline-block',
            border: '2px solid #fff',
            boxShadow: '0 0 0 1px #d9d9d9',
          }}
        />
      )}
      items={[
        {
          title: '已完成',
          description: '这里是该步骤的描述信息',
        },
        {
          title: '进行中',
          description: '这里是该步骤的描述信息',
        },
        {
          title: '待运行',
          description: '这里是该步骤的描述信息',
        },
      ]}
    />
  ),
};

// 错误状态
export const WithError: Story = {
  args: {
    current: 1,
    status: 'error',
    items: [
      {
        title: '已完成',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '出错了',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '待运行',
        description: '这里是该步骤的描述信息',
      },
    ],
  },
};

// 可点击的步骤
export const Clickable: Story = {
  render: () => {
    const [current, setCurrent] = React.useState(0);
    
    const steps = [
      {
        title: '第一步',
        description: '这是第一步的描述',
      },
      {
        title: '第二步',
        description: '这是第二步的描述',
      },
      {
        title: '第三步',
        description: '这是第三步的描述',
      },
    ];
    
    return (
      <div>
        <Steps
          current={current}
          onChange={setCurrent}
          items={steps}
        />
        
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
          <h4>当前步骤：{steps[current]?.title}</h4>
          <p>{steps[current]?.description}</p>
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            {current > 0 && (
              <button
                onClick={() => setCurrent(current - 1)}
                style={{
                  padding: '6px 16px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  background: 'white',
                  cursor: 'pointer',
                }}
              >
                上一步
              </button>
            )}
            {current < steps.length - 1 && (
              <button
                onClick={() => setCurrent(current + 1)}
                style={{
                  padding: '6px 16px',
                  border: '1px solid #1890ff',
                  borderRadius: '4px',
                  background: '#1890ff',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                下一步
              </button>
            )}
            {current === steps.length - 1 && (
              <button
                onClick={() => alert('完成！')}
                style={{
                  padding: '6px 16px',
                  border: '1px solid #52c41a',
                  borderRadius: '4px',
                  background: '#52c41a',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                完成
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
};

// 带子标题
export const WithSubTitle: Story = {
  args: {
    current: 1,
    items: [
      {
        title: '已完成',
        subTitle: '00:00:05',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '进行中',
        subTitle: '00:01:02',
        description: '这里是该步骤的描述信息',
      },
      {
        title: '待运行',
        subTitle: '未开始',
        description: '这里是该步骤的描述信息',
      },
    ],
  },
};

// 复杂示例
export const ComplexExample: Story = {
  render: () => {
    const [current, setCurrent] = React.useState(1);
    const [status, setStatus] = React.useState<'wait' | 'process' | 'finish' | 'error'>('process');
    
    const steps = [
      {
        title: '填写信息',
        description: '填写基本的用户信息和联系方式',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        ),
      },
      {
        title: '验证身份',
        description: '通过手机号码或邮箱验证身份',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zM6 7v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2z" />
          </svg>
        ),
      },
      {
        title: '选择套餐',
        description: '选择适合的服务套餐和付费方式',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zM9 1a1 1 0 0 0-2 0v3h2V1z" />
          </svg>
        ),
      },
      {
        title: '完成注册',
        description: '注册成功，开始使用我们的服务',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        ),
      },
    ];
    
    return (
      <div>
        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setCurrent(0); setStatus('process'); }}
            style={{ padding: '4px 12px', border: '1px solid #d9d9d9', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
          >
            重置
          </button>
          <button
            onClick={() => { setCurrent(1); setStatus('error'); }}
            style={{ padding: '4px 12px', border: '1px solid #ff4d4f', borderRadius: '4px', background: '#ff4d4f', color: 'white', cursor: 'pointer' }}
          >
            模拟错误
          </button>
          <button
            onClick={() => { setCurrent(3); setStatus('finish'); }}
            style={{ padding: '4px 12px', border: '1px solid #52c41a', borderRadius: '4px', background: '#52c41a', color: 'white', cursor: 'pointer' }}
          >
            完成所有步骤
          </button>
        </div>
        
        <Steps
          current={current}
          status={status}
          onChange={(step) => {
            setCurrent(step);
            setStatus('process');
          }}
          items={steps}
        />
        
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
          <h4>当前步骤：{steps[current]?.title}</h4>
          <p>{steps[current]?.description}</p>
          <p><strong>状态：</strong>{status}</p>
        </div>
      </div>
    );
  },
};