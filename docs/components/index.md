# 组件

Sroof UI 提供了一套全面的 React 组件，使用 TypeScript 构建，专为现代 Web 应用程序设计。

## 概览

所有组件都具备以下特性：

- **TypeScript 优先**：完全的类型安全支持
- **无障碍访问**：遵循 WCAG 指南
- **可定制性**：灵活的主题和样式选项
- **Tree Shakable**：仅导入您需要的组件
- **响应式**：移动优先的设计方法

## 快速开始

```tsx
import { Button, Input, Menu } from 'sroof-ui'
import 'sroof-ui/dist/index.css'

function App() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Input placeholder="请输入内容" />
      <Menu>
        <Menu.Item>菜单项 1</Menu.Item>
        <Menu.Item>菜单项 2</Menu.Item>
      </Menu>
    </div>
  )
}
```

## 组件分类

### 基础组件

这些是构建用户界面的基础组件：

- **[按钮 Button](/components/button)** - 触发操作的交互元素
- **[输入框 Input](/components/input)** - 用户输入文本的表单控件

### 导航组件

帮助用户在应用中导航的组件：

- **[菜单 Menu](/components/menu)** - 导航菜单和操作列表
- **[标签页 Tabs](/components/tabs)** - 在多个面板之间切换

### 表单控件

用于构建表单的专用组件：

- **[单选框 Radio](/components/radio)** - 从多个选项中选择一个
- **[开关 Switch](/components/switch)** - 开启或关闭状态的切换
- **[表单 Form](/components/form)** - 表单容器和验证

### 工具组件

提供特定功能的实用组件：

- **[语言切换器 Language Switcher](/components/language-switcher)** - 多语言切换功能

## 组件状态

| 组件 | 状态 | 描述 |
|------|------|------|
| Button | ✅ 稳定 | 生产就绪 |
| Input | ✅ 稳定 | 生产就绪 |
| Menu | ✅ 稳定 | 生产就绪 |
| Tabs | ✅ 稳定 | 生产就绪 |
| Radio | ✅ 稳定 | 生产就绪 |
| Switch | ✅ 稳定 | 生产就绪 |
| Form | ✅ 稳定 | 生产就绪 |
| Language Switcher | ✅ 稳定 | 生产就绪 |

## 设计原则

### 一致性
所有组件遵循统一的设计语言和交互模式，确保用户体验的一致性。

### 可访问性
每个组件都经过无障碍访问测试，支持键盘导航、屏幕阅读器和其他辅助技术。

### 性能
组件经过优化，支持按需加载和 Tree Shaking，最小化打包体积。

### 可定制性
通过 CSS 变量和主题系统，您可以轻松定制组件的外观以匹配您的品牌。

## 常见属性

大多数组件都支持以下通用属性：

### 基础属性

```tsx
interface BaseProps {
  className?: string        // 自定义 CSS 类名
  style?: CSSProperties    // 内联样式
  id?: string             // 元素 ID
  testId?: string         // 测试 ID
}
```

### 尺寸属性

```tsx
type Size = 'small' | 'medium' | 'large'

interface SizeProps {
  size?: Size | ResponsiveSize
}
```

### 状态属性

```tsx
interface StateProps {
  disabled?: boolean      // 是否禁用
  loading?: boolean       // 是否加载中
  error?: boolean         // 是否错误状态
}
```

## TypeScript 支持

所有组件都提供完整的 TypeScript 类型定义：

```tsx
import { ButtonProps, InputProps } from 'sroof-ui'

// 扩展组件属性
interface CustomButtonProps extends ButtonProps {
  customProp?: string
}

function CustomButton(props: CustomButtonProps) {
  // 完整的类型安全支持
}
```

## 主题定制

### CSS 变量

```css
:root {
  /* 主色调 */
  --sroof-primary: #1890ff;
  --sroof-primary-hover: #40a9ff;
  
  /* 尺寸 */
  --sroof-border-radius: 6px;
  --sroof-font-size: 14px;
  
  /* 间距 */
  --sroof-spacing-xs: 4px;
  --sroof-spacing-sm: 8px;
  --sroof-spacing-md: 16px;
  --sroof-spacing-lg: 24px;
}
```

### 暗色主题

```css
[data-theme='dark'] {
  --sroof-bg-primary: #141414;
  --sroof-text-primary: #ffffff;
  --sroof-border-color: #434343;
}
```

## 浏览器支持

Sroof UI 支持所有现代浏览器：

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 获取帮助

如果您在使用组件时遇到问题：

1. 查看具体组件的文档页面
2. 检查 [常见问题](/faq)
3. 在 [GitHub](https://github.com/Suroof/sroof-ui) 上提交 Issue
4. 参与 [讨论区](https://github.com/Suroof/sroof-ui/discussions)

## 贡献

我们欢迎社区贡献！请查看 [贡献指南](/contributing) 了解如何参与项目开发。