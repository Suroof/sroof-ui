import type { Meta, StoryObj } from "@storybook/react";
import { Menu, MenuItem, SubMenu } from "./Menu";
import React from "react";
const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      options: ["horizontal", "vertical", "inline"],
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Horizontal: Story = {
  args: {
    mode: "horizontal",
    children: [
      <MenuItem key="home" label="首页" />,
      <MenuItem key="about" label="关于" />,
      <SubMenu key="products" label="产品">
        <MenuItem key="web" label="Web应用" />
        <MenuItem key="mobile" label="移动应用" />
      </SubMenu>,
      <MenuItem key="contact" label="联系" />,
    ],
  },
};

export const Vertical: Story = {
  args: {
    mode: "vertical",
    children: [
      <MenuItem key="home" label="首页" />,
      <MenuItem key="about" label="关于" />,
      <SubMenu key="products" label="产品">
        <MenuItem key="web" label="Web应用" />
        <MenuItem key="mobile" label="移动应用" />
      </SubMenu>,
      <MenuItem key="contact" label="联系" />,
    ],
  },
};

export const WithSelection: Story = {
  args: {
    mode: "horizontal",
    defaultSelectedKey: "about",
    onSelect: (key: string) => console.log("Selected:", key),
    children: [
      <MenuItem key="home" label="首页" />,
      <MenuItem key="about" label="关于" />,
      <SubMenu key="products" label="产品">
        <MenuItem key="web" label="Web应用" />
        <MenuItem key="mobile" label="移动应用" />
      </SubMenu>,
      <MenuItem key="contact" label="联系" disabled />,
    ],
  },
};
