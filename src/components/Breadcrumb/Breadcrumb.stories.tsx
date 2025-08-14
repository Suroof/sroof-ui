import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';
import React from 'react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '显示当前页面在系统层级结构中的位置，并能向上返回。',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: '面包屑项目列表',
    },
    separator: {
      control: 'text',
      description: '分隔符',
    },
    maxCount: {
      control: 'number',
      description: '最大显示数量，超出时会折叠',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// 基础用法
export const Basic: Story = {
  args: {
    items: [
      { title: '首页', path: '/' },
      { title: '产品', path: '/products' },
      { title: '详情' },
    ],
  },
};

// 使用子组件
export const WithChildren: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
      <Breadcrumb.Item href="/products">产品</Breadcrumb.Item>
      <Breadcrumb.Item>详情</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

// 自定义分隔符
export const CustomSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { title: '首页', path: '/' },
      { title: '用户管理', path: '/users' },
      { title: '用户列表', path: '/users/list' },
      { title: '用户详情' },
    ],
  },
};

// 图标分隔符
export const IconSeparator: Story = {
  render: () => (
    <Breadcrumb
      separator={
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
      items={[
        { title: '首页', path: '/' },
        { title: '文档', path: '/docs' },
        { title: '组件', path: '/docs/components' },
        { title: 'Breadcrumb' },
      ]}
    />
  ),
};

// 带点击事件
export const WithClickHandler: Story = {
  render: () => {
    const handleClick = (path: string) => {
      alert(`导航到: ${path}`);
    };

    return (
      <Breadcrumb
        items={[
          { 
            title: '首页', 
            onClick: () => handleClick('/') 
          },
          { 
            title: '产品列表', 
            onClick: () => handleClick('/products') 
          },
          { 
            title: 'iPhone 15', 
            onClick: () => handleClick('/products/iphone-15') 
          },
          { title: '技术规格' },
        ]}
      />
    );
  },
};

// 禁用状态
export const WithDisabled: Story = {
  args: {
    items: [
      { title: '首页', path: '/' },
      { title: '产品', disabled: true },
      { title: '分类', path: '/categories' },
      { title: '详情' },
    ],
  },
};

// 长路径折叠
export const LongPath: Story = {
  args: {
    maxCount: 4,
    items: [
      { title: '首页', path: '/' },
      { title: '系统管理', path: '/system' },
      { title: '用户管理', path: '/system/users' },
      { title: '角色管理', path: '/system/roles' },
      { title: '权限管理', path: '/system/permissions' },
      { title: '菜单管理', path: '/system/menus' },
      { title: '操作日志', path: '/system/logs' },
      { title: '详情' },
    ],
  },
};

// 复杂内容
export const ComplexContent: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1L3 6v7a2 2 0 002 2h6a2 2 0 002-2V6L8 1z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <path d="M6 15v-6a1 1 0 011-1h2a1 1 0 011 1v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          首页
        </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/dashboard">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          控制台
        </span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M6 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          数据统计
        </span>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
};

// 响应式演示
export const ResponsiveDemo: Story = {
  render: () => (
    <div>
      <p>调整浏览器窗口大小查看响应式效果</p>
      <Breadcrumb
        items={[
          { title: '首页', path: '/' },
          { title: '企业解决方案', path: '/enterprise' },
          { title: '云计算服务', path: '/enterprise/cloud' },
          { title: '容器化部署', path: '/enterprise/cloud/containers' },
          { title: 'Kubernetes管理', path: '/enterprise/cloud/k8s' },
          { title: '集群监控详情' },
        ]}
      />
    </div>
  ),
};

// 动态演示
export const DynamicDemo: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState(['首页']);
    
    const paths = {
      '首页': ['产品', '服务', '关于我们'],
      '产品': ['手机', '电脑', '配件'],
      '手机': ['iPhone', 'Android', '功能机'],
      'iPhone': ['iPhone 15', 'iPhone 14', 'iPhone 13'],
      '服务': ['技术支持', '售后服务', '培训'],
      '关于我们': ['公司简介', '团队介绍', '联系我们'],
    };
    
    const handleNavigation = (index: number) => {
      setCurrentPath(prev => prev.slice(0, index + 1));
    };
    
    const handleAddLevel = (item: string) => {
      setCurrentPath(prev => [...prev, item]);
    };
    
    const currentOptions = paths[currentPath[currentPath.length - 1] as keyof typeof paths] || [];
    
    return (
      <div>
        <Breadcrumb
          items={currentPath.map((item, index) => ({
            title: item,
            onClick: index < currentPath.length - 1 ? () => handleNavigation(index) : undefined,
          }))}
        />
        
        {currentOptions.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <p>选择下一级：</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {currentOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleAddLevel(option)}
                  style={{
                    padding: '4px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={() => setCurrentPath(['首页'])}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            border: '1px solid #1890ff',
            borderRadius: '4px',
            background: '#1890ff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          重置
        </button>
      </div>
    );
  },
};

// 不同样式演示
export const StyleVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>默认样式</h4>
        <Breadcrumb
          items={[
            { title: '首页', path: '/' },
            { title: '产品', path: '/products' },
            { title: '详情' },
          ]}
        />
      </div>
      
      <div>
        <h4>箭头分隔符</h4>
        <Breadcrumb
          separator=">"
          items={[
            { title: '首页', path: '/' },
            { title: '产品', path: '/products' },
            { title: '详情' },
          ]}
        />
      </div>
      
      <div>
        <h4>点分隔符</h4>
        <Breadcrumb
          separator="·"
          items={[
            { title: '首页', path: '/' },
            { title: '产品', path: '/products' },
            { title: '详情' },
          ]}
        />
      </div>
      
      <div>
        <h4>自定义分隔符</h4>
        <Breadcrumb
          separator={<span style={{ color: '#1890ff', fontWeight: 'bold' }}>→</span>}
          items={[
            { title: '首页', path: '/' },
            { title: '产品', path: '/products' },
            { title: '详情' },
          ]}
        />
      </div>
    </div>
  ),
};