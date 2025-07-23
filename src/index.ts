// 导出所有组件
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { LanguageSwitcher } from './components/LanguageSwitcher';

// 导出默认组件（使用不同的别名）
export { default as ButtonDefault } from './components/Button';
export { default as InputDefault } from './components/Input';
export { default as LanguageSwitcherDefault } from './components/LanguageSwitcher';

// 导出国际化相关
export * from './i18n';

// 导出样式tokens
export * from './styles/tokens';