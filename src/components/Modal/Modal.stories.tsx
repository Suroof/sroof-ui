import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '模态框组件，用于显示重要信息或进行用户交互。支持多种配置选项和无障碍访问。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '是否显示模态框',
    },
    title: {
      control: 'text',
      description: '模态框标题',
    },
    width: {
      control: 'text',
      description: '模态框宽度',
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
    },
    maskClosable: {
      control: 'boolean',
      description: '是否点击遮罩层关闭',
    },
    mask: {
      control: 'boolean',
      description: '是否显示遮罩层',
    },
    centered: {
      control: 'boolean',
      description: '是否居中显示',
    },
    zIndex: {
      control: 'number',
      description: '层级',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 基础模态框
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开模态框</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>这是一个基础的模态框内容。</p>
          <p>您可以在这里放置任何内容。</p>
        </Modal>
      </>
    );
  },
  args: {
    title: '基础模态框',
    width: 520,
    closable: true,
    maskClosable: true,
    mask: true,
    centered: false,
  },
};

// 带底部操作的模态框
export const WithFooter: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    const footer = (
      <>
        <Button onClick={() => setOpen(false)}>取消</Button>
        <Button variant="primary" onClick={() => setOpen(false)}>确认</Button>
      </>
    );
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开带底部操作的模态框</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={footer}
        >
          <p>这是一个带有底部操作按钮的模态框。</p>
          <p>您可以点击底部的按钮进行操作。</p>
        </Modal>
      </>
    );
  },
  args: {
    title: '确认操作',
    width: 520,
  },
};

// 居中显示的模态框
export const Centered: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开居中模态框</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>这是一个居中显示的模态框。</p>
          <p>无论内容多少，都会在屏幕中央显示。</p>
        </Modal>
      </>
    );
  },
  args: {
    title: '居中模态框',
    centered: true,
    width: 400,
  },
};

// 大尺寸模态框
export const Large: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开大尺寸模态框</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={{ height: '400px', padding: '20px' }}>
            <h3>大尺寸模态框</h3>
            <p>这是一个大尺寸的模态框，适合显示更多内容。</p>
            <div style={{ marginTop: '20px' }}>
              <h4>功能特性：</h4>
              <ul>
                <li>支持自定义宽度</li>
                <li>响应式设计</li>
                <li>无障碍访问</li>
                <li>键盘导航支持</li>
                <li>焦点管理</li>
              </ul>
            </div>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: '大尺寸模态框',
    width: 800,
  },
};

// 无标题模态框
export const NoTitle: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开无标题模态框</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>自定义标题</h2>
            <p>这是一个没有标题栏的模态框。</p>
            <p>您可以在内容区域自定义标题样式。</p>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    width: 400,
    closable: true,
  },
};

// 不可关闭的模态框
export const NotClosable: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    const footer = (
      <Button variant="primary" onClick={() => setOpen(false)}>完成</Button>
    );
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开不可关闭模态框</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={footer}
        >
          <p>这是一个不可通过ESC键或点击遮罩层关闭的模态框。</p>
          <p>只能通过底部的按钮关闭。</p>
        </Modal>
      </>
    );
  },
  args: {
    title: '重要提示',
    closable: false,
    maskClosable: false,
    width: 400,
  },
};