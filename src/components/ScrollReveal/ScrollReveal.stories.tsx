import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ScrollReveal } from "./ScrollReveal";

const meta: Meta<typeof ScrollReveal> = {
  title: "Components/ScrollReveal",
  component: ScrollReveal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "一个优雅的文字动画组件。当其进入屏幕可视区域时，内部的子元素会逐行带动画地浮现出来。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "需要应用动画效果的内容节点",
    },
    as: {
      control: "text",
      description:
        "设置根元素的 HTML 标签或组件类型，例如 'div', 'p', 'section'",
    },
    threshold: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
      description: "触发动画的阈值（0-1），0.1 表示元素进入视口 10% 时触发",
    },
    staggerDelay: {
      control: { type: "number", min: 0, step: 50 },
      description: "每一行（子元素）动画之间的延迟时间（毫秒）",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollReveal>;

const ScrollPlaceholder = ({
  height = "100vh",
  text = "向下滚动以查看动画效果",
}) => (
  <div
    style={{
      height,
      display: "grid",
      placeContent: "center",
      background: "#fafafa",
      textAlign: "center",
    }}
  >
    <p style={{ color: "#888", fontFamily: "sans-serif" }}>{text}</p>
  </div>
);

export const Default: Story = {
  args: {
    threshold: 0.1,
    staggerDelay: 150,
    as: "div",
  },
  render: (args) => (
    <div>
      <ScrollPlaceholder />
      <div style={{ padding: "8rem 2rem", maxWidth: "700px", margin: "auto" }}>
        <ScrollReveal {...args}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            一个优雅的标题
          </h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            这是第一段文字。当它进入屏幕时，会优雅地浮现出来。
            这种效果可以极大地吸引用户的注意力，并提升页面的现代感。
          </p>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            第二段文字会紧随其后，通过 `staggerDelay` 属性控制的延迟，
            创造出一种逐行展开的、富有节奏感的视觉体验。
          </p>
        </ScrollReveal>
      </div>
      <ScrollPlaceholder height="50vh" text="页面底部" />
    </div>
  ),
};

export const AsSection: Story = {
  args: {
    ...Default.args,
    as: "section",
  },
  render: (args) => (
    <div>
      <ScrollPlaceholder />
      <div style={{ padding: "8rem 2rem", maxWidth: "700px", margin: "auto" }}>
        <ScrollReveal {...args}>
          <h3 style={{ fontSize: "2.5rem" }}>语义化的 Section</h3>
          <p style={{ fontSize: "1.1rem" }}>
            这段文字现在被包裹在一个 &lt;section&gt; 标签中。
          </p>
        </ScrollReveal>
      </div>
      <ScrollPlaceholder height="50vh" text="页面底部" />
    </div>
  ),
};

export const CustomAnimationTiming: Story = {
  args: {
    ...Default.args,
    threshold: 0.5,
    staggerDelay: 80,
  },
  render: (args) => (
    <div>
      <ScrollPlaceholder />
      <div style={{ padding: "8rem 2rem", maxWidth: "700px", margin: "auto" }}>
        <ScrollReveal {...args}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            不同的动画节奏
          </h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            这个动画会等到您滚动到页面中部时才触发。
          </p>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            并且每一行的出现间隔变得更短，感觉更紧凑。
          </p>
        </ScrollReveal>
      </div>
      <ScrollPlaceholder height="50vh" text="页面底部" />
    </div>
  ),
};

export const LongStaggerDelay: Story = {
  args: {
    ...Default.args,
    staggerDelay: 500,
  },
  render: (args) => (
    <div>
      <ScrollPlaceholder />
      <div style={{ padding: "8rem 2rem", maxWidth: "700px", margin: "auto" }}>
        <ScrollReveal {...args}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>长延迟效果</h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            第一段文字会首先出现。
          </p>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            第二段文字会在 500ms 后出现。
          </p>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
            第三段文字会在 1000ms 后出现，形成明显的交错效果。
          </p>
        </ScrollReveal>
      </div>
      <ScrollPlaceholder height="50vh" text="页面底部" />
    </div>
  ),
};

export const Direction: Story = {
  args: {
    ...Default.args,
    staggerDelay: 150,
  },
  render: (args) => (
  <div>
      <ScrollPlaceholder />
      <div style={{ padding: "8rem 2rem", maxWidth: "700px", margin: "auto" }}>
        <ScrollReveal {...args}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>不同位置滑入</h2>
        </ScrollReveal>
      </div>
      <ScrollPlaceholder height="50vh" text="页面底部" />
    </div>
  ),
};

export const WithMixedContent: Story = {
  args: {
    ...Default.args,
    staggerDelay: 200,
  },
  render: (args) => (
    <div>
      <ScrollPlaceholder />
      <div style={{ padding: "8rem 2rem", maxWidth: "800px", margin: "auto" }}>
        <ScrollReveal {...args}>
          <h2
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            混合内容展示
          </h2>
          <div
            style={{
              background: "#f5f5f5",
              padding: "2rem",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: "0 0 1rem 0" }}>卡片标题</h4>
            <p style={{ margin: 0 }}>这是一个卡片内容，也会参与交错动画。</p>
          </div>
          <ul style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            <li>列表项也会逐个浮现</li>
            <li>每个元素都有独立的动画时机</li>
            <li>创造出丰富的视觉层次</li>
          </ul>
        </ScrollReveal>
      </div>
      <ScrollPlaceholder height="50vh" text="页面底部" />
    </div>
  ),
};
