import React from 'react';
export interface StepItem {
    /** 步骤标题 */
    title: string;
    /** 步骤描述 */
    description?: string;
    /** 自定义图标 */
    icon?: React.ReactNode;
    /** 是否禁用 */
    disabled?: boolean;
    /** 子标题 */
    subTitle?: React.ReactNode;
    /** 自定义状态 */
    status?: 'wait' | 'process' | 'finish' | 'error';
}
export interface StepsProps {
    /** 当前步骤，从 0 开始计数 */
    current?: number;
    /** 起始序号，从 0 开始计数 */
    initial?: number;
    /** 指定步骤条方向 */
    direction?: 'horizontal' | 'vertical';
    /** 指定标签放置位置 */
    labelPlacement?: 'horizontal' | 'vertical';
    /** 指定大小 */
    size?: 'default' | 'small';
    /** 指定当前步骤的状态 */
    status?: 'wait' | 'process' | 'finish' | 'error';
    /** 当前 process 步骤显示的进度条进度 */
    percent?: number;
    /** 点状步骤条 */
    progressDot?: boolean | ((iconDot: React.ReactNode, options: {
        index: number;
        status: string;
        title: string;
        description?: string;
    }) => React.ReactNode);
    /** 当屏幕宽度小于 532px 时自动变为垂直模式 */
    responsive?: boolean;
    /** 步骤条类型 */
    type?: 'default' | 'navigation';
    /** 配置选项卡内容 */
    items: StepItem[];
    /** 点击切换步骤时触发 */
    onChange?: (current: number) => void;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
declare const Steps: React.FC<StepsProps>;
export default Steps;
//# sourceMappingURL=Steps.d.ts.map