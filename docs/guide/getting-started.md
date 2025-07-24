# 快速开始

欢迎使用 Sroof UI！本指南将帮助您快速开始使用我们的组件库。

## 概述

Sroof UI 是一个现代化的 React UI 组件库，专为构建高质量的 Web 应用程序而设计。它提供了一套完整的组件，支持 TypeScript，并遵循最佳的设计实践。

## 主要特性

- **TypeScript 优先**：完全使用 TypeScript 构建，提供完整的类型安全
- **现代化设计**：遵循现代设计原则和最佳实践
- **易于使用**：简单直观的 API 设计
- **高度可定制**：灵活的主题系统和样式选项
- **无障碍访问**：遵循 WCAG 指南
- **响应式设计**：移动优先的设计方法

## 安装

使用 npm 安装：

```bash
npm install sroof-ui
```

使用 yarn 安装：

```bash
yarn add sroof-ui
```

使用 pnpm 安装：

```bash
pnpm add sroof-ui
```

## 基本使用

安装完成后，您可以在项目中导入和使用组件：

```tsx
import React from 'react'
import { Button } from 'sroof-ui'
import 'sroof-ui/dist/index.css'

function App() {
  return (
    <div>
      <Button type="primary">
        点击我
      </Button>
    </div>
  )
}

export default App
```

## 样式导入

不要忘记导入 CSS 样式文件：

```tsx
import 'sroof-ui/dist/index.css'
```

## 下一步

- 查看 [安装指南](/guide/installation) 了解详细的安装说明
- 阅读 [使用方法](/guide/usage) 了解更多使用技巧
- 浏览 [组件文档](/components/) 查看所有可用组件