# 国际化 (i18n) 配置指南

本项目使用 `react-i18next` 实现国际化功能，支持中文和英文两种语言。

## 📁 文件结构

```
src/i18n/
├── index.ts              # 主导出文件
├── i18n.ts              # i18n 配置
├── types.ts             # TypeScript 类型定义
├── utils.ts             # 工具函数
├── hooks/
│   └── useTranslation.ts # 自定义 Hook
└── locales/
    ├── en.json          # 英文语言包
    └── zh.json          # 中文语言包
```

## 🚀 快速开始

### 1. 基本使用

```tsx
import { useTranslation } from '../i18n/hooks/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <button>{t('button.primary')}</button>
    </div>
  );
};
```

### 2. 语言切换

```tsx
import { LanguageSwitcher } from '../components/LanguageSwitcher';

// 下拉选择器样式
<LanguageSwitcher variant="dropdown" />

// 按钮组样式
<LanguageSwitcher variant="buttons" />
```

### 3. 手动切换语言

```tsx
import { useLanguageSwitch } from '../i18n/hooks/useTranslation';

const MyComponent = () => {
  const { switchLanguage, currentLanguage } = useLanguageSwitch();
  
  const handleLanguageChange = () => {
    switchLanguage(currentLanguage === 'en' ? 'zh' : 'en');
  };
  
  return (
    <button onClick={handleLanguageChange}>
      切换到 {currentLanguage === 'en' ? '中文' : 'English'}
    </button>
  );
};
```

## 📝 添加新的翻译

### 1. 更新语言文件

在 `locales/en.json` 和 `locales/zh.json` 中添加新的翻译键值对：

```json
// en.json
{
  "myFeature": {
    "title": "My Feature",
    "description": "This is my feature description"
  }
}

// zh.json
{
  "myFeature": {
    "title": "我的功能",
    "description": "这是我的功能描述"
  }
}
```

### 2. 更新类型定义

在 `types.ts` 中更新 `TranslationNamespace` 接口：

```typescript
export interface TranslationNamespace {
  // ... 现有的命名空间
  myFeature: {
    title: string;
    description: string;
  };
}
```

### 3. 使用新翻译

```tsx
const { t } = useTranslation();

return (
  <div>
    <h2>{t('myFeature.title')}</h2>
    <p>{t('myFeature.description')}</p>
  </div>
);
```

## 🔧 高级功能

### 1. 插值（变量替换）

```json
// 语言文件
{
  "message": {
    "welcome": "Welcome to {{name}}",
    "itemCount": "You have {{count}} item",
    "itemCount_plural": "You have {{count}} items"
  }
}
```

```tsx
// 使用
const { t } = useTranslation();

return (
  <div>
    <p>{t('message.welcome', { name: 'My App' })}</p>
    <p>{t('message.itemCount', { count: 5 })}</p>
  </div>
);
```

### 2. 复数形式

```tsx
const { t } = useTranslation();
const itemCount = 5;

return (
  <p>{t('message.itemCount', { count: itemCount })}</p>
);
```

### 3. 格式化工具

```tsx
import { formatDate, formatNumber, formatCurrency } from '../i18n/utils';
import { useCurrentLanguage } from '../i18n/hooks/useTranslation';

const MyComponent = () => {
  const currentLanguage = useCurrentLanguage();
  const now = new Date();
  
  return (
    <div>
      <p>日期: {formatDate(now, currentLanguage)}</p>
      <p>数字: {formatNumber(1234567, currentLanguage)}</p>
      <p>货币: {formatCurrency(99.99, currentLanguage)}</p>
    </div>
  );
};
```

## 🎨 在 Storybook 中使用

国际化已经在 Storybook 中配置好了，你可以在故事中直接使用：

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { LanguageSwitcher } from '../LanguageSwitcher';

const I18nExample = () => {
  const { t } = useTranslation();
  return (
    <div>
      <LanguageSwitcher variant="buttons" />
      <h1>{t('common.welcome')}</h1>
    </div>
  );
};

export const WithI18n: Story = {
  render: () => <I18nExample />,
};
```

## 🔍 最佳实践

1. **命名约定**: 使用点分隔的命名空间，如 `common.loading`、`button.primary`
2. **类型安全**: 利用 TypeScript 类型定义确保翻译键的正确性
3. **回退机制**: 始终提供英文作为回退语言
4. **性能优化**: 语言包会被自动缓存到 localStorage
5. **一致性**: 保持所有语言文件的结构一致

## 🌍 支持的语言

- `en`: English
- `zh`: 中文

如需添加更多语言，请：
1. 在 `locales/` 目录下创建新的语言文件
2. 更新 `i18n.ts` 中的 `supportedLanguages` 和 `resources`
3. 更新相关的类型定义

## 🐛 常见问题

### Q: 翻译没有显示？
A: 检查是否正确导入了 `./i18n/i18n` 文件，确保在应用启动时初始化了 i18n。

### Q: TypeScript 类型错误？
A: 确保在 `types.ts` 中正确定义了翻译键的类型。

### Q: 语言切换不生效？
A: 检查浏览器的 localStorage，确保语言设置被正确保存。