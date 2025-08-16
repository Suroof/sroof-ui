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
    sensitivity: {
      control: { type: 'range', min: 0.0001, max: 0.002, step: 0.0001 },
      description: '滚轮敏感度，值越小动画越慢'
    },
    initialRotation: {
      control: 'object',
      description: '初始旋转角度 [x, y, z] (弧度)'
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
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0003,
    initialRotation: [0, 0, 0]
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

export const YAxisRotation: Story = {
  args: {
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0003,
    initialRotation: [0, Math.PI / 4, 0] // Y轴旋转45度
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        Y轴旋转45度 - initialRotation: [0, π/4, 0]
      </p>
    </div>
  )
};

export const MultiAxisRotation: Story = {
  args: {
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0003,
    initialRotation: [Math.PI /8, Math.PI / 3, Math.PI / 12]
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        多轴旋转 - X:30°, Y:45°, Z:22.5°
      </p>
    </div>
  )
};

export const UpsideDown: Story = {
  args: {
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0003,
    initialRotation: [0, Math.PI, 0] // Y轴旋转180度（倒置）
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        倒置视角 - Y轴旋转180度
      </p>
    </div>
  )
};

export const SlightTilt: Story = {
  args: {
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0003,
    initialRotation: [Math.PI / 12, Math.PI / 8, 0] // 轻微倾斜
  },
  render: (args) => (
    <div>
      <ProgressThreeD {...args} />
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        轻微倾斜 - X:15°, Y:22.5°
      </p>
    </div>
  )
};

export const SlowAnimation: Story = {
  args: {
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0001, // 非常慢的动画
    initialRotation: [0, Math.PI / 6, 0]
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

export const WithCallback: Story = {
  args: {
    modelPath: '/assets/gltf/rubiks_cube.glb',
    sensitivity: 0.0003,
    initialRotation: [0, 0, 0],
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