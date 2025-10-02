import React from 'react';
export interface SliderMarks {
    [key: number]: React.ReactNode | {
        style?: React.CSSProperties;
        label?: React.ReactNode;
    };
}
export interface SliderProps {
    /** 当前值 */
    value?: number | [number, number];
    /** 默认值 */
    defaultValue?: number | [number, number];
    /** 最小值 */
    min?: number;
    /** 最大值 */
    max?: number;
    /** 步长 */
    step?: number;
    /** 是否为范围选择器 */
    range?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否垂直方向 */
    vertical?: boolean;
    /** 是否反向 */
    reverse?: boolean;
    /** 是否显示标记 */
    marks?: SliderMarks;
    /** 是否显示点 */
    dots?: boolean;
    /** 是否显示提示信息 */
    tooltip?: boolean | 'always';
    /** 提示信息格式化函数 */
    tipFormatter?: (value: number) => React.ReactNode;
    /** 是否自动聚焦 */
    autoFocus?: boolean;
    /** 值变化时的回调 */
    onChange?: (value: number | [number, number]) => void;
    /** 拖拽结束后的回调 */
    onAfterChange?: (value: number | [number, number]) => void;
    /** 自定义样式类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}
declare const Slider: React.FC<SliderProps>;
export default Slider;
//# sourceMappingURL=Slider.d.ts.map