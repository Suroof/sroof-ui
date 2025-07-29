import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // 手动定义侧边栏结构
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '基础组件',
      items: [
        'components/button',
        'components/input',
        'components/card',
        'components/drawer',
        'components/notification',
        'components/carousel',
        'components/collapse',
        'components/scrollcard',
        'components/scrollreveal',
      ],
    },
    {
      type: 'category',
      label: '导航组件',
      items: [
        'components/menu',
        'components/tabs',
        'components/pagination',
      ],
    },
    {
      type: 'category',
      label: '表单组件',
      items: [
        'components/form',
        'components/radio',
      ],
    },
    {
      type: 'category',
      label: '功能组件',
      items: [
        'components/language',
      ],
    },
  ],
};

export default sidebars;
