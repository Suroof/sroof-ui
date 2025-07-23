import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import React from 'react';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { LanguageSwitcher } from '../LanguageSwitcher';

// 国际化按钮组件示例
const I18nInput: React.FC<{ size?:  "small" | "medium" | "large" }> = ({ size = 'medium' }) => {
  const { t } = useTranslation();
  return <Input size={size} placeholder={t(`input.${size}`)} />;
};

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

// 国际化示例
export const WithI18n: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <LanguageSwitcher variant="buttons" />
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <I18nInput size="small" />
        <I18nInput size="medium" />
        <I18nInput size="large" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '展示按钮组件的国际化功能，可以切换语言查看按钮文本的变化。',
      },
    },
  },
};


export const Disabled: Story = {
  args: {
    disabled: true,
  },
};