import type { Meta, StoryObj } from "@storybook/react";
import { Collapse } from "./Collapse";
import React from "react";

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    accordion: {
      control: { type: "boolean" },
      description: "是否手风琴模式（只能同时展开一个面板）",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Basic: Story = {
  render: () => (
    <Collapse accordion defaultActiveKey={["panel-1"]}>
      <Collapse.Panel
        header="这是面板标题 1"
        key="panel-1" // React 列表渲染需要唯一的 key
        panelKey="panel-1" // Collapse 组件逻辑需要唯一的 panelKey
      >
        <p>这是面板内容 1</p>
        <p>这是面板内容 1</p>
        <p>这是面板内容 1</p>
      </Collapse.Panel>

      <Collapse.Panel header="这是面板标题 2" key="panel-2" panelKey="panel-2">
        <p>这是面板内容 2</p>
        <p>这是面板内容 2</p>
        <p>这是面板内容 2</p>
      </Collapse.Panel>

      <Collapse.Panel
        header="这是面板标题 3 (默认关闭)"
        key="panel-3"
        panelKey="panel-3"
      >
        <p>这是面板内容 3</p>
      </Collapse.Panel>
    </Collapse>
  ),
  parameters: {
    docs: {
      description: {
        story: "基础的折叠面板组件，可以同时展开多个面板。",
      },
    },
  },
};

export const Accordion: Story = {
  render: () => (
    <Collapse defaultActiveKey={["panel-1"]}>
      <Collapse.Panel header="这是面板标题 1" key="panel-1" panelKey="panel-1">
        <p>这是面板内容 1</p>
        <p>这是面板内容 1</p>
        <p>这是面板内容 1</p>
      </Collapse.Panel>

      <Collapse.Panel header="这是面板标题 2" key="panel-2" panelKey="panel-2">
        <p>这是面板内容 2</p>
        <p>这是面板内容 2</p>
        <p>这是面板内容 2</p>
      </Collapse.Panel>

      <Collapse.Panel
        header="这是面板标题 3 (默认关闭)"
        key="panel-3"
        panelKey="panel-3"
      >
        <p>这是面板内容 3</p>
      </Collapse.Panel>
    </Collapse>
  ),
  parameters: {
    docs: {
      description: {
        story: "手风琴模式，只能同时展开一个面板。",
      },
    },
  },
};

export const DefaultExpanded: Story = {
  render: () => (
    <Collapse defaultActiveKey={["panel-1"]}>
      <Collapse.Panel header="这是面板标题 1" key="panel-1" panelKey="panel-1">
        <p>这是面板内容 1</p>
        <p>这是面板内容 1</p>
        <p>这是面板内容 1</p>
      </Collapse.Panel>

      <Collapse.Panel header="这是面板标题 2" key="panel-2" panelKey="panel-2">
        <p>这是面板内容 2</p>
        <p>这是面板内容 2</p>
        <p>这是面板内容 2</p>
      </Collapse.Panel>

      <Collapse.Panel
        header="这是面板标题 3 (默认关闭)"
        key="panel-3"
        panelKey="panel-3"
      >
        <p>这是面板内容 3</p>
      </Collapse.Panel>
    </Collapse>
  ),
  parameters: {
    docs: {
      description: {
        story: "默认展开多个面板。",
      },
    },
  },
};
