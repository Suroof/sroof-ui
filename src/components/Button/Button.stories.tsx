import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import React from "react";
import { useTranslation } from "../../i18n/hooks/useTranslation";
import { LanguageSwitcher } from "../LanguageSwitcher";

// 国际化按钮组件示例
const I18nButton: React.FC<{
  variant?: "primary" | "secondary" | "outline" | "text";
}> = ({ variant = "primary" }) => {
  const { t } = useTranslation();
  return <Button variant={variant}>{t(`button.${variant}`)}</Button>;
};

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "outline",
        "text",
        "danger",
        "link",
        "success",
        "warning",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

// 国际化示例
export const WithI18n: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <LanguageSwitcher variant="buttons" />
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <I18nButton variant="primary" />
        <I18nButton variant="secondary" />
        <I18nButton variant="outline" />
        <I18nButton variant="text" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "展示按钮组件的国际化功能，可以切换语言查看按钮文本的变化。",
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
