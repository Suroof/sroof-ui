// 主入口文件 - 导出所有组件
export { default as Alert } from './components/Alert';
export { default as Avatar } from './components/Avatar';
export { default as Badge } from './components/Badge';
export { default as Breadcrumb } from './components/Breadcrumb';
export { default as Button } from './components/Button';
export { default as Card } from './components/Card';
export { default as Carousel } from './components/Carousel';
export { default as Collapse } from './components/Collapse';
export { default as Drawer } from './components/Drawer';
export { default as EmergeText } from './components/EmergeText';
export { default as Float } from './components/Float';
export { default as Form } from './components/Form';
export { default as Input } from './components/Input';
export { default as LanguageSwitcher } from './components/LanguageSwitcher';
export { default as LineMotion } from './components/LineMotion';
export { default as Menu } from './components/Menu';
export { default as Modal } from './components/Modal';
export { default as Notification } from './components/Notification';
export { default as Pagination } from './components/Pagination';
export { default as Progress } from './components/Progress';
export { default as ProgressThreeD } from './components/ProgressThreeD';
export { default as Radio } from './components/Radio';
export { default as Rate } from './components/Rate';
export { default as ScrollCard } from './components/ScrollCard';
export { default as ScrollReveal } from './components/ScrollReveal';
export { default as Skeleton } from './components/Skeleton';
export { default as Slider } from './components/Slider';
export { default as Steps } from './components/Steps';
export { default as Switch } from './components/Switch';
export { default as Tabs } from './components/Tabs';
export { default as Upload } from './components/Upload';

// 导出类型定义
export type { AlertProps } from './components/Alert';
export type { AvatarProps } from './components/Avatar';
export type { BadgeProps } from './components/Badge';
export type { BreadcrumbProps } from './components/Breadcrumb';
export type { ButtonProps } from './components/Button';
export type { CardProps } from './components/Card';
export type { CarouselProps } from './components/Carousel';
export type { CollapseProps } from './components/Collapse';
export type { DrawerProps } from './components/Drawer';
export type { EmergeTextProps } from './components/EmergeText';
export type { FloatProps } from './components/Float';
export type { FormProps } from './components/Form';
export type { InputProps } from './components/Input';
export type { LanguageSwitcherProps } from './components/LanguageSwitcher';
export type { LineMotionProps } from './components/LineMotion';
export type { MenuProps } from './components/Menu';
export type { ModalProps } from './components/Modal';
export type { NotificationProps } from './components/Notification';
export type { PaginationProps } from './components/Pagination';
export type { ProgressProps } from './components/Progress';
export type { ProgressThreeDProps } from './components/ProgressThreeD';
export type { RadioProps } from './components/Radio';
export type { RateProps } from './components/Rate';
export type { ScrollCardProps } from './components/ScrollCard';
export type { ScrollRevealProps } from './components/ScrollReveal';
export type { SkeletonProps } from './components/Skeleton';
export type { SliderProps, SliderMarks } from './components/Slider';
export type { StepsProps } from './components/Steps';
export type { SwitchProps } from './components/Switch';
export type { TabsProps } from './components/Tabs';
export type { UploadProps } from './components/Upload';

// 导出国际化相关
export * from './i18n';

// 导出样式 tokens
export * from './styles/tokens';

// 导入样式文件
import './index.css';

// 版本信息
export const version = '1.0.0';