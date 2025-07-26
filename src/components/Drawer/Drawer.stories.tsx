import { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../Button/Button";
import React from "react";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "onClose" },
    title: { control: "text" },
    children: { control: "text" },
    placement: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    closable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log("close"),
    title: "Drawer Title",
    placement: "left",
    closable: true,
  },
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};
