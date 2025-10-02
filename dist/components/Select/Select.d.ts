import React from "react";
export interface SelectOption {
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export interface SelectOptGroup {
    label: React.ReactNode;
    key?: string;
    options: SelectOption[];
    className?: string;
}
export interface SelectProps {
    /** 选项数据或选项组数据 */
    options?: (SelectOption | SelectOptGroup)[];
    /** 当前选中的值（受控） */
    value?: string | number | (string | number)[];
    /** 默认选中的值（非受控） */
    defaultValue?: string | number | (string | number)[];
    /** 是否多选 */
    mode?: "multiple" | "tags" | undefined;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示清除按钮 */
    allowClear?: boolean;
    /** 是否可搜索 */
    showSearch?: boolean;
    /** 搜索时对选项的过滤函数 */
    filterOption?: (input: string, option?: SelectOption) => boolean;
    /** 占位符 */
    placeholder?: string;
    /** 尺寸 */
    size?: "small" | "middle" | "large";
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 下拉菜单类名 */
    dropdownClassName?: string;
    /** 下拉菜单样式 */
    dropdownStyle?: React.CSSProperties;
    /** 下拉菜单的挂载节点 */
    getPopupContainer?: () => HTMLElement;
    /** 最多显示多少个选中项 */
    maxTagCount?: number;
    /** 隐藏超出maxTagCount的选中项时的占位符 */
    maxTagPlaceholder?: React.ReactNode | ((omittedValues: (string | number)[]) => React.ReactNode);
    /** 下拉菜单最大高度 */
    listHeight?: number;
    /** 是否开启虚拟滚动 */
    virtual?: boolean;
    /** 选择时的回调 */
    onChange?: (value: string | number | (string | number)[], option?: SelectOption | SelectOption[]) => void;
    /** 搜索时的回调 */
    onSearch?: (value: string) => void;
    /** 获得焦点时的回调 */
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    /** 失去焦点时的回调 */
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    /** 下拉框显示/隐藏时的回调 */
    onDropdownVisibleChange?: (visible: boolean) => void;
    /** 清除时的回调 */
    onClear?: () => void;
    /** 取消选中时的回调 */
    onDeselect?: (value: string | number, option: SelectOption) => void;
    /** 自定义选中项的渲染 */
    tagRender?: (props: {
        label: React.ReactNode;
        value: string | number;
        disabled: boolean;
        onClose: () => void;
    }) => React.ReactElement;
    /** 自定义下拉选项的渲染 */
    optionRender?: (option: SelectOption, info: {
        index: number;
    }) => React.ReactNode;
    /** 空数据时的显示内容 */
    notFoundContent?: React.ReactNode;
    /** 自定义下拉列表滚动条 */
    dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
}
export declare const Select: React.FC<SelectProps>;
//# sourceMappingURL=Select.d.ts.map