import type { Preview } from '@storybook/react-webpack5'
import '../src/styles/variables.css'
import '../src/i18n/i18n' // 初始化国际化

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;