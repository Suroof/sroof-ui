import { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import React from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      description: "是否选中（受控模式）",
      control: "boolean",
    },
    defaultChecked: {
      description: "默认选中（非受控模式）",
      control: "boolean",
    },
    disabled: {
      description: "是否禁用",
      control: "boolean",
    }
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
    disabled: false
  },
  render: (args) => <Switch {...args} />,
};

// 添加受控模式的示例
export const Controlled: Story = {
  args: {
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Switch 
        {...args} 
        checked={checked} 
        onChange={setChecked}
      />
    );
  },
};

// 添加更多示例
export const WithLabel: Story = {
  args: {
    defaultChecked: true,
    children: "启用通知",
  },
};

export const Different_Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Switch size="small" defaultChecked>小</Switch>
      <Switch size="medium" defaultChecked>中</Switch>
      <Switch size="large" defaultChecked>大</Switch>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    defaultChecked: true,
  },
};
