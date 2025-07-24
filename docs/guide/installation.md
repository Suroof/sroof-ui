# 安装

本页面将指导您如何在项目中安装和配置 Sroof UI。

## 系统要求

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js**: 版本 16.0 或更高
- **React**: 版本 18.0 或更高
- **TypeScript**: 版本 4.5 或更高（可选，但推荐）

## 包管理器安装

### 使用 npm

```bash
npm install sroof-ui
```

### 使用 yarn

```bash
yarn add sroof-ui
```

### 使用 pnpm

```bash
pnpm add sroof-ui
```

## CDN 安装

如果您不想使用包管理器，也可以通过 CDN 直接引入：

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/sroof-ui/dist/index.css">

<!-- JavaScript -->
<script src="https://unpkg.com/sroof-ui/dist/index.js"></script>
```

## 样式导入

安装完成后，您需要在项目的入口文件中导入 CSS 样式：

```tsx
// 在您的 main.tsx 或 App.tsx 中
import 'sroof-ui/dist/index.css'
```

## TypeScript 配置

如果您使用 TypeScript，Sroof UI 已经包含了类型定义文件，无需额外配置。但是，请确保您的 `tsconfig.json` 包含以下配置：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## 按需导入

为了减少打包体积，您可以只导入需要的组件：

```tsx
// 推荐：按需导入
import { Button, Input } from 'sroof-ui'

// 不推荐：全量导入
import * as SroofUI from 'sroof-ui'
```

## 验证安装

创建一个简单的组件来验证安装是否成功：

```tsx
import React from 'react'
import { Button } from 'sroof-ui'
import 'sroof-ui/dist/index.css'

function TestComponent() {
  return (
    <div>
      <h1>Sroof UI 安装成功！</h1>
      <Button type="primary">
        测试按钮
      </Button>
    </div>
  )
}

export default TestComponent
```

如果您能看到按钮正常显示，说明安装成功！

## 常见问题

### 样式不生效

确保您已经导入了 CSS 文件：

```tsx
import 'sroof-ui/dist/index.css'
```

### TypeScript 类型错误

如果遇到类型错误，请检查：

1. React 版本是否为 18.0 或更高
2. TypeScript 版本是否为 4.5 或更高
3. 是否正确配置了 `tsconfig.json`

### 打包体积过大

使用按需导入来减少打包体积：

```tsx
// ✅ 正确
import { Button } from 'sroof-ui'

// ❌ 错误
import * as SroofUI from 'sroof-ui'
```

## 下一步

安装完成后，您可以：

- 阅读 [使用方法](/guide/usage) 了解基本用法
- 查看 [组件文档](/components/) 了解所有可用组件
- 参考示例代码开始构建您的应用