import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sroof UI',
  description: 'A modern React UI component library with TypeScript support',
  base: '/sroof-ui/',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Guide', link: '/guide/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Usage', link: '/guide/usage' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Basic Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' }
          ]
        },
        {
          text: 'Navigation',
          items: [
            { text: 'Menu', link: '/components/menu' },
            { text: 'Tabs', link: '/components/tabs' }
          ]
        },
        {
          text: 'Form Controls',
          items: [
            { text: 'Radio', link: '/components/radio' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Form', link: '/components/form' }
          ]
        },
        {
          text: 'Utilities',
          items: [
            { text: 'Language Switcher', link: '/components/language-switcher' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Suroof/sroof-ui' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Suroof'
    }
  }
})