import type { Meta, StoryObj } from '@storybook/react';
import { ProgressThreeD } from './ProgressThreeD';
import React from 'react';

const meta: Meta<typeof ProgressThreeD> = {
  title: 'Components/ProgressThreeD',
  component: ProgressThreeD,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一个支持滚轮控制的3D进度条组件，使用Three.js渲染GLB模型，GSAP控制动画。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelPath: {
      control: 'text',
      description: 'GLB模型文件路径'
    },
    height: {
      control: 'number',
      description: '组件高度（像素）'
    },
    showProgress: {
      control: 'boolean',
      description: '是否显示进度信息'
    },
    showInstructions: {
      control: 'boolean',
      description: '是否显示操作说明'
    },
    sensitivity: {
      control: { type: 'range', min: 0.0001, max: 0.002, step: 0.0001 },
      description: '滚轮敏感度，值越小动画越慢'
    },
    onProgressChange: {
      action: 'progress-changed',
      description: '进度变化回调函数'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: 400,
    modelPath: '/assets/gltf/rubiks_cube.glb',
    showProgress: true,
    showInstructions: true,
    sensitivity: 0.0003
  },
  render: (args) => {
    const [progress, setProgress] = React.useState(0);
    
    return (
      <div>
        <ProgressThreeD 
          {...args} 
          onProgressChange={(newProgress) => {
            setProgress(newProgress);
            args.onProgressChange?.(newProgress);
          }}
        />
        <p style={{ marginTop: '10px', fontSize: '14px' }}>
          当前进度: {Math.round(progress * 100)}%
        </p>
      </div>
    );
  }
};

export const CustomSize: Story = {
  args: {
    height: 500,
    modelPath: '/assets/gltf/rubiks_cube.glb',
    showProgress: true,
    showInstructions: false
  },
  render: (args) => (
    <ProgressThreeD {...args} />
  )
};

export const SmallSize: Story = {
  args: {
    height: 200,
    modelPath: '/assets/gltf/rubiks_cube.glb',
    showProgress: false,
    showInstructions: false
  },
  render: (args) => (
    <ProgressThreeD {...args} />
  )
};

export const SlowAnimation: Story = {
  args: {
    height: 400,
    modelPath: '/assets/gltf/rubiks_cube.glb',
    showProgress: true,
    showInstructions: true,
    sensitivity: 0.0001 // 非常慢的动画
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        超慢动画模式 - 滚轮敏感度: 0.0001
      </p>
    </div>
  )
};

export const FastAnimation: Story = {
  args: {
    height: 400,
    modelPath: '/assets/gltf/rubiks_cube.glb',
    showProgress: true,
    showInstructions: true,
    sensitivity: 0.001 // 较快的动画
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        快速动画模式 - 滚轮敏感度: 0.001
      </p>
    </div>
  )
};

export const WithCallback: Story = {
  args: {
    height: 400,
    modelPath: '/assets/gltf/rubiks_cube.glb',
    showProgress: true,
    showInstructions: true,
    sensitivity: 0.0003,
    onProgressChange: (progress: number) => {
      console.log('Progress changed:', progress);
    }
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        打开浏览器控制台查看进度变化日志
      </p>
    </div>
  )
};