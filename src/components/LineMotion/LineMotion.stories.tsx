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
          "一个可复用的 SVG 路径绘画动画组件。它接收一个 SVG 路径的 `d` 属性，并播放一条线沿着该路径绘画过去的动画。现在，你还可以通过 `width` 和 `height` 控制其显示尺寸。",
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
    // --- 新增结束 ---
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