import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sroof UI',
  description: '现代化的 React UI 组件库，支持 TypeScript',
  base: '/sroof-ui/',
  lang: 'zh-CN',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '指南', link: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '使用方法', link: '/guide/usage' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: '按钮 Button', link: '/components/button' },
            { text: '输入框 Input', link: '/components/input' }
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: '菜单 Menu', link: '/components/menu' },
            { text: '标签页 Tabs', link: '/components/tabs' }
          ]
        },
        {
          text: '表单控件',
          items: [
            { text: '单选框 Radio', link: '/components/radio' },
            { text: '开关 Switch', link: '/components/switch' },
            { text: '表单 Form', link: '/components/form' }
          ]
        },
        {
          text: '工具组件',
          items: [
            { text: '语言切换器', link: '/components/language-switcher' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Suroof/sroof-ui' }
    ],
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2024 Suroof'
    }
  }
})