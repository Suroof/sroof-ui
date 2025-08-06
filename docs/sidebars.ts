import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
        'components/progress',
        'components/switch',
        'components/emergetext',
        'components/float',
        'components/line',
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
