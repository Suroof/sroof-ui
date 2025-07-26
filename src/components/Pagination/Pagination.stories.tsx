import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import React from "react";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "分页组件",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <Pagination
        total={100}
        current={1}
        pageSize={10}
        onChange={(page) => console.log(page)}
        siblingCount={1}
        ellipsis="..."
        className=""
    />
  ),
};
