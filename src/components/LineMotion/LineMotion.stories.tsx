import type { Meta, StoryObj } from "@storybook/react";
import { LineMotion } from "./LineMotion";

// Meta 信息定义了整个组件集的文档和布局
const meta: Meta<typeof LineMotion> = {
  title: "Components/LineMotion",
  component: LineMotion,
  // 使用 centered 布局，让组件在画布中央显示
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "一个可复用的 SVG 路径绘画动画组件。它接收一个 SVG 路径的 `d` 属性，并播放一条线沿着该路径绘画过去的动画。",
      },
    },
  },
  // 使用 argTypes 来为每个 prop 提供详细的描述和控制
  argTypes: {
    pathData: {
      description: "SVG 路径的 `d` 属性字符串，定义了线条的形状。",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    duration: {
      description: "动画的持续时间，单位是秒。",
      control: { type: "number", min: 0.1, max: 10, step: 0.1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
    ease: {
      description: "GSAP 动画的缓动函数，控制动画的速度变化。",
      control: { type: "select" },
      options: ["none", "power1.inOut", "power2.inOut", "power3.inOut", "elastic.out(1, 0.3)", "back.out(1.7)"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "power1.inOut" },
      },
    },
    stroke: {
      description: "线条的颜色。",
      control: { type: "color" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "black" },
      },
    },
    strokeWidth: {
      description: "线条的宽度。",
      control: { type: "number", min: 1, max: 20, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
  },
  // 设置默认的 args，这样每个故事都会继承这些默认值
  args: {
    pathData: "M10,90 Q100,15 200,70 T390,80", // 一个默认的曲线路径
    duration: 2,
    ease: "power1.inOut",
    stroke: "#3b82f6", // 使用一个更醒目的默认颜色
    strokeWidth: 3,
  },
  // 启用 autodocs 标签，自动生成文档
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 故事定义 ---

// 1. 默认故事 (Default)
// 这个故事会使用上面 `args` 中定义的默认值，展示组件最基本的样子。
export const Default: Story = {
  name: "默认动画",
};

// 2. 直线动画
// 展示组件如何处理简单的直线路径。
export const StraightLine: Story = {
  name: "直线动画",
  args: {
    pathData: "M10,50 L390,50", // 一条从左到右的直线
    duration: 1.5,
    stroke: "#ef4444", // 红色
  },
};

// 3. 复杂路径动画
// 展示组件处理更复杂、更接近真实图形路径的能力。
export const ComplexShape: Story = {
  name: "复杂形状动画",
  args: {
    pathData: "M150,0 L75,200 L225,200 Z", // 一个三角形
    duration: 3,
    ease: "power2.inOut",
    stroke: "#10b981", // 绿色
    strokeWidth: 4,
  },
};

// 4. 弹性动画
// 展示通过改变 `ease` 参数实现的特殊动画效果。
export const ElasticAnimation: Story = {
  name: "弹性动画",
  args: {
    pathData: "M10,100 C100,20 200,180 390,100", // 一个S形曲线
    duration: 2.5,
    ease: "elastic.out(1, 0.3)", // 弹性缓动
    stroke: "#8b5cf6", // 紫色
    strokeWidth: 5,
  },
};

// 5. 交互式控制
// 这个故事允许用户在 Storybook 的 "Controls" 面板中实时修改所有参数，
// 是探索组件所有可能性的最佳方式。
export const Interactive: Story = {
  name: "交互式控制",
  // 这个故事会自动继承 `meta` 中定义的 `argTypes` 和 `args`，
  // 所以我们不需要在这里写任何东西，Storybook 会自动生成控制面板。
};
