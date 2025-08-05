import type { Meta, StoryObj } from "@storybook/react";
import { Emerge } from "./Emerge";
import React from "react";

const meta: Meta<typeof Emerge> = {
title: "Components/Emerge",
  component: Emerge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "一个由 GSAP SplitText 驱动的高级文本动画组件，可以实现单词或字符的逐个浮现效果。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "需要进行动画的文本内容",
    },
    splitType: {
      control: { type: 'select' },
      options: ['words', 'chars', 'lines'],
      description: "动画分割的类型",
    },
    duration: {
      control: { type: 'number', min: 0, step: 0.1 },
      description: "动画的总持续时间（秒）",
    },
    stagger: {
      control: { type: 'number', min: 0, step: 0.01 },
      description: "每个单元动画之间的交错延迟（秒）",
    },
    y: {
      control: { type: 'number', step: 5 },
      description: "动画的垂直偏移量（像素）。正值从下方浮现。",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Emerge>;

/**
 * 默认情况下，文本会以“单词”为单位，从下方 20px 处逐个浮现。
 */
export const DefaultByWord: Story = {
  args: {
    text: "Elegant text animations made easy.",
    splitType: "words",
    duration: 0.8,
    stagger: 0.05,
    y: 20,
  },
  render: (args) => (
    <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'serif' }}>
      <Emerge {...args} />
    </div>
  ),
};

/**
 * 将 `splitType` 设置为 `'chars'`，动画会以“字符”为单位进行，效果更细腻。
 */
export const ByCharacter: Story = {
  args: {
    ...DefaultByWord.args,
    text: "Character by character.",
    splitType: "chars",
    stagger: 0.03, // 字符动画通常需要更短的延迟
  },
  render: (args) => (
    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
      <Emerge {...args} />
    </div>
  ),
};

/**
 * 您可以改变 `y` 的值来控制浮现的方向。负值表示从上方滑落。
 */
export const FromTop: Story = {
  args: {
    ...DefaultByWord.args,
    text: "Sliding down from the top.",
    y: -30, // 负值表示从上方
  },
  render: (args) => (
    <div style={{ fontSize: '2rem', fontWeight: 500 }}>
      <Emerge {...args} />
    </div>
  ),
};

/**
 * 如果将 `y` 设置为 0，动画将变为纯粹的“淡入”效果。
 */
export const FadeInOnly: Story = {
  args: {
    ...DefaultByWord.args,
    text: "Just a simple fade in.",
    y: 0, // 无垂直偏移
    stagger: 0.1,
  },
  render: (args) => (
    <div style={{ fontSize: '2rem' }}>
      <Emerge {...args} />
    </div>
  ),
};