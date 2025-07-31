import { Meta, StoryObj } from "@storybook/react";
import { Float } from "./Float";
import React from "react";

const meta: Meta<typeof Float> = {
  title: "Components/Float",
  component: Float,
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "range", min: 1, max: 10, step: 0.5 },
      description: "动画持续时间（秒）",
    },
    delay: {
      control: { type: "range", min: 0, max: 5, step: 0.5 },
      description: "动画重复之间的延迟时间（秒）",
    },
    className: {
      control: "text",
      description: "自定义CSS类名",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "Float 组件使用 GSAP 动画库实现元素从左到右的旋转滚动效果。该组件会使子元素水平移动的同时进行360度旋转。"
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Float>;

export const Default: Story = {
  args: {
    duration: 3,
    delay: 0,
    children: (
      <div style={{ 
        padding: '20px 20px', 
        width: '20px',
        height: '20px',
        background: '#4a90e2', 
        color: 'white',
        borderRadius: '4px'
      }}>
        
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "默认的浮动旋转滚动效果，动画持续3秒，无延迟。"
      }
    }
  }
};

export const FastRotation: Story = {
  args: {
    duration: 1,
    delay: 0,
    children: (
      <div style={{ 
        padding: '10px 20px', 
        background: '#e74c3c', 
        color: 'white',
        borderRadius: '4px'
      }}>
        快速旋转
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "快速旋转效果，动画持续1秒，使元素更快地完成从左到右的旋转滚动。"
      }
    }
  }
};

export const WithDelay: Story = {
  args: {
    duration: 2,
    delay: 1,
    children: (
      <div style={{ 
        padding: '10px 20px', 
        background: '#27ae60', 
        color: 'white',
        borderRadius: '4px'
      }}>
        带延迟的动画
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "带延迟的动画效果，每次动画重复之间有1秒的暂停时间。"
      }
    }
  }
};