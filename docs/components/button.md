# 按钮 Button

按钮用于触发操作，是用户界面中最常用的交互元素之一。

## 基本用法

最简单的按钮用法：

```tsx
import { Button } from 'sroof-ui'

function BasicExample() {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
    </div>
  )
}
```

## 按钮类型

按钮有多种类型，适用于不同的场景：

```tsx
function ButtonTypes() {
  return (
    <div className="button-group">
      <Button type="primary">主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="ghost">幽灵按钮</Button>
      <Button type="link">链接按钮</Button>
    </div>
  )
}
```

## 按钮尺寸

按钮提供三种尺寸：

```tsx
function ButtonSizes() {
  return (
    <div className="button-group">
      <Button size="small">小按钮</Button>
      <Button size="medium">中等按钮</Button>
      <Button size="large">大按钮</Button>
    </div>
  )
}
```

## 按钮状态

### 禁用状态

```tsx
function DisabledButtons() {
  return (
    <div className="button-group">
      <Button disabled>禁用按钮</Button>
      <Button type="primary" disabled>禁用主要按钮</Button>
    </div>
  )
}
```

### 加载状态

```tsx
function LoadingButtons() {
  const [loading, setLoading] = useState(false)
  
  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }
  
  return (
    <div className="button-group">
      <Button loading>加载中</Button>
      <Button 
        type="primary" 
        loading={loading}
        onClick={handleClick}
      >
        点击加载
      </Button>
    </div>
  )
}
```

## 图标按钮

按钮可以包含图标：

```tsx
import { Button, Icon } from 'sroof-ui'

function IconButtons() {
  return (
    <div className="button-group">
      <Button icon={<Icon name="search" />}>
        搜索
      </Button>
      <Button 
        type="primary" 
        icon={<Icon name="download" />}
        iconPosition="right"
      >
        下载
      </Button>
      <Button 
        type="ghost" 
        icon={<Icon name="settings" />}
        shape="circle"
      />
    </div>
  )
}
```

## 按钮形状

```tsx
function ButtonShapes() {
  return (
    <div className="button-group">
      <Button shape="default">默认形状</Button>
      <Button shape="round">圆角按钮</Button>
      <Button shape="circle" icon={<Icon name="plus" />} />
    </div>
  )
}
```

## 块级按钮

```tsx
function BlockButtons() {
  return (
    <div>
      <Button type="primary" block>
        块级按钮
      </Button>
      <Button block style={{ marginTop: 8 }}>
        块级按钮
      </Button>
    </div>
  )
}
```

## 按钮组

将多个按钮组合在一起：

```tsx
import { Button } from 'sroof-ui'

function ButtonGroup() {
  return (
    <Button.Group>
      <Button>左侧</Button>
      <Button>中间</Button>
      <Button>右侧</Button>
    </Button.Group>
  )
}
```

## 响应式尺寸

按钮支持响应式尺寸：

```tsx
function ResponsiveButton() {
  return (
    <Button 
      size={{
        xs: 'small',
        sm: 'medium',
        md: 'large'
      }}
    >
      响应式按钮
    </Button>
  )
}
```

## API

### Button Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| type | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'ghost' \| 'link'` | `'secondary'` | 按钮类型 |
| size | `'small' \| 'medium' \| 'large' \| ResponsiveSize` | `'medium'` | 按钮尺寸 |
| shape | `'default' \| 'round' \| 'circle'` | `'default'` | 按钮形状 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否显示加载状态 |
| block | `boolean` | `false` | 是否为块级按钮 |
| icon | `ReactNode` | - | 按钮图标 |
| iconPosition | `'left' \| 'right'` | `'left'` | 图标位置 |
| htmlType | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML 按钮类型 |
| onClick | `(event: MouseEvent) => void` | - | 点击事件处理函数 |
| className | `string` | - | 自定义 CSS 类名 |
| style | `CSSProperties` | - | 内联样式 |
| children | `ReactNode` | - | 按钮内容 |

### Button.Group Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮组尺寸 |
| vertical | `boolean` | `false` | 是否垂直排列 |
| className | `string` | - | 自定义 CSS 类名 |
| children | `ReactNode` | - | 按钮组内容 |

## 样式定制

### CSS 变量

```css
.sroof-button {
  /* 基础样式 */
  --button-height: 32px;
  --button-padding: 0 16px;
  --button-border-radius: 6px;
  --button-font-size: 14px;
  --button-font-weight: 400;
  
  /* 颜色 */
  --button-primary-bg: #1890ff;
  --button-primary-border: #1890ff;
  --button-primary-color: #ffffff;
  
  /* 悬停状态 */
  --button-primary-hover-bg: #40a9ff;
  --button-primary-hover-border: #40a9ff;
  
  /* 激活状态 */
  --button-primary-active-bg: #096dd9;
  --button-primary-active-border: #096dd9;
  
  /* 禁用状态 */
  --button-disabled-bg: #f5f5f5;
  --button-disabled-border: #d9d9d9;
  --button-disabled-color: #00000040;
}
```

### 自定义主题

```css
/* 自定义主要按钮颜色 */
.custom-primary-button {
  --button-primary-bg: #722ed1;
  --button-primary-border: #722ed1;
  --button-primary-hover-bg: #9254de;
  --button-primary-active-bg: #531dab;
}
```

## 无障碍访问

按钮组件遵循 WAI-ARIA 规范：

- 支持键盘导航（Enter 和 Space 键）
- 提供适当的 ARIA 属性
- 支持屏幕阅读器
- 在禁用状态下正确处理焦点

```tsx
// 为屏幕阅读器提供额外信息
<Button 
  aria-label="删除用户账户"
  aria-describedby="delete-warning"
  type="danger"
>
  删除
</Button>
```

## 最佳实践

### 1. 按钮层次

在同一个界面中，建议使用不同类型的按钮来建立视觉层次：

```tsx
// ✅ 好的做法
<div>
  <Button type="primary">保存</Button>
  <Button type="secondary">取消</Button>
</div>

// ❌ 避免多个主要按钮
<div>
  <Button type="primary">保存</Button>
  <Button type="primary">删除</Button>
</div>
```

### 2. 加载状态

对于异步操作，使用加载状态提供用户反馈：

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async () => {
    setLoading(true)
    try {
      await submitForm()
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Button 
      type="primary"
      loading={loading}
      onClick={handleSubmit}
    >
      {loading ? '提交中...' : '提交'}
    </Button>
  )
}
```

### 3. 图标使用

合理使用图标可以提高按钮的可识别性：

```tsx
// ✅ 图标与文字含义一致
<Button icon={<Icon name="download" />}>
  下载
</Button>

// ✅ 纯图标按钮提供 aria-label
<Button 
  icon={<Icon name="close" />}
  shape="circle"
  aria-label="关闭"
/>
```

## 常见问题

### Q: 如何自定义按钮颜色？

A: 使用 CSS 变量或覆盖样式类：

```css
.custom-button {
  --button-primary-bg: #your-color;
}
```

### Q: 按钮点击没有反应？

A: 检查以下几点：
1. 是否设置了 `disabled` 属性
2. 是否正确绑定了 `onClick` 事件
3. 是否有其他元素遮挡了按钮

### Q: 如何实现按钮的防抖？

A: 可以使用自定义 Hook：

```tsx
function useDebounce(callback, delay) {
  const timeoutRef = useRef()
  
  return useCallback((...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])
}

function DebouncedButton() {
  const debouncedClick = useDebounce(() => {
    console.log('按钮被点击')
  }, 300)
  
  return (
    <Button onClick={debouncedClick}>
      防抖按钮
    </Button>
  )
}
```