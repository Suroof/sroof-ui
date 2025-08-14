import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '头像组件，用来代表用户或事物，支持图片、图标以及字符展示。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '头像的图片地址',
    },
    alt: {
      control: 'text',
      description: '图像无法显示时的替代文本',
    },
    size: {
      control: 'select',
      options: ['large', 'default', 'small', 64],
      description: '头像的尺寸',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: '头像的形状',
    },
    children: {
      control: 'text',
      description: '文字头像',
    },
    draggable: {
      control: 'boolean',
      description: '是否可拖拽',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// 基础用法
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: '用户头像',
  },
};

// 不同尺寸
export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar size="small" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      <Avatar size="default" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      <Avatar size="large" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      <Avatar size={64} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
    </div>
  ),
};

// 不同形状
export const Shape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar shape="circle" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      <Avatar shape="square" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
    </div>
  ),
};

// 文字头像
export const Text: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar>U</Avatar>
      <Avatar>USER</Avatar>
      <Avatar>张</Avatar>
      <Avatar>张三</Avatar>
      <Avatar size="large">Admin</Avatar>
    </div>
  ),
};

// 图标头像
export const Icon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar icon={
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
        </svg>
      } />
      <Avatar size="large" icon={
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
          <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
        </svg>
      } />
    </div>
  ),
};

// 加载失败回退
export const Fallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar src="invalid-url" alt="加载失败" />
      <Avatar src="invalid-url">FB</Avatar>
      <Avatar src="invalid-url" icon={
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" />
        </svg>
      } />
    </div>
  ),
};

// 可点击
export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
        onClick={() => alert('头像被点击了！')}
      />
      <Avatar 
        onClick={() => alert('文字头像被点击了！')}
      >
        点我
      </Avatar>
    </div>
  ),
};

// 头像组
export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>基础头像组</h4>
        <div style={{ display: 'flex' }}>
          <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
          <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
          <Avatar>+3</Avatar>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px' }}>不同尺寸头像组</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex' }}>
            <Avatar size="small" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <Avatar size="small" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
            <Avatar size="small">+2</Avatar>
          </div>
          
          <div style={{ display: 'flex' }}>
            <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
            <Avatar>+2</Avatar>
          </div>
          
          <div style={{ display: 'flex' }}>
            <Avatar size="large" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <Avatar size="large" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
            <Avatar size="large">+2</Avatar>
          </div>
        </div>
      </div>
    </div>
  ),
};

// 响应式头像
export const Responsive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Avatar size={24} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
        <Avatar size={32} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
        <Avatar size={40} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
        <Avatar size={48} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
        <Avatar size={56} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
        <Avatar size={64} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
      </div>
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Avatar size={24}>A</Avatar>
        <Avatar size={32}>B</Avatar>
        <Avatar size={40}>C</Avatar>
        <Avatar size={48}>D</Avatar>
        <Avatar size={56}>E</Avatar>
        <Avatar size={64}>F</Avatar>
      </div>
    </div>
  ),
};

// 复杂示例
export const Complex: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>用户列表</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: '张三', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', online: true },
            { name: '李四', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', online: false },
            { name: '王五', avatar: '', online: true },
            { name: 'Admin', avatar: '', online: true },
          ].map((user, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <Avatar 
                  src={user.avatar} 
                  onClick={() => alert(`点击了 ${user.name}`)}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '8px',
                  height: '8px',
                  backgroundColor: user.online ? '#52c41a' : '#d9d9d9',
                  border: '1px solid #fff',
                  borderRadius: '50%'
                }} />
              </div>
              <span>{user.name}</span>
              <span style={{ color: user.online ? '#52c41a' : '#999', fontSize: '12px' }}>
                {user.online ? '在线' : '离线'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};