import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormItem, FormActions } from "./Form";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import React from "react";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "高级表单组件，支持多种布局、验证和无障碍访问。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <Form onSubmit={(e) => console.log("Form submitted", e)}>
      <FormItem label="用户名" required>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="邮箱" required>
        <Input type="email" placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="密码" required>
        <Input type="password" placeholder="请输入密码" />
      </FormItem>
      <FormActions align="center">
        <Button variant="outline">取消</Button>
        <Button variant="primary" type="submit">
          提交
        </Button>
      </FormActions>
    </Form>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <Form>
      <FormItem label="用户名" required error="用户名不能为空">
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="邮箱" required error="请输入有效的邮箱地址">
        <Input type="email" placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="密码" required>
        <Input type="password" placeholder="请输入密码" />
      </FormItem>
      <FormActions align="center">
        <Button variant="outline">取消</Button>
        <Button variant="primary" type="submit">
          提交
        </Button>
      </FormActions>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: "带有验证错误信息的表单示例。",
      },
    },
  },
};

export const HorizontalLayout: Story = {
  render: () => (
    <Form layout="horizontal">
      <FormItem label="姓名" required>
        <Input placeholder="请输入姓名" />
      </FormItem>
      <FormItem label="电话">
        <Input placeholder="请输入电话号码" />
      </FormItem>
      <FormItem label="地址">
        <Input placeholder="请输入地址" />
      </FormItem>
      <FormActions align="center">
        <Button variant="primary">保存</Button>
      </FormActions>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: "水平布局的表单，标签在左侧。",
      },
    },
  },
};

export const InlineLayout: Story = {
  render: () => (
    <Form layout="inline">
      <FormItem label="搜索">
        <Input placeholder="关键词" />
      </FormItem>
      <FormItem label="分类">
        <select title="选择分类" aria-label="选择分类">
          <option>全部</option>
          <option>技术</option>
          <option>设计</option>
        </select>
      </FormItem>
      <FormActions>
        <Button variant="primary">搜索</Button>
      </FormActions>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: "内联布局的表单，适合搜索等场景。",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div>
      <Form size="small" bordered>
        <h3>小尺寸表单</h3>
        <FormItem label="用户名">
          <Input placeholder="小尺寸输入框" />
        </FormItem>
      </Form>

      <Form size="medium" bordered>
        <h3>中等尺寸表单</h3>
        <FormItem label="用户名">
          <Input placeholder="中等尺寸输入框" />
        </FormItem>
      </Form>

      <Form size="large" bordered>
        <h3>大尺寸表单</h3>
        <FormItem label="用户名">
          <Input placeholder="大尺寸输入框" />
        </FormItem>
      </Form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "不同尺寸的表单示例。",
      },
    },
  },
};
