import React, { useState, createContext, useContext, ReactNode, FC, useRef } from 'react';
import styles from './Collapse.module.scss';
import { CSSTransition } from 'react-transition-group';

export interface CollapsePanelProps {
  panelKey: string; // 面板的唯一标识符
  header: ReactNode;
  disabled?: boolean;
  children: ReactNode;
}

export interface CollapseProps {
  accordion?: boolean;
  defaultActiveKey?: string | string[];
  children: React.ReactElement<CollapsePanelProps> | React.ReactElement<CollapsePanelProps>[];
}

interface ICollapseContext {
  activeKeys: string[];
  onToggle: (key: string) => void;
}
const CollapseContext = createContext<ICollapseContext | null>(null);

const InternalPanel: FC<CollapsePanelProps> = ({ panelKey, header, disabled, children }) => {
  const context = useContext(CollapseContext);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!context) {
    throw new Error('Collapse.Panel 必须在 Collapse 组件内部使用');
  }

  const { activeKeys, onToggle } = context;
  const isActive = !disabled && activeKeys.includes(panelKey);
  const headerClasses = `${styles.panelHeader} ${disabled ? styles.disabled : ''}`;
  const iconClasses = `${styles.panelIcon} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles.panel}>
      <button className={headerClasses} onClick={() => !disabled && onToggle(panelKey)} aria-expanded={isActive}>
        <span className={styles.headerText}>{header}</span>
        <span className={iconClasses}>
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
          </svg>
        </span>
      </button>
      <CSSTransition
        nodeRef={contentRef}
        in={isActive}
        timeout={300}
        classNames={{
          enter: styles.contentEnter,
          enterActive: styles.contentEnterActive,
          exit: styles.contentExit,
          exitActive: styles.contentExitActive,
        }}
        unmountOnExit
      >
        <div ref={contentRef} className={styles.panelContent}>
          <div className={styles.contentBox}>{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export const Collapse: FC<CollapseProps> & { Panel: FC<CollapsePanelProps> } = ({
  accordion = false,
  defaultActiveKey,
  children,
}: CollapseProps) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(() => {
    if (!defaultActiveKey) return [];
    return Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey];
  });

  const handleToggle = (key: string) => {
    setActiveKeys(prevKeys => {
      if (accordion) {
        return prevKeys.includes(key) ? [] : [key];
      } else {
        return prevKeys.includes(key)
          ? prevKeys.filter(k => k !== key)
          : [...prevKeys, key];
      }
    });
  };

  const contextValue: ICollapseContext = {
    activeKeys,
    onToggle: handleToggle,
  };

  return (
    <div className={styles.collapse}>
      <CollapseContext.Provider value={contextValue}>
        {children}
      </CollapseContext.Provider>
    </div>
  );
};

Collapse.Panel = InternalPanel;