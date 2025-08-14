import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Alert from './Alert';
import Button from '../Button/Button';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '警告提示，展现需要关注的信息。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '警告提示内容',
    },
    description: {
      control: 'text',
      description: '警告提示的辅助性文字介绍',
    },
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: '指定警告提示的样式',
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示辅助图标',
    },
    banner: {
      control: 'boolean',
      description: '是否用作顶部公告',
    },
    closeText: {
      control: 'text',
      description: '自定义关闭按钮文字',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// 基础用法
export const Default: Story = {
  args: {
    message: '这是一条信息提示',
    type: 'info',
  },
};

// 不同类型
export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert message="成功提示的文案" type="success" />
      <Alert message="消息提示的文案" type="info" />
      <Alert message="警告提示的文案" type="warning" />
      <Alert message="错误提示的文案" type="error" />
    </div>
  ),
};

// 可关闭的警告提示
export const Closable: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert message="警告提示的文案" type="warning" closable />
      <Alert 
        message="错误提示的文案" 
        type="error" 
        closable 
        onClose={() => console.log('Alert closed')}
      />
      <Alert 
        message="自定义关闭按钮" 
        type="info" 
        closable 
        closeText="关闭"
      />
    </div>
  ),
};

// 含有辅助性文字介绍
export const WithDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        message="成功提示的文案"
        description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
        type="success"
      />
      <Alert
        message="消息提示的文案"
        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
        type="info"
      />
      <Alert
        message="警告提示的文案"
        description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
        type="warning"
      />
      <Alert
        message="错误提示的文案"
        description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
        type="error"
      />
    </div>
  ),
};

// 带有图标
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert message="成功提示的文案" type="success" showIcon />
      <Alert message="消息提示的文案" type="info" showIcon />
      <Alert message="警告提示的文案" type="warning" showIcon />
      <Alert message="错误提示的文案" type="error" showIcon />
    </div>
  ),
};

// 带有图标和辅助性文字介绍
export const WithIconAndDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        message="成功提示的文案"
        description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
        type="success"
        showIcon
      />
      <Alert
        message="消息提示的文案"
        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
        type="info"
        showIcon
      />
      <Alert
        message="警告提示的文案"
        description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
        type="warning"
        showIcon
      />
      <Alert
        message="错误提示的文案"
        description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
        type="error"
        showIcon
      />
    </div>
  ),
};

// 自定义图标
export const CustomIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        message="自定义图标"
        type="info"
        icon={
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
          </svg>
        }
      />
      <Alert
        message="带有自定义图标的成功提示"
        description="这是一个带有自定义图标的成功提示信息"
        type="success"
        icon={
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
          </svg>
        }
      />
    </div>
  ),
};

// 顶部公告
export const Banner: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <Alert message="警告提示的文案" banner />
      <Alert message="很长的警告提示的文案很长的警告提示的文案很长的警告提示的文案很长的警告提示的文案很长的警告提示的文案很长的警告提示的文案" banner closable />
      <Alert message="错误提示的文案" type="error" banner />
      <Alert message="成功提示的文案" type="success" banner />
    </div>
  ),
};

// 操作按钮
export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        message="成功提示"
        type="success"
        action={
          <Button size="small" variant="primary">
            详情
          </Button>
        }
        closable
      />
      <Alert
        message="错误提示"
        description="错误提示的辅助性文字介绍"
        type="error"
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="small">取消</Button>
            <Button size="small" variant="danger">重试</Button>
          </div>
        }
      />
      <Alert
        message="警告提示"
        type="warning"
        action={
          <Button size="small" variant="outline">
            了解更多
          </Button>
        }
        showIcon
      />
    </div>
  ),
};

// 动态演示
export const Dynamic: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    const [type, setType] = React.useState<'success' | 'info' | 'warning' | 'error'>('info');
    
    const showAlert = () => {
      setVisible(true);
    };
    
    const changeType = () => {
      const types: Array<'success' | 'info' | 'warning' | 'error'> = ['success', 'info', 'warning', 'error'];
      const currentIndex = types.indexOf(type);
      const nextIndex = (currentIndex + 1) % types.length;
      setType(types[nextIndex]);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={showAlert} disabled={visible}>
            显示Alert
          </Button>
          <Button onClick={changeType}>
            切换类型 ({type})
          </Button>
        </div>
        
        {visible && (
          <Alert
            message={`这是一个${type}类型的提示`}
            description="这是辅助性文字介绍"
            type={type}
            showIcon
            closable
            onClose={() => setVisible(false)}
            afterClose={() => console.log('Alert已关闭')}
          />
        )}
      </div>
    );
  },
};

// 复杂示例
export const Complex: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        message="系统升级通知"
        description={
          <div>
            <p>系统将于今晚 23:00 - 次日 02:00 进行升级维护，期间可能影响部分功能使用。</p>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>用户登录功能正常</li>
              <li>数据查询可能延迟</li>
              <li>文件上传暂时关闭</li>
            </ul>
            <p>如有紧急问题，请联系技术支持：400-123-4567</p>
          </div>
        }
        type="warning"
        showIcon
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="small">稍后提醒</Button>
            <Button size="small" variant="primary">知道了</Button>
          </div>
        }
        closable
      />
      
      <Alert
        message="数据同步失败"
        description="与服务器的连接已断开，请检查网络连接后重试。错误代码：NET_001"
        type="error"
        showIcon
        action={
          <Button size="small" variant="danger">
            重新连接
          </Button>
        }
        closable
      />
      
      <Alert
        message="恭喜！您的账户已成功升级为VIP会员"
        description="现在您可以享受更多专属权益，包括优先客服支持、专属折扣等。"
        type="success"
        showIcon
        action={
          <Button size="small" variant="primary">
            查看权益
          </Button>
        }
        closable
      />
    </div>
  ),
};