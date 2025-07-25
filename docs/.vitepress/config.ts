import { defineConfig } from 'vitepress'

export default defineConfig({
  // ... 其他配置
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      // 确保 JSX 语法高亮
      md.use(require('markdown-it-container'), 'jsx')
    }
  }
})