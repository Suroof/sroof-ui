import type { Meta, StoryObj } from '@storybook/react';
import { Flash } from './Flash';
import './Flash.module.scss';

const meta: Meta<typeof Flash> = {
  title: 'Components/Flash',
  component: Flash,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flash组件实现基于滚动揭示的扩展效果，支持元素按顺序浮现和消失，可配置最大同时显示数量，并且支持循环播放。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '要显示的子元素数组',
      control: { type: 'object' }
    },
    maxVisible: {
      description: '同时显示的最大元素数量',
      control: { type: 'number', min: 1, max: 5 },
      defaultValue: 2
    },
    interval: {
      description: '元素切换间隔时间（毫秒）',
      control: { type: 'number', min: 500, max: 5000, step: 100 },
      defaultValue: 2000
    },
    loop: {
      description: '是否循环播放',
      control: { type: 'boolean' },
      defaultValue: true
    },
    className: {
      description: '自定义CSS类名',
      control: { type: 'text' }
    },
    onElementChange: {
      description: '元素变化时的回调函数',
      action: 'elementChanged'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基本用法
export const Default: Story = {
  args: {
    children: [
      <div key="1" style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px', margin: '10px' }}>
        第一个元素
      </div>,
      <div key="2" style={{ padding: '20px', background: '#e0e0e0', borderRadius: '8px', margin: '10px' }}>
        第二个元素
      </div>,
      <div key="3" style={{ padding: '20px', background: '#d0d0d0', borderRadius: '8px', margin: '10px' }}>
        第三个元素
      </div>
    ],
    maxVisible: 2,
    interval: 2000,
    loop: true
  }
};

// 单个元素显示
export const SingleElement: Story = {
  args: {
    children: [
      <div key="1" style={{ padding: '30px', background: '#ff6b6b', color: 'white', borderRadius: '12px', textAlign: 'center' }}>
        🎉 欢迎使用Flash组件
      </div>,
      <div key="2" style={{ padding: '30px', background: '#4ecdc4', color: 'white', borderRadius: '12px', textAlign: 'center' }}>
        ✨ 支持多种动画效果
      </div>,
      <div key="3" style={{ padding: '30px', background: '#45b7d1', color: 'white', borderRadius: '12px', textAlign: 'center' }}>
        🚀 性能优化的组件
      </div>
    ],
    maxVisible: 1,
    interval: 1500,
    loop: true
  }
};

// 快速切换
export const FastTransition: Story = {
  args: {
    children: [
      <div key="1" style={{ padding: '15px', background: '#ffd93d', borderRadius: '6px', fontSize: '14px' }}>
        快速切换 - 项目 1
      </div>,
      <div key="2" style={{ padding: '15px', background: '#6bcf7f', borderRadius: '6px', fontSize: '14px' }}>
        快速切换 - 项目 2
      </div>,
      <div key="3" style={{ padding: '15px', background: '#4d96ff', color: 'white', borderRadius: '6px', fontSize: '14px' }}>
        快速切换 - 项目 3
      </div>,
      <div key="4" style={{ padding: '15px', background: '#9c88ff', color: 'white', borderRadius: '6px', fontSize: '14px' }}>
        快速切换 - 项目 4
      </div>
    ],
    maxVisible: 2,
    interval: 800,
    loop: true
  }
};

// 非循环模式
export const NonLoop: Story = {
  args: {
    children: [
      <div key="1" style={{ padding: '25px', background: 'linear-gradient(45deg, #ff9a9e, #fecfef)', borderRadius: '10px', textAlign: 'center' }}>
        步骤 1: 开始
      </div>,
      <div key="2" style={{ padding: '25px', background: 'linear-gradient(45deg, #a8edea, #fed6e3)', borderRadius: '10px', textAlign: 'center' }}>
        步骤 2: 进行中
      </div>,
      <div key="3" style={{ padding: '25px', background: 'linear-gradient(45deg, #ffecd2, #fcb69f)', borderRadius: '10px', textAlign: 'center' }}>
        步骤 3: 完成
      </div>
    ],
    maxVisible: 1,
    interval: 2500,
    loop: false
  }
};

// 复杂内容
export const ComplexContent: Story = {
  args: {
    children: [
      <div key="card1" style={{ 
        padding: '20px', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>产品特性</h3>
        <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>高性能的React组件库，提供丰富的UI组件和动画效果。</p>
      </div>,
      <div key="card2" style={{ 
        padding: '20px', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>技术栈</h3>
        <ul style={{ margin: '0', padding: '0 0 0 20px', color: '#666' }}>
          <li>React 18+</li>
          <li>TypeScript</li>
          <li>SCSS Modules</li>
        </ul>
      </div>,
      <div key="card3" style={{ 
        padding: '20px', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>使用场景</h3>
        <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>适用于轮播展示、动态内容切换、产品介绍等场景。</p>
      </div>
    ],
    maxVisible: 2,
    interval: 3000,
    loop: true
  }
};

// 多元素同时显示
export const MultipleElements: Story = {
  args: {
    children: [
      <div key="1" style={{ padding: '15px', background: '#ff6b6b', color: 'white', borderRadius: '8px', margin: '5px' }}>
        元素 A
      </div>,
      <div key="2" style={{ padding: '15px', background: '#4ecdc4', color: 'white', borderRadius: '8px', margin: '5px' }}>
        元素 B
      </div>,
      <div key="3" style={{ padding: '15px', background: '#45b7d1', color: 'white', borderRadius: '8px', margin: '5px' }}>
        元素 C
      </div>,
      <div key="4" style={{ padding: '15px', background: '#96ceb4', color: 'white', borderRadius: '8px', margin: '5px' }}>
        元素 D
      </div>,
      <div key="5" style={{ padding: '15px', background: '#feca57', color: 'white', borderRadius: '8px', margin: '5px' }}>
        元素 E
      </div>
    ],
    maxVisible: 3,
    interval: 1800,
    loop: true
  }
};

// 自定义样式
export const CustomStyle: Story = {
  args: {
    children: [
      <div key="1" style={{ 
        padding: '20px 30px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        borderRadius: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        🌟 特色功能
      </div>,
      <div key="2" style={{ 
        padding: '20px 30px', 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
        color: 'white', 
        borderRadius: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        🎨 美观设计
      </div>,
      <div key="3" style={{ 
        padding: '20px 30px', 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
        color: 'white', 
        borderRadius: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        ⚡ 高性能
      </div>
    ],
    maxVisible: 1,
    interval: 2200,
    loop: true,
    className: 'custom-flash-container'
  }
};