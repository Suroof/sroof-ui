import type { Meta, StoryObj } from '@storybook/react';
import {Carousel} from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '轮播项目数组，每个项目包含 id, imageUrl, 和 altText',
    },
    autoplayInterval: {
      control: 'number',
      description: '自动播放的时间间隔（毫秒）。设置为 0 可以禁用自动播放。',
    },
  },
};

export default meta;

// 定义 Story 的类型
type Story = StoryObj<typeof meta>;

const mockItems = [
  { id: 1, imageUrl: 'https://images.pexels.com/photos/32489805/pexels-photo-32489805.jpeg', altText: 'Slide 1' },
  { id: 2, imageUrl: 'https://images.pexels.com/photos/32715939/pexels-photo-32715939.jpeg', altText: 'Slide 2' },
  { id: 3, imageUrl: 'https://images.pexels.com/photos/33147349/pexels-photo-33147349.jpeg', altText: 'Slide 3' },
  { id: 4, imageUrl: 'https://images.pexels.com/photos/27916610/pexels-photo-27916610.jpeg', altText: 'Slide 4' },
];

export const Primary: Story = {
  args: {
    items: mockItems,
  },
};

export const FastAutoplay: Story = {
  args: {
    items: mockItems,
    autoplayInterval: 1500, // 设置为 1.5 秒
  },
};

export const AutoplayDisabled: Story = {
  args: {
    items: mockItems,
    autoplayInterval: 0, // 设置为 0 来禁用
  },
};

// 故事四：只有一个项目的边缘情况
export const SingleItem: Story = {
  args: {
    items: [
      { id: 1, imageUrl: 'https://images.pexels.com/photos/27916610/pexels-photo-27916610.jpeg', altText: 'Single Slide' },
    ],
  },
};