import type { Meta, StoryObj } from "@storybook/react";
import { ScrollCard } from "./ScrollCard";
import React from "react";

const meta: Meta<typeof ScrollCard> = {
  title: "Components/ScrollCard",
  component: ScrollCard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "一个纯 CSS 动画驱动的无限横向滚动卡片组件，用于创建流畅的展示柜效果。鼠标悬停在容器上会暂停动画。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
      description: "卡片数据项的数组",
    },
    speed: {
      control: "number",
      description: "动画完整循环一次的持续时间（秒）。数值越大，滚动越慢。",
    },
    cardWidth: {
      control: "number",
      description: "每个卡片的宽度（像素）",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollCard>;

const sampleCards = [
    {
      id: 1,
      imageUrl: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
      title: '雪山之巅',
      description: '雄伟的雪山，覆盖着皑皑白雪，展现大自然的壮丽。',
    },
    {
      id: 2,
      imageUrl: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg',
      title: '林间小径',
      description: '阳光穿过树叶，洒在宁静的林间小路上。',
    },
    {
      id: 3,
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      title: '湖光山色',
      description: '平静的湖面倒映着五彩斑斓的山峦，如诗如画。',
    },
    {
      id: 4,
      imageUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      title: '绚丽极光',
      description: '夜空中舞动的绿色极光，是自然界最神奇的表演。',
    },
    {
      id: 5,
      imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
      title: '山脉与河流',
      description: '清澈的河流蜿蜒流过雄伟的山脉之间。',
    },
    {
      id: 6,
      imageUrl: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg',
      title: '森林光影',
      description: '光线穿透高大的树木，在森林地面上形成斑驳的光影。',
    },
];


export const Default: Story = {
  args: {
    items: sampleCards,
    speed: 40,
    cardWidth: 320,
  },
  render: (args) => (
    <div style={{ padding: '40px 0' }}>
      <ScrollCard {...args} />
    </div>
  ),
};


export const Slower: Story = {
  args: {
    items: sampleCards,
    speed: 80, // 更大的值 = 更慢的速度
    cardWidth: 300,
  },
  render: (args) => (
    <div style={{ padding: '40px 0' }}>
      <ScrollCard {...args} />
    </div>
  ),
};


export const SmallerCards: Story = {
    args: {
      items: sampleCards,
      speed: 35,
      cardWidth: 240, // 更小的卡片宽度
    },
    render: (args) => (
      <div style={{ padding: '40px 0' }}>
        <ScrollCard {...args} />
      </div>
    ),
  };