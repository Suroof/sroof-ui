import React, { useState } from "react";
import Steps from "./Steps";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Steps> = {
  title: "Components/Steps",
  component: Steps,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "引导用户按照流程完成任务的导航条。支持水平和垂直布局，多种状态显示，可点击导航等功能。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    current: {
      control: { type: "number", min: 0, max: 10 },
      description: "当前步骤，从 0 开始计数",
    },
    initial: {
      control: { type: "number", min: 0, max: 5 },
      description: "起始序号，从 0 开始计数",
    },
    direction: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "指定步骤条方向",
    },
    labelPlacement: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "指定标签放置位置",
    },
    size: {
      control: { type: "radio" },
      options: ["default", "small"],
      description: "指定大小",
    },
    status: {
      control: { type: "radio" },
      options: ["wait", "process", "finish", "error"],
      description: "指定当前步骤的状态",
    },
    percent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "当前 process 步骤显示的进度条进度",
    },
    progressDot: {
      control: { type: "boolean" },
      description: "点状步骤条",
    },
    responsive: {
      control: { type: "boolean" },
      description: "当屏幕宽度小于 532px 时自动变为垂直模式",
    },
    type: {
      control: { type: "radio" },
      options: ["default", "navigation"],
      description: "步骤条类型",
    },
    className: {
      control: { type: "text" },
      description: "自定义类名",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

// 基础示例
export const Default: Story = {
  args: {
    current: 1,
    items: [
      {
        title: "已完成",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 小尺寸
export const Small: Story = {
  args: {
    current: 1,
    size: "small",
    items: [
      { title: "已完成" },
      { title: "进行中" },
      { title: "待运行" },
      { title: "待运行" },
    ],
  },
};

// 带图标的步骤条
export const WithIcons: Story = {
  args: {
    current: 1,
    items: [
      {
        title: "登录",
        icon: "👤",
      },
      {
        title: "验证",
        icon: "🔐",
      },
      {
        title: "支付",
        icon: "💳",
      },
      {
        title: "完成",
        icon: "✅",
      },
    ],
  },
};

// 垂直方向的步骤条
export const Vertical: Story = {
  args: {
    current: 1,
    direction: "vertical",
    items: [
      {
        title: "已完成",
        description: "这里是该步骤的描述信息，可以很长很长",
      },
      {
        title: "进行中",
        description: "这里是该步骤的描述信息，可以很长很长",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息，可以很长很长",
      },
    ],
    style: { maxWidth: "400px" },
  },
};

// 步骤运行错误
export const Error: Story = {
  args: {
    current: 1,
    status: "error",
    items: [
      {
        title: "已完成",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 点状步骤条
export const Dot: Story = {
  args: {
    current: 1,
    progressDot: true,
    items: [
      {
        title: "已完成",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 可点击的步骤条（导航模式）
export const Navigation: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);

    const steps = [
      {
        title: "第一步",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "第二步",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "第三步",
        description: "这里是该步骤的描述信息",
      },
    ];

    return (
      <Steps
        current={current}
        type="navigation"
        items={steps}
        onChange={setCurrent}
      />
    );
  },
};

// 带进度的步骤条
export const WithProgress: Story = {
  args: {
    current: 1,
    status: "process",
    percent: 60,
    items: [
      {
        title: "已完成",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 自定义状态
export const CustomStatus: Story = {
  args: {
    current: 2,
    items: [
      {
        title: "已完成",
        status: "finish",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "出错了",
        status: "error",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        status: "process",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        status: "wait",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    current: 1,
    type: "navigation",
    items: [
      {
        title: "已完成",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "禁用",
        description: "这里是该步骤的描述信息",
        disabled: true,
      },
      {
        title: "待运行",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 带子标题
export const WithSubTitle: Story = {
  args: {
    current: 1,
    items: [
      {
        title: "已完成",
        subTitle: "2023-10-01",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "进行中",
        subTitle: "进行中...",
        description: "这里是该步骤的描述信息",
      },
      {
        title: "待运行",
        subTitle: "预计2023-10-03",
        description: "这里是该步骤的描述信息",
      },
    ],
  },
};

// 复杂示例 - 表单步骤
export const FormSteps: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);

    const steps = [
      {
        title: "填写基本信息",
        description: "填写用户基本信息",
        icon: "📝",
      },
      {
        title: "上传文件",
        description: "上传相关证明材料",
        icon: "📁",
      },
      {
        title: "确认信息",
        description: "确认所有信息无误",
        icon: "✅",
      },
      {
        title: "提交审核",
        description: "提交等待审核",
        icon: "🔍",
      },
    ];

    const next = () => {
      setCurrent(Math.min(current + 1, steps.length - 1));
    };

    const prev = () => {
      setCurrent(Math.max(current - 1, 0));
    };

    return (
      <div style={{ width: "600px" }}>
        <Steps current={current} items={steps} />
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button
            onClick={prev}
            disabled={current === 0}
            style={{
              marginRight: "8px",
              padding: "8px 16px",
              border: "1px solid #d9d9d9",
              background: current === 0 ? "#f5f5f5" : "#fff",
              borderRadius: "4px",
              cursor: current === 0 ? "not-allowed" : "pointer",
            }}
          >
            上一步
          </button>
          <button
            onClick={next}
            disabled={current === steps.length - 1}
            style={{
              padding: "8px 16px",
              border: "1px solid #1890ff",
              background: current === steps.length - 1 ? "#f5f5f5" : "#1890ff",
              color: current === steps.length - 1 ? "#999" : "#fff",
              borderRadius: "4px",
              cursor: current === steps.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            {current === steps.length - 1 ? "完成" : "下一步"}
          </button>
        </div>
      </div>
    );
  },
};
