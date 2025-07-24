import DefaultTheme from 'vitepress/theme'
import './style.css'

const theme = {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 在这里可以注册全局组件或插件
  }
}

export default theme