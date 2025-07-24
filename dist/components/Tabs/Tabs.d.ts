import React from "react";
/**
 * Tab 组件的属性接口
 */
export interface TabProps {
    /** 标签页的唯一标识符 */
    key: string;
    /** 标签页显示的标签文本或元素 */
    label: React.ReactNode;
    /** 标签页的内容 */
    children: React.ReactNode;
}
/**
 * Tabs 组件的属性接口
 */
export interface TabsProps {
    /** 当前激活的标签页 key（受控模式） */
    activeKey?: string;
    /** Tab 子组件 */
    children: React.ReactNode;
    /** 标签页是否居中显示 */
    centered?: boolean;
    /** 自定义样式类名 */
    className?: string;
    /** 默认激活的标签页 key（非受控模式） */
    defaultActiveKey?: string;
    /** 标签页切换时的回调函数 */
    onChange?: (key: string) => void;
}
/**
 * Tab 组件 - 单个标签页
 * @param children 标签页内容
 */
export declare const Tab: React.FC<TabProps>;
/**
 * Tabs 组件 - 标签页容器
 * 支持受控和非受控两种模式
 */
export declare const Tabs: React.FC<TabsProps>;
//# sourceMappingURL=Tabs.d.ts.map