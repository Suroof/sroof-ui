import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {Tag} from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '标签组件，用于分类标记和状态显示。支持多种颜色、尺寸和交互模式。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: '标签颜色',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '标签大小',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'light'],
      description: '标签变体',
    },
    closable: {
      control: 'boolean',
      description: '是否可关闭',
    },
    checkable: {
      control: 'boolean',
      description: '是否可选择',
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// 基本使用
export const Default: Story = {
  args: {
    children: '默认标签',
  },
};

// 颜色变体
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag color="default">默认</Tag>
      <Tag color="primary">主要</Tag>
      <Tag color="success">成功</Tag>
      <Tag color="warning">警告</Tag>
      <Tag color="danger">危险</Tag>
      <Tag color="info">信息</Tag>
    </div>
  ),
};

// 自定义颜色
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag color="#f50">自定义红色</Tag>
      <Tag color="#2db7f5">自定义蓝色</Tag>
      <Tag color="#87d068">自定义绿色</Tag>
      <Tag color="#108ee9">自定义深蓝</Tag>
      <Tag color="#ff6600">自定义橙色</Tag>
      <Tag color="#9b59b6">自定义紫色</Tag>
    </div>
  ),
};

// 尺寸变体
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Tag size="small" color="primary">小尺寸</Tag>
      <Tag size="medium" color="primary">中等尺寸</Tag>
      <Tag size="large" color="primary">大尺寸</Tag>
    </div>
  ),
};

// 变体样式
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>填充样式</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag variant="filled" color="primary">主要</Tag>
          <Tag variant="filled" color="success">成功</Tag>
          <Tag variant="filled" color="warning">警告</Tag>
          <Tag variant="filled" color="danger">危险</Tag>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>描边样式</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag variant="outlined" color="primary">主要</Tag>
          <Tag variant="outlined" color="success">成功</Tag>
          <Tag variant="outlined" color="warning">警告</Tag>
          <Tag variant="outlined" color="danger">危险</Tag>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>浅色样式</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag variant="light" color="primary">主要</Tag>
          <Tag variant="light" color="success">成功</Tag>
          <Tag variant="light" color="warning">警告</Tag>
          <Tag variant="light" color="danger">危险</Tag>
        </div>
      </div>
    </div>
  ),
};

// 带图标
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag icon={<span>👤</span>} color="primary">用户</Tag>
      <Tag icon={<span>📧</span>} color="info">邮件</Tag>
      <Tag icon={<span>⭐</span>} color="warning">收藏</Tag>
      <Tag icon={<span>🔥</span>} color="danger">热门</Tag>
      <Tag icon={<span>✅</span>} color="success">完成</Tag>
      <Tag icon={<span>🚀</span>} color="primary">发布</Tag>
    </div>
  ),
};

// 可关闭标签
export const Closable: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: '可关闭标签 1', color: 'primary' as const },
      { id: 2, label: '可关闭标签 2', color: 'success' as const },
      { id: 3, label: '可关闭标签 3', color: 'warning' as const },
      { id: 4, label: '可关闭标签 4', color: 'danger' as const },
    ]);

    const handleClose = (id: number) => {
      setTags(tags.filter(tag => tag.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags.map(tag => (
          <Tag
            key={tag.id}
            color={tag.color}
            closable
            onClose={() => handleClose(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
        {tags.length === 0 && (
          <p style={{ color: '#999', fontStyle: 'italic' }}>所有标签已被关闭</p>
        )}
      </div>
    );
  },
};

// 可选择标签
export const Checkable: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['tag1']);

    const tags = [
      { id: 'tag1', label: '前端开发', color: 'primary' as const },
      { id: 'tag2', label: '后端开发', color: 'success' as const },
      { id: 'tag3', label: '移动开发', color: 'warning' as const },
      { id: 'tag4', label: '数据科学', color: 'info' as const },
      { id: 'tag5', label: '产品设计', color: 'danger' as const },
    ];

    const handleTagChange = (tagId: string, checked: boolean) => {
      if (checked) {
        setSelectedTags([...selectedTags, tagId]);
      } else {
        setSelectedTags(selectedTags.filter(id => id !== tagId));
      }
    };

    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {tags.map(tag => (
            <Tag
              key={tag.id}
              color={tag.color}
              checkable
              checked={selectedTags.includes(tag.id)}
              onCheckedChange={(checked) => handleTagChange(tag.id, checked)}
            >
              {tag.label}
            </Tag>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          已选择: {selectedTags.length > 0 ?
            selectedTags.map(id => tags.find(t => t.id === id)?.label).join(', ') :
            '无'
          }
        </p>
      </div>
    );
  },
};

// 自定义关闭图标
export const CustomCloseIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag
        color="primary"
        closable
        closeIcon={<span style={{ fontSize: '12px' }}>✕</span>}
      >
        自定义关闭图标
      </Tag>
      <Tag
        color="danger"
        closable
        closeIcon={<span style={{ fontSize: '10px' }}>🗑️</span>}
      >
        删除标签
      </Tag>
      <Tag
        color="warning"
        closable
        closeIcon={<span style={{ fontSize: '10px' }}>➖</span>}
      >
        移除标签
      </Tag>
    </div>
  ),
};

// 无边框
export const NoBorder: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag color="primary" bordered={false}>无边框主要</Tag>
      <Tag color="success" bordered={false}>无边框成功</Tag>
      <Tag color="warning" bordered={false}>无边框警告</Tag>
      <Tag color="danger" bordered={false}>无边框危险</Tag>
    </div>
  ),
};

// 综合示例 - 标签管理器
export const TagManager: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: 1, label: 'React', color: '#61dafb', category: '前端' },
      { id: 2, label: 'Vue', color: '#4fc08d', category: '前端' },
      { id: 3, label: 'Angular', color: '#dd0031', category: '前端' },
      { id: 4, label: 'Node.js', color: '#339933', category: '后端' },
      { id: 5, label: 'Python', color: '#3776ab', category: '后端' },
      { id: 6, label: 'Java', color: '#f89820', category: '后端' },
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const categories = ['前端', '后端'];
    const filteredTags = selectedCategory
      ? tags.filter(tag => tag.category === selectedCategory)
      : tags;

    const handleRemoveTag = (id: number) => {
      setTags(tags.filter(tag => tag.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>分类筛选</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tag
              checkable
              checked={selectedCategory === ''}
              onCheckedChange={(checked) => checked && setSelectedCategory('')}
            >
              全部
            </Tag>
            {categories.map(category => (
              <Tag
                key={category}
                checkable
                checked={selectedCategory === category}
                onCheckedChange={(checked) => setSelectedCategory(checked ? category : '')}
                color="primary"
              >
                {category}
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>技术标签</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {filteredTags.map(tag => (
              <Tag
                key={tag.id}
                color={tag.color}
                closable
                icon={<span>🏷️</span>}
                onClose={() => handleRemoveTag(tag.id)}
              >
                {tag.label}
              </Tag>
            ))}
          </div>
          {filteredTags.length === 0 && (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              {selectedCategory ? `没有 ${selectedCategory} 相关的标签` : '没有标签'}
            </p>
          )}
        </div>

        <div style={{ fontSize: '14px', color: '#666' }}>
          总共 {tags.length} 个标签，显示 {filteredTags.length} 个
        </div>
      </div>
    );
  },
};

// 状态标签
export const StatusTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>项目状态</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag color="success" icon={<span>✅</span>}>已完成</Tag>
          <Tag color="primary" icon={<span>🔄</span>}>进行中</Tag>
          <Tag color="warning" icon={<span>⏳</span>}>等待中</Tag>
          <Tag color="danger" icon={<span>❌</span>}>已取消</Tag>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>优先级</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag color="danger" variant="filled">高优先级</Tag>
          <Tag color="warning" variant="filled">中优先级</Tag>
          <Tag color="info" variant="outlined">低优先级</Tag>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0' }}>团队角色</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag color="#722ed1" icon={<span>👑</span>}>管理员</Tag>
          <Tag color="#1890ff" icon={<span>👨‍💻</span>}>开发者</Tag>
          <Tag color="#52c41a" icon={<span>🎨</span>}>设计师</Tag>
          <Tag color="#fa8c16" icon={<span>📊</span>}>分析师</Tag>
        </div>
      </div>
    </div>
  ),
};
