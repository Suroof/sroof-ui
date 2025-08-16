import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '基础组件',
      items: [
        'components/button',
        'components/card',
        'components/avatar',
        'components/badge',
      ],
    },
    {
      type: 'category',
      label: '布局组件',
      items: [
        'components/drawer',
        'components/modal',
        'components/collapse',
        'components/float',
      ],
    },
    {
      type: 'category',
      label: '导航组件',
      items: [
        'components/menu',
        'components/tabs',
        'components/breadcrumb',
        'components/pagination',
      ],
    },
    {
      type: 'category',
      label: '表单组件',
      items: [
        'components/form',
        'components/input',
        'components/radio',
        'components/switch',
        'components/slider',
        'components/rate',
        'components/upload',
      ],
    },
    {
      type: 'category',
      label: '反馈组件',
      items: [
        'components/alert',
        'components/notification',
        'components/progress',
        'components/progressthreeD',
        'components/skeleton',
      ],
    },
    {
      type: 'category',
      label: '展示组件',
      items: [
        'components/carousel',
        'components/scrollcard',
        'components/steps',
      ],
    },
    {
      type: 'category',
      label: '动效组件',
      items: [
        'components/emergetext',
        'components/scrollreveal',
        'components/lineMotion',
        'components/line',
      ],
    },
    {
      type: 'category',
      label: '功能组件',
      items: [
        'components/language',
        'components/languageSwitcher',
      ],
    },
  ],
};

export default sidebars;
