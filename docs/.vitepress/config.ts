import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sroof UI',
  description: '现代化的 React UI 组件库，支持 TypeScript',
  base: '/sroof-ui/', // 改为你的仓库名
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
            { text: '使用', link: '/guide/usage' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: '按钮 Button', link: '/components/button' },
            { text: '输入框 Input', link: '/components/input' },
            { text: '菜单 Menu', link: '/components/menu' },
            { text: '单选框 Radio', link: '/components/radio' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/sroof-ui' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Sroof UI'
    }
  }
})
