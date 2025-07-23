import styles from "./Tabs.module.css";
import React, { useState, useEffect } from "react";

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
export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

/**
 * Tabs 组件 - 标签页容器
 * 支持受控和非受控两种模式
 */
export const Tabs: React.FC<TabsProps> = ({
  activeKey,
  children,
  className,
  defaultActiveKey,
  onChange,
}) => {
  // 将 children 转换为数组，并保持原始的 key
  const tabs = React.Children.map(children, (child) => {
    if (React.isValidElement<TabProps>(child)) {
      return child;
    }
    return null;
  })?.filter(Boolean) as React.ReactElement<TabProps>[];

  // 获取第一个标签的 key 作为默认值
  const firstTabKey = tabs[0]?.key || "";
  
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    activeKey || defaultActiveKey || firstTabKey
  );

  // 同步外部 activeKey 和内部状态
  useEffect(() => {
    if (activeKey !== undefined && activeKey !== internalActiveKey) {
      setInternalActiveKey(activeKey);
    }
  }, [activeKey, internalActiveKey]);

  const handleTabClick = (key: string) => {
    // 如果是非受控模式，更新内部状态
    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }

    if (onChange) {
      onChange(key);
    }
  };

  const currentActiveKey = activeKey ?? internalActiveKey;
  const activeTab = tabs.find((tab) => tab.key === currentActiveKey);

  return (
    <div className={`${styles['tabs-container']} ${className || ""}`}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${styles.tab} ${
              tab.key === currentActiveKey ? styles.active : ""
            }`}
            onClick={() => handleTabClick(tab.key as string)}
          >
            {tab.props.label}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        {activeTab && activeTab.props.children}
      </div>
    </div>
  );
};