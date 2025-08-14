import React from 'react';
export interface StepItem {
    /** 标题 */
    title: React.ReactNode;
    /** 子标题 */
    subTitle?: React.ReactNode;
    /** 描述 */
    description?: React.ReactNode;
    /** 图标 */
    icon?: React.ReactNode;
    /** 状态 */
    status?: 'wait' | 'process' | 'finish' | 'error';
    /** 是否禁用 */
    disabled?: boolean;
}
export interface StepsProps {
    /** 当前步骤 */
    current?: number;
    /** 指定当前步骤的状态 */
    status?: 'wait' | 'process' | 'finish' | 'error';
    /** 步骤条方向 */
    direction?: 'horizontal' | 'vertical';
    /** 步骤条类型 */
    type?: 'default' | 'navigation';
    /** 尺寸 */
    size?: 'default' | 'small';
    /** 步骤数据 */
    items?: StepItem[];
    /** 点击步骤时的回调 */
    onChange?: (current: number) => void;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 子元素（可以直接传入 Steps.Step） */
    children?: React.ReactNode;
    /** 标签放置位置 */
    labelPlacement?: 'horizontal' | 'vertical';
    /** 是否显示进度点 */
    progressDot?: boolean | ((iconDot: React.ReactNode, { index, status, title, description }: {
        index: number;
        status: string;
        title: React.ReactNode;
        description?: React.ReactNode;
    }) => React.ReactNode);
    /** 起始序号，从 0 开始记数 */
    initial?: number;
}
export interface StepProps {
    /** 标题 */
    title?: React.ReactNode;
    /** 子标题 */
    subTitle?: React.ReactNode;
    /** 描述 */
    description?: React.ReactNode;
    /** 图标 */
    icon?: React.ReactNode;
    /** 状态 */
    status?: 'wait' | 'process' | 'finish' | 'error';
    /** 是否禁用 */
    disabled?: boolean;
}
declare const Step: React.FC<StepProps>;
declare const Steps: React.FC<StepsProps> & {
    Step: typeof Step;
};
export { Step, Steps };
export default Steps;
//# sourceMappingURL=Steps.d.ts.map