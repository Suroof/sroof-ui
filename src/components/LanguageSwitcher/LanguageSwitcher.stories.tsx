import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '语言切换组件，支持下拉选择和按钮组两种样式。',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['dropdown', 'buttons'],
      description: '组件样式变体',
    },
    className: {
      control: { type: 'text' },
      description: '自定义 CSS 类名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
  args: {
    variant: 'dropdown',
  },
};

export const Buttons: Story = {
  args: {
    variant: 'buttons',
  },
};

export const WithCustomClass: Story = {
  args: {
    variant: 'dropdown',
    className: 'custom-language-switcher',
  },
};