import React from "react";
import { Card } from "./Card";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "卡片标题",
      control: "text",
    },
    size: {
      description: "卡片尺寸",
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "卡片标题",
    children: "卡片内容",
    size: "medium",
    type: "default",
  },
  render: (args) => <Card {...args} />,
};

export const AllSize: Story = {
  args: {
    title: "卡片标题",
    children: "卡片内容",
    size: "medium",
    type: "default",
    bordered: true,
  },
  render: (args) => (
    <>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div>
          <Card {...args} size="small" />
        </div>
        <div>
          <Card {...args} />
        </div>
        <Card {...args} size="large" />
      </div>
    </>
  ),
};

export const AllTypes: Story = {
  args: {
    title: "卡片标题",
    children: "卡片内容",
    size: "medium",
    type: "primary",
  },
  render: (args) => (
    <>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card {...args} />
        <Card {...args} type="default" />
        <Card {...args} type="success" />
        <Card {...args} type="warning" />
        <Card {...args} type="danger" />
      </div>
    </>
  ),
};
