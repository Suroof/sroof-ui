import type { Meta, StoryObj } from '@storybook/react';
import {Carousel} from './Carousel';
import { useState, useEffect } from 'react';
import React from 'react'

// 定义元数据
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: '轮播图的幻灯片内容',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '800px', 
        height: '400px', 
        margin: '0 auto',
        position: 'relative'
      }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// 创建示例幻灯片
const createSampleSlides = (count: number = 3) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFD166', '#EE6352'];
  const slides = [];
  
  for (let i = 0; i < count; i++) {
    slides.push(
      <div 
        key={i} 
        style={{ 
          backgroundColor: colors[i % colors.length],
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '2rem'
        }}
      >
        <h2>Slide {i + 1}</h2>
        <p>这是一个轮播图示例</p>
      </div>
    );
  }
  
  return slides;
};

// 基础轮播图示例
export const Default: Story = {
  args: {
    children: createSampleSlides(3)
  },
  parameters: {
    docs: {
      description: {
        story: '基本的轮播图组件，展示了3张幻灯片的无限循环和拖拽滑动功能。'
      }
    }
  }
};

// 单张幻灯片示例
export const SingleSlide: Story = {
  args: {
    children: createSampleSlides(1)
  },
  parameters: {
    docs: {
      description: {
        story: '当只有一张幻灯片时，轮播图会禁用循环和拖拽功能。'
      }
    }
  }
};

// 多张幻灯片示例
export const MultipleSlides: Story = {
  args: {
    children: createSampleSlides(6)
  },
  parameters: {
    docs: {
      description: {
        story: '展示6张幻灯片的轮播图，演示了无限循环功能。'
      }
    }
  }
};

// 交互式示例
export const Interactive: Story = {
  render: () => {
    const [slidesCount, setSlidesCount] = useState(3);
    const [slides, setSlides] = useState(createSampleSlides(slidesCount));
    
    useEffect(() => {
      setSlides(createSampleSlides(slidesCount));
    }, [slidesCount]);
    
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          gap: '10px',
          justifyContent: 'center'
        }}>
          <button 
            onClick={() => setSlidesCount(Math.max(1, slidesCount - 1))}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            移除幻灯片
          </button>
          <button 
            onClick={() => setSlidesCount(Math.min(6, slidesCount + 1))}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            添加幻灯片
          </button>
        </div>
        <Carousel>
          {slides}
        </Carousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '交互式示例，可以动态添加或移除幻灯片，展示组件的响应式行为。'
      }
    }
  }
};

// 演示拖拽功能
export const Dragging: Story = {
  args: {
    children: createSampleSlides(4)
  },
  parameters: {
    docs: {
      description: {
        story: '此示例专门用于演示拖拽滑动功能。尝试在轮播图上按住鼠标并拖动，体验流畅的滑动效果。'
      }
    }
  }
};