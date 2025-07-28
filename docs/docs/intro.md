---
sidebar_position: 1
---

import { Button } from 'sroof-ui';
import { Input } from 'sroof-ui';
import { LanguageSwitcher } from 'sroof-ui';
import { Tabs as SroofTabs, Tab } from 'sroof-ui';
import { Radio } from 'sroof-ui';
import { Switch } from 'sroof-ui';
import { Drawer } from 'sroof-ui';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import React from 'react';

# Sroof UI

欢迎使用 **Sroof UI** - 现代化的 React UI 组件库，为开发者提供高质量、易用的 UI 组件。

## 🎮 组件预览

Get In！

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', margin: '2rem 0'}}>

<div style={{padding: '1.5rem', border: '1px solid #e1e5e9', borderRadius: '12px', background: '#fff'}}>
  <h4 style={{margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
    按钮组件
  </h4>
  
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
    <Button variant="primary">主要按钮</Button>
    <Button variant="secondary">信息按钮</Button>
    <Button variant="outline">边框按钮</Button>
    <Button variant="danger">危险按钮</Button>
    <Button size="small">小按钮</Button>
    <Button size="large">大按钮</Button> 
  </div>

</div>

<div style={{padding: '1.5rem', border: '1px solid #e1e5e9', borderRadius: '12px', background: '#fff'}}>
  <h4 style={{margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
    语言切换器
  </h4>
  
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
    <div>
      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>下拉选择器</p>
      <LanguageSwitcher variant="dropdown" />
    </div>
    <div>
      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>按钮组</p>
      <LanguageSwitcher variant="buttons" />
    </div>
  </div>

</div>

<div style={{padding: '1.5rem', border: '1px solid #e1e5e9', borderRadius: '12px', background: '#fff'}}>
  <h4 style={{margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
    输入框组件
  </h4>
  
  <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', maxWidth: '300px', marginBottom: '1rem' }}>
    <Input placeholder="小尺寸输入框" size="small" />
    <Input placeholder="中等尺寸输入框" size="medium" />
    <Input placeholder="大尺寸输入框" size="large" />
    <Input placeholder="禁用状态" disabled size="medium" />
  </div>

</div>

<div style={{padding: '1.5rem', border: '1px solid #e1e5e9', borderRadius: '12px', background: '#fff'}}>
  <h4 style={{margin: '0 0 1rem 0', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
     抽屉组件
  </h4>
   <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    {(() => {
      const [placement, setPlacement] = React.useState('right');
      const [open, setOpen] = React.useState(false);
       const showDrawer = (direction) => {
    setPlacement(direction);
    setOpen(true);
  };
      return (
        <>
      <Button onClick={() => showDrawer('left')}>左侧抽屉</Button>
      <Button onClick={() => showDrawer('right')}>右侧抽屉</Button>
      <Button onClick={() => showDrawer('top')}>顶部抽屉</Button>
      <Button onClick={() => showDrawer('bottom')}>底部抽屉</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${placement === 'left' ? '左侧' : placement === 'right' ? '右侧' : placement === 'top' ? '顶部' : '底部'}抽屉`}
        placement={placement}
      >
        <div style={{ padding: '20px 0' }}>
          <p>这是从{placement === 'left' ? '左侧' : placement === 'right' ? '右侧' : placement === 'top' ? '顶部' : '底部'}滑出的抽屉。</p>
        </div>
      </Drawer>
        </>
      );
    })()}
  </div>

</div>

</div>

## 快速开始

### 📦 安装

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install sroof-ui
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add sroof-ui
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add sroof-ui
```

  </TabItem>
</Tabs>

### 💡 基本使用

```jsx title="App.jsx"
import React from "react";
import {
  Button,
  LanguageSwitcher,
  Input,
  Tabs as SroofTabs,
  Tab,
} from "sroof-ui";
import "sroof-ui/dist/index.css";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <LanguageSwitcher variant="buttons" />

      <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
        <Button variant="primary">主要按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="outline">边框按钮</Button>
      </div>

      <div style={{ marginTop: "20px", maxWidth: "300px" }}>
        <Input placeholder="请输入内容" />
      </div>

      <div style={{ marginTop: "20px" }}>
        <SroofTabs defaultValue="home">
          <Tab value="home" label="首页">
            首页内容
          </Tab>
          <Tab value="about" label="关于">
            关于内容
          </Tab>
        </SroofTabs>
      </div>
    </div>
  );
}

export default App;
```

## 📚 组件总览

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', margin: '2rem 0'}}>

### 🧩 基础组件

- [**Button 按钮**](/docs/components/button) - 多种样式的按钮组件
- [**Input 输入框**](/docs/components/input) - 表单输入组件
- [**Card 卡片**](/docs/components/card) - 内容容器组件
- [**Carousel 轮播图**](/docs/components/carousel) - 数据展示组件
- [**Collapse 折叠面板**](/docs/components/collapse) - 内容容器组件
- [**Notification 通知**](/docs/components/notification) - 弹窗组件
- [**ScrollCard 滑动卡片**](/docs/components/scrollcard) - 数据展示组件

### 🧭 导航组件

- [**Menu 菜单**](/docs/components/menu) - 导航菜单组件
- [**Tabs 标签页**](/docs/components/tabs) - 标签页切换组件
- [**Drawer 抽屉**](/docs/components/drawer) - 侧边抽屉组件
- [**Pagination 分页**](/docs/components/pagination) - 分页导航组件

### 📝 表单组件

- [**Form 表单**](/docs/components/form) - 表单容器组件
- [**Radio 单选框**](/docs/components/radio) - 单选按钮组件
- [**Switch 开关**](/docs/components/switch) - 开关切换组件

### 🔧 功能组件

- [**LanguageSwitcher 语言切换**](/docs/components/language) - 国际化语言切换器

</div>

## 🎯 设计原则

<div style={{background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0'}}>

### 🎨 **一致性 (Consistency)**

保持组件间的视觉和交互一致性，提供统一的用户体验。

### 🔍 **可访问性 (Accessibility)**

遵循 WCAG 2.1 标准，确保所有用户都能正常使用组件。

### ⚡ **性能优化 (Performance)**

轻量级设计，按需加载，确保应用的高性能表现。

### 🛠️ **开发友好 (Developer Experience)**

简洁的 API 设计，完整的 TypeScript 支持，丰富的文档和示例。

</div>

## 🌟 开发状态

<div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0'}}>
  <span style={{background: '#28a745', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>✅ 稳定版本</span>
  <span style={{background: '#17a2b8', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>🔄 持续更新</span>
  <span style={{background: '#6f42c1', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>📖 完整文档</span>
  <span style={{background: '#fd7e14', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>🧪 测试覆盖</span>
</div>

## 🤝 贡献指南

我们欢迎社区贡献！如果你想为 Sroof UI 做出贡献，请查看我们的 [GitHub 仓库](https://github.com/Suroof/sroof-ui)。

### 📋 贡献方式

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码

## 📞 获取帮助

- 📖 [查看文档](/docs/intro)
- 🐛 [报告问题](https://github.com/Suroof/sroof-ui/issues)
- 💬 [参与讨论](https://github.com/Suroof/sroof-ui/discussions)

---

<div style={{textAlign: 'center', margin: '3rem 0', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white'}}>
  <h2 style={{margin: '0 0 1rem 0'}}>🎉 开始你的 Sroof UI 之旅</h2>
  <p style={{margin: '0 0 1.5rem 0', opacity: 0.9}}>现在就开始使用 Sroof UI，构建出色的用户界面！</p>
  <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
    <a href="/sroof-ui/docs/components/button" style={{background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500'}}>
      查看组件 →
    </a>
    <a href="https://github.com/Suroof/sroof-ui" style={{background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500'}}>
      GitHub →
    </a>
  </div>
</div>
