// 导出所有组件
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { LanguageSwitcher } from './components/LanguageSwitcher';
export { Menu, MenuItem, SubMenu, type MenuProps, type MenuItemProps, type SubMenuProps } from './components/Menu';
export { Tabs, Tab, type TabsProps, type TabProps } from './components/Tabs';
export { Radio, type RadioProps } from './components/Radio';
export { Switch, type SwitchProps } from './components/Switch';
export { Form,FormItem,FormActions, type FormProps, type FormItemProps, type FormActionsProps} from './components/Form';
export { Card, type CardProps } from './components/Card';

// 导出默认组件（使用不同的别名）
export { default as ButtonDefault } from './components/Button';
export { default as InputDefault } from './components/Input';
export { default as LanguageSwitcherDefault } from './components/LanguageSwitcher';
// Menu组件没有default导出，只有命名导出
export { default as TabsDefault } from './components/Tabs';
export { default as RadioDefault } from './components/Radio';
export { default as SwitchDefault } from './components/Switch';
export { default as FormDefault } from './components/Form';
export { default as CardDefault } from './components/Card';

// 导出国际化相关
export * from './i18n';

// 导出样式tokens
export * from './styles/tokens';