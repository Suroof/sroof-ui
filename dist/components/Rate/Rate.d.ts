import React from 'react';
export interface RateProps {
    /** 当前数，受控值 */
    value?: number;
    /** 默认值 */
    defaultValue?: number;
    /** star 总数 */
    count?: number;
    /** 是否允许半选 */
    allowHalf?: boolean;
    /** 是否允许再次点击后清除 */
    allowClear?: boolean;
    /** 只读，无法进行交互 */
    disabled?: boolean;
    /** 自定义字符 */
    character?: React.ReactNode | ((props: {
        index: number;
        value: number;
    }) => React.ReactNode);
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 选择时的回调 */
    onChange?: (value: number) => void;
    /** 鼠标经过时数值变化的回调 */
    onHoverChange?: (value: number) => void;
    /** 失去焦点时的回调 */
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /** 获取焦点时的回调 */
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /** 按键回调 */
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    /** 自定义每项的提示信息 */
    tooltips?: string[];
    /** 是否自动获取焦点 */
    autoFocus?: boolean;
    /** 组件大小 */
    size?: 'small' | 'default' | 'large';
}
declare const Rate: React.FC<RateProps>;
export default Rate;
//# sourceMappingURL=Rate.d.ts.map