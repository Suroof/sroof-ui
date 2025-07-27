import { Meta, StoryObj } from "@storybook/react";
import { Notification } from "./Notification";
import { Button } from "../Button";
import React from "react";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    closeIcon: { control: "boolean" },
    duration: { control: "number" },
    message: { control: "text" },
    onClick: { action: "clicked" },
    onClose: { action: "closed" }, 
    position: {
      control: "select",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    duration: 3000,
    message: "This is a notification",
    onClick: () => console.log("Notification clicked"),
    onClose: () => console.log("Notification closed"),
    position: "top-right",
    className: "",
    closeIcon: true, // 默认显示关闭按钮
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      if (!open) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    const handleClose = () => {
      setOpen(false);
      args.onClose?.(); // 触发传入的 onClose 回调
    };

    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        {/* 按钮控制打开 */}
        <Button onClick={handleOpen}>显示通知</Button>

        {/* 传递 open 状态给 Notification */}
        <Notification
          {...args}
          show={open}
          onClose={handleClose} // 重写 onClose，确保状态同步
        />
      </div>
    );
  },
};
