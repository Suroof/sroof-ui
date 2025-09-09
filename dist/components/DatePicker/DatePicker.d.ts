import React from 'react';
export type DateValue = Date | null;
export type RangeValue = [Date | null, Date | null];
export interface DatePickerProps {
    /** 当前选中的日期（受控） */
    value?: DateValue | RangeValue;
    /** 默认选中的日期（非受控） */
    defaultValue?: DateValue | RangeValue;
    /** 是否为范围选择模式 */
    mode?: 'date' | 'range';
    /** 日期格式 */
    format?: string;
    /** 占位符 */
    placeholder?: string | [string, string];
    /** 尺寸 */
    size?: 'small' | 'middle' | 'large';
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示清除按钮 */
    allowClear?: boolean;
    /** 是否显示今天按钮 */
    showToday?: boolean;
    /** 是否显示时间选择 */
    showTime?: boolean;
    /** 最小可选日期 */
    minDate?: Date;
    /** 最大可选日期 */
    maxDate?: Date;
    /** 禁用日期函数 */
    disabledDate?: (date: Date) => boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 下拉面板类名 */
    popupClassName?: string;
    /** 下拉面板样式 */
    popupStyle?: React.CSSProperties;
    /** 下拉面板的挂载节点 */
    getPopupContainer?: () => HTMLElement;
    /** 日期变化回调 */
    onChange?: (date: DateValue | RangeValue, dateString: string | [string, string]) => void;
    /** 面板打开/关闭回调 */
    onOpenChange?: (open: boolean) => void;
    /** 获得焦点回调 */
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    /** 失去焦点回调 */
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    /** 清除回调 */
    onClear?: () => void;
}
export declare const DatePicker: React.FC<DatePickerProps>;
//# sourceMappingURL=DatePicker.d.ts.map