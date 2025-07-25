# 使用方法

本指南将详细介绍如何在项目中使用 Sroof UI 组件库。

## 基本用法

### 导入组件

```tsx
import React from 'react'
import { Button, Input, Card } from 'sroof-ui'
import 'sroof-ui/dist/index.css'

function MyComponent() {
  return (
    <Card>
      <Input placeholder="请输入内容" />
      <Button type="primary">提交</Button>
    </Card>
  )
}
```

### 组件属性

每个组件都有详细的 TypeScript 类型定义，您可以通过 IDE 的智能提示查看可用属性：

```tsx
<Button
  type="primary"        // 按钮类型
  size="large"          // 按钮大小
  disabled={false}      // 是否禁用
  loading={false}       // 是否显示加载状态
  onClick={handleClick} // 点击事件处理
>
  点击我
</Button>
```

## 主题定制

### CSS 变量

Sroof UI 使用 CSS 变量来管理主题，您可以通过覆盖这些变量来定制外观：

```css
:root {
  /* 主色调 */
  --sroof-primary-color: #1890ff;
  --sroof-primary-hover: #40a9ff;
  --sroof-primary-active: #096dd9;
  
  /* 成功色 */
  --sroof-success-color: #52c41a;
  
  /* 警告色 */
  --sroof-warning-color: #faad14;
  
  /* 错误色 */
  --sroof-error-color: #ff4d4f;
  
  /* 文字颜色 */
  --sroof-text-color: #000000d9;
  --sroof-text-color-secondary: #00000073;
  
  /* 边框颜色 */
  --sroof-border-color: #d9d9d9;
  
  /* 背景颜色 */
  --sroof-background-color: #ffffff;
}
```

### 暗色主题

```css
[data-theme='dark'] {
  --sroof-text-color: #ffffffd9;
  --sroof-text-color-secondary: #ffffff73;
  --sroof-border-color: #434343;
  --sroof-background-color: #141414;
}
```

## 国际化支持

Sroof UI 内置了国际化支持，您可以通过 `LanguageSwitcher` 组件来切换语言：

```tsx
import { LanguageSwitcher } from 'sroof-ui'

function App() {
  return (
    <div>
      <LanguageSwitcher />
      {/* 其他组件 */}
    </div>
  )
}
```

### 自定义语言包

```tsx
import { ConfigProvider } from 'sroof-ui'

const customLocale = {
  common: {
    confirm: '确认',
    cancel: '取消',
    loading: '加载中...',
  },
  // 更多翻译...
}

function App() {
  return (
    <ConfigProvider locale={customLocale}>
      {/* 您的应用 */}
    </ConfigProvider>
  )
}
```

## 表单处理

### 基本表单

```tsx
import { Form, Input, Button } from 'sroof-ui'

function LoginForm() {
  const handleSubmit = (values: any) => {
    console.log('表单数据:', values)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item name="username" label="用户名" required>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      
      <Form.Item name="password" label="密码" required>
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
```

### 表单验证

```tsx
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名至少3个字符' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少6个字符' }
  ]
}

<Form rules={rules} onSubmit={handleSubmit}>
  {/* 表单项 */}
</Form>
```

## 响应式设计

### 断点系统

Sroof UI 使用以下断点：

```css
/* 超小屏幕 */
@media (max-width: 575px) { /* xs */ }

/* 小屏幕 */
@media (min-width: 576px) { /* sm */ }

/* 中等屏幕 */
@media (min-width: 768px) { /* md */ }

/* 大屏幕 */
@media (min-width: 992px) { /* lg */ }

/* 超大屏幕 */
@media (min-width: 1200px) { /* xl */ }
```

### 响应式属性

某些组件支持响应式属性：

```tsx
<Button 
  size={{
    xs: 'small',
    sm: 'medium',
    md: 'large'
  }}
>
  响应式按钮
</Button>
```

## 性能优化

### 按需加载

```tsx
// 推荐：按需导入
import { Button } from 'sroof-ui'

// 或者使用动态导入
const Button = React.lazy(() => 
  import('sroof-ui').then(module => ({ default: module.Button }))
)
```

### 虚拟滚动

对于大量数据的列表，使用虚拟滚动：

```tsx
import { VirtualList } from 'sroof-ui'

<VirtualList
  data={largeDataSet}
  itemHeight={50}
  renderItem={({ item, index }) => (
    <div key={index}>{item.name}</div>
  )}
/>
```

## 最佳实践

### 1. 组件组合

```tsx
// ✅ 好的做法
function UserCard({ user }) {
  return (
    <Card>
      <Card.Header>
        <Avatar src={user.avatar} />
        <Text>{user.name}</Text>
      </Card.Header>
      <Card.Body>
        <Text type="secondary">{user.email}</Text>
      </Card.Body>
    </Card>
  )
}
```

### 2. 事件处理

```tsx
// ✅ 使用 useCallback 优化性能
const handleClick = useCallback((event) => {
  // 处理点击事件
}, [dependency])

<Button onClick={handleClick}>
  点击我
</Button>
```

### 3. 状态管理

```tsx
// ✅ 合理使用状态
function SearchInput() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async () => {
    setLoading(true)
    try {
      await searchAPI(value)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Input
      value={value}
      onChange={setValue}
      suffix={
        <Button 
          type="primary" 
          loading={loading}
          onClick={handleSearch}
        >
          搜索
        </Button>
      }
    />
  )
}
```

## 常见问题

### Q: 如何自定义组件样式？

A: 您可以通过以下方式自定义样式：

1. 使用 CSS 变量
2. 覆盖 CSS 类名
3. 使用 `className` 属性
4. 使用 `style` 属性

### Q: 组件不响应点击事件？

A: 检查以下几点：

1. 是否正确绑定了事件处理函数
2. 组件是否被禁用
3. 是否有其他元素遮挡

### Q: 如何处理表单验证？

A: 使用 `Form` 组件的内置验证功能，或者集成第三方验证库如 `yup` 或 `joi`。

## 下一步

- 查看 [组件文档](/components/) 了解所有可用组件
- 参考组件文档了解设计原则
- 查看 [示例代码](https://github.com/Suroof/sroof-ui/tree/main/examples) 获取更多灵感