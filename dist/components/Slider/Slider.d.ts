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
    step?: number | null;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否为范围选择器 */
    range?: boolean;
    /** 是否垂直方向 */
    vertical?: boolean;
    /** 是否包含关系 */
    included?: boolean;
    /** 是否显示工具提示 */
    tooltip?: {
        /** 是否显示 */
        open?: boolean;
        /** 格式化函数 */
        formatter?: (value?: number) => React.ReactNode;
        /** 位置 */
        placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    };
    /** 刻度标记 */
    marks?: SliderMarks;
    /** 是否只能拖拽到刻度上 */
    dots?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 值变化时的回调 */
    onChange?: (value: number | [number, number]) => void;
    /** 拖拽开始时的回调 */
    onAfterChange?: (value: number | [number, number]) => void;
    /** 拖拽时的回调 */
    onChangeComplete?: (value: number | [number, number]) => void;
    /** 自动获取焦点 */
    autoFocus?: boolean;
    /** 反向坐标轴 */
    reverse?: boolean;
}
declare const Slider: React.FC<SliderProps>;
export { Slider };
//# sourceMappingURL=Slider.d.ts.map