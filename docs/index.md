---
layout: home

hero:
  name: "Sroof UI"
  text: "现代化的 React UI 组件库"
  tagline: 支持 TypeScript，为现代 Web 应用而设计
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看组件
      link: /components/

features:
  - title: TypeScript 优先
    details: 完全使用 TypeScript 构建，提供完整的类型安全支持
  - title: 现代化设计
    details: 遵循现代设计原则，提供美观且一致的用户界面
  - title: 易于使用
    details: 简单直观的 API 设计，快速集成到您的项目中
  - title: 高度可定制
    details: 灵活的主题系统和样式选项，满足不同项目需求
  - title: 无障碍访问
    details: 遵循 WCAG 指南，确保所有用户都能访问
  - title: 响应式设计
    details: 移动优先的设计方法，适配各种屏幕尺寸
---

## Quick Start

```bash
npm install sroof-ui
```

```tsx
import { Button } from 'sroof-ui'
import 'sroof-ui/dist/index.css'

function App() {
  return (
    <Button variant="primary">
      Hello Sroof UI!
    </Button>
  )
}
```

## Components Overview

- **Button** - Customizable button component with multiple variants
- **Input** - Form input with validation support  
- **Menu** - Flexible menu component with horizontal/vertical layouts
- **Tabs** - Tab navigation component with controlled/uncontrolled modes
- **Radio** - Radio button component for single selection
- **Switch** - Toggle switch component
- **Form** - Form wrapper component with validation
- **LanguageSwitcher** - Internationalization language switcher