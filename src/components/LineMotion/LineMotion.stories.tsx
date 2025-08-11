import React from "react";
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
        component:
          "一个强大的 SVG 路径绘画动画组件。它不仅可以播放基于时间的动画，现在还支持与页面滚动同步的绘画效果。通过 `scroll` 属性，您可以轻松地将动画绑定到滚动条，实现丰富的交互式视觉体验。",
      },
    },
  },
  // 使用 argTypes 来为每个 prop 提供详细的描述和控制
  argTypes: {
    pathData: {
      description: "SVG 路径的 `d` 属性字符串，定义了线条的形状。",
      control: { type: "text" },
    },
    scroll: {
      description: "是否启用滚动触发动画。",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    duration: {
      description: "动画的持续时间（秒），仅在 `scroll={false}` 时生效。",
      control: { type: "number", min: 0.1, max: 10, step: 0.1 },
    },
    ease: {
      description: "GSAP 缓动函数，仅在 `scroll={false}` 时生效。",
      control: { type: "select" },
      options: [
        "none",
        "power1.inOut",
        "power2.inOut",
        "power3.inOut",
        "elastic.out(1, 0.3)",
        "back.out(1.7)",
      ],
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
    // --- 新增部分 ---
    // 为 width 和 height 添加控制
    width: {
      description: "组件的宽度。可以是数字（像素）或字符串（如 '100%'）。",
      control: { type: "text" },
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "100%" },
      },
    },
    height: {
      description: "组件的高度。可以是数字（像素）或字符串（如 '200px'）。",
      control: { type: "text" },
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "100%" },
      },
    },
    scrub:{
      description: "是否使用 ScrollTrigger 的 scrub 模式。",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    start:{
      description: "ScrollTrigger 的起始位置。",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "top bottom" },
      },
    },
    end:{
      description: "ScrollTrigger 的结束位置。",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bottom top" },
      },
    }
  },
  // 设置默认的 args，这样每个故事都会继承这些默认值
  args: {
    pathData: "M10,90 Q100,15 200,70 T390,80", // 一个默认的曲线路径
    duration: 2,
    ease: "power1.inOut",
    stroke: "#3b82f6", // 使用一个更醒目的默认颜色
    strokeWidth: 3,
    // 为 width 和 height 设置一个明确的默认尺寸，方便在 Storybook 中查看
    width: 400,
    height: 200,
    scroll: false, // 默认不开启滚动模式
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "默认动画",
};

export const StraightLine: Story = {
  name: "直线动画",
  args: {
    pathData: "M10,50 L390,50", 
    duration: 1.5,
    stroke: "#ef4444",
    height: 100,
  },
};

// 3. 复杂路径动画
export const ComplexShape: Story = {
  name: "复杂形状动画",
  args: {
    pathData: "M150,0 L75,200 L225,200 Z", // 一个三角形
    duration: 3,
    ease: "power2.inOut",
    stroke: "#10b981",
    strokeWidth: 4,
    // 覆盖尺寸以更好地适应形状
    width: 250,
    height: 220,
  },
};

// 4. 弹性动画
export const ElasticAnimation: Story = {
  name: "弹性动画",
  args: {
    pathData: "M10,100 C100,20 200,180 390,100", // 一个S形曲线
    duration: 2.5,
    ease: "elastic.out(1, 0.3)",
    stroke: "#8b5cf6",
    strokeWidth: 5,
  },
};

// 5. 新增故事：自定义尺寸
// 这个故事专门用来展示尺寸控制的效果
export const CustomSize: Story = {
  name: "自定义尺寸",
  args: {
    pathData: "M20,20 h100 v100 h-100 Z", // 一个正方形
    stroke: "#f97316",
    // 明确设置一个非默认的尺寸
    width: 150,
    height: 300, // 高度大于宽度，展示非均匀缩放
  },
};


// 6. 交互式控制
export const Interactive: Story = {
  name: "交互式控制",
  // 这个故事会自动继承 meta 中定义的所有 argTypes 和 args，
  // 现在它将包含 width 和 height 的控制选项。
};

// 7. 新增故事：滚动控制动画
export const ScrollControlled: Story = {
  name: "滚动控制动画",
  parameters: {
    // 使用全屏布局以更好地展示滚动效果
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "这个示例展示了如何将线条动画与页面滚动关联。向下滚动页面，线条会随之绘制；向上滚动则会反向收回。你需要一个足够长的页面来观察效果。",
      },
    },
  },
  args: {
    // 开启滚动模式
    scroll: true,
    // 使用一条更长的、垂直的路径来演示
    pathData: "M 50,0 V 800",
    stroke: "#22c55e",
    strokeWidth: 6,
    // 确保 SVG 足够高以容纳路径
    width: 100,
    height: 820,
  },
  // 使用 render 函数来添加额外的上下文，创建滚动环境
  render: (args) => (
    <div style={{ height: "200vh", padding: "5rem 0" }}>
      <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        向下滚动页面
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
          marginBottom: "5rem",
        }}
      >
        <LineMotion {...args} />
      </div>
      <h2 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        滚动结束
      </h2>
    </div>
  ),
};
