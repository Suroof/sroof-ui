import type { Meta, StoryObj } from '@storybook/react';
import { Radio,RadioGroup } from './Radio';
import React from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '单选框组件，支持受控和非受控模式。通常与 RadioGroup 组件配合使用。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '选项内容',
      control: 'text',
    },
    value: {
      description: '选项值',
      control: 'text',
    },
    checked: {
      description: '是否选中（受控模式）',
      control: 'boolean',
    },
    defaultChecked: {
      description: '默认选中（非受控模式）',
      control: 'boolean',
    },
    disabled: {
      description: '是否禁用',
      control: 'boolean',
    },
    name: {
      description: '单选框组名称',
      control: 'text',
    },
    onChange: {
      description: '值变化回调',
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const RadioGroupHorizontal: Story = {
  render: () => (
    <RadioGroup direction="horizontal" defaultValue="small" name="size-group">
      <Radio value="small">小</Radio>
      <Radio value="medium">中</Radio>
      <Radio value="large">大</Radio>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '水平布局的单选框组。',
      },
    },
  },
};


export const Default: Story = {
  args: {
    children: 'Radio',
    value: 'radio',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '禁用选项',
    value: 'disabled',
    disabled: true,
    defaultChecked: true,
  },
};

export const RadioGroupVertical: Story = {
  render: () => (
    <RadioGroup defaultValue="option2" name="vertical-group">
      <Radio value="option1">选项 1</Radio>
      <Radio value="option2">选项 2</Radio>
      <Radio value="option3">选项 3</Radio>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '垂直布局的单选框组，默认选中第二个选项。',
      },
    },
  },
};


export const RadioGroupControlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('react');
    
    return (
      <div >
        <RadioGroup 
          value={value} 
          onChange={setValue}
          name="framework-group"
        >
          <Radio value="react">React</Radio>
          <Radio value="vue">Vue</Radio>
          <Radio value="angular">Angular</Radio>
          <Radio value="svelte">Svelte</Radio>
        </RadioGroup>
        <p>当前选择: {value}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '受控模式的单选框组，显示当前选中的值。',
      },
    },
  },
};

export const RadioGroupWithDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="enabled1" name="mixed-group">
      <Radio value="enabled1">可用选项 1</Radio>
      <Radio value="disabled1" disabled>禁用选项</Radio>
      <Radio value="enabled2">可用选项 2</Radio>
      <Radio value="disabled2" disabled>另一个禁用选项</Radio>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '包含禁用选项的单选框组。',
      },
    },
  },
};

export const RadioGroupDisabled: Story = {
  render: () => (
    <RadioGroup disabled defaultValue="option2" name="disabled-group">
      <Radio value="option1">选项 1</Radio>
      <Radio value="option2">选项 2</Radio>
      <Radio value="option3">选项 3</Radio>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '整个单选框组都被禁用。',
      },
    },
  },
};