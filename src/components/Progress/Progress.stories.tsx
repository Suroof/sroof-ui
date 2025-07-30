import React from "react";
import { Progress } from "./Progress";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "高级进度条组件，支持线性和圆形两种样式，具有丰富的动画效果和自定义选项。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "当前进度百分比 (0-100)",
    },
    variant: {
      control: { type: "radio" },
      options: ["linear", "circular"],
      description: "进度条的样式变体",
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "进度条的尺寸/厚度",
    },
    color: {
      control: { type: "color" },
      description: "自定义进度条颜色",
    },
    showPercentage: {
      control: { type: "boolean" },
      description: "是否显示百分比文字",
    },
    animated: {
      control: { type: "boolean" },
      description: "是否启用动画效果",
    },
    striped: {
      control: { type: "boolean" },
      description: "是否显示条纹效果",
    },
    pulse: {
      control: { type: "boolean" },
      description: "是否启用脉冲效果",
    },
    className: {
      control: { type: "text" },
      description: "自定义 CSS 类名",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

// 基础示例
export const Linear: Story = {
  args: {
    progress: 50,
    variant: "linear",
    size: "medium",
    showPercentage: true,
    animated: true,
  },
  render: (args) => (
    <div style={{ maxWidth: "600px" }}>
      <Progress {...args} />
    </div>
  ),
};

export const Circular: Story = {
  args: {
    progress: 75,
    variant: "circular",
    size: "medium",
    showPercentage: true,
    animated: true,
  },
};

// 尺寸变体
export const LinearSmall: Story = {
  args: {
    progress: 30,
    variant: "linear",
    size: "small",
    showPercentage: true,
  },
};

export const LinearLarge: Story = {
  args: {
    progress: 90,
    variant: "linear",
    size: "large",
    showPercentage: true,
  },
};

export const CircularSmall: Story = {
  args: {
    progress: 25,
    variant: "circular",
    size: "small",
    showPercentage: true,
  },
};

export const CircularLarge: Story = {
  args: {
    progress: 95,
    variant: "circular",
    size: "large",
    showPercentage: true,
  },
};

// 颜色自定义
export const CustomColor: Story = {
  args: {
    progress: 60,
    variant: "linear",
    color: "#ff5722",
    showPercentage: true,
  },
};

export const CustomColorCircular: Story = {
  args: {
    progress: 80,
    variant: "circular",
    color: "#4caf50",
    showPercentage: true,
  },
};

export const GradientColors: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "400px",
      }}
    >
      <Progress progress={45} color="#e91e63" showPercentage />
      <Progress progress={65} color="#9c27b0" showPercentage />
      <Progress progress={85} color="#3f51b5" showPercentage />
    </div>
  ),
};

// 条纹效果
export const StripedLinear: Story = {
  args: {
    progress: 70,
    variant: "linear",
    striped: true,
    showPercentage: true,
  },
};

export const StripedCircular: Story = {
  args: {
    progress: 60,
    variant: "circular",
    striped: true,
    showPercentage: true,
  },
};

export const StripedWithColor: Story = {
  args: {
    progress: 55,
    variant: "linear",
    striped: true,
    color: "#ff9800",
    showPercentage: true,
  },
};

// 脉冲效果
export const PulseLinear: Story = {
  args: {
    progress: 40,
    variant: "linear",
    pulse: true,
    showPercentage: true,
  },
};

export const PulseCircular: Story = {
  args: {
    progress: 85,
    variant: "circular",
    pulse: true,
    showPercentage: true,
  },
};

// 组合效果
export const StripedPulse: Story = {
  args: {
    progress: 75,
    variant: "linear",
    striped: true,
    pulse: true,
    color: "#f44336",
    showPercentage: true,
  },
};

// 无动画
export const NoAnimation: Story = {
  args: {
    progress: 50,
    variant: "linear",
    animated: false,
    showPercentage: true,
  },
};

// 隐藏百分比
export const WithoutPercentage: Story = {
  args: {
    progress: 40,
    variant: "linear",
    showPercentage: false,
  },
};

// 边界值
export const FullProgress: Story = {
  args: {
    progress: 100,
    variant: "linear",
    showPercentage: true,
  },
};

export const ZeroProgress: Story = {
  args: {
    progress: 0,
    variant: "circular",
    showPercentage: true,
  },
};

// 响应式展示
export const ResponsiveDemo: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h4>桌面端效果</h4>
        <Progress progress={60} variant="linear" size="large" showPercentage />
      </div>
      <div style={{ width: "300px", marginBottom: "20px" }}>
        <h4>平板端效果</h4>
        <Progress progress={60} variant="linear" size="medium" showPercentage />
      </div>
      <div style={{ width: "200px" }}>
        <h4>移动端效果</h4>
        <Progress progress={60} variant="linear" size="small" showPercentage />
      </div>
    </div>
  ),
};

// 实际使用场景
export const LoadingScenario: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
          文件上传
        </h4>
        <Progress progress={35} striped animated color="#2196f3" />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
          安装进度
        </h4>
        <Progress progress={78} pulse color="#4caf50" />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>
          下载进度
        </h4>
        <Progress
          progress={92}
          variant="circular"
          size="large"
          color="#ff9800"
        />
      </div>
    </div>
  ),
};

// 性能测试
export const PerformanceTest: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "600px",
      }}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <Progress
          key={i}
          progress={(i + 1) * 10}
          variant={i % 2 === 0 ? "linear" : "circular"}
          size={["small", "medium", "large"][i % 3] as any}
          striped={i % 3 === 0}
          pulse={i % 4 === 0}
          animated
        />
      ))}
    </div>
  ),
};

// 主题展示
export const ThemeVariations: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "400px",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>成功状态</h4>
        <Progress progress={100} color="#4caf50" />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>警告状态</h4>
        <Progress progress={65} color="#ff9800" striped />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>错误状态</h4>
        <Progress progress={25} color="#f44336" pulse />
      </div>
      <div>
        <h4 style={{ margin: "0 0 8px 0" }}>信息状态</h4>
        <Progress progress={45} color="#2196f3" />
      </div>
    </div>
  ),
};
