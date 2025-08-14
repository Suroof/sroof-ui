import React from 'react';
export interface AlertProps {
    /** 警告提示内容 */
    message?: React.ReactNode;
    /** 警告提示的辅助性文字介绍 */
    description?: React.ReactNode;
    /** 指定警告提示的样式 */
    type?: 'success' | 'info' | 'warning' | 'error';
    /** 默认不显示关闭按钮 */
    closable?: boolean;
    /** 关闭时触发的回调函数 */
    onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /** 自定义关闭按钮 */
    closeText?: React.ReactNode;
    /** 相关操作 */
    action?: React.ReactNode;
    /** 辅助图标 */
    icon?: React.ReactNode;
    /** 是否显示辅助图标 */
    showIcon?: boolean;
    /** 是否用作顶部公告 */
    banner?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 动画结束后触发的回调函数 */
    afterClose?: () => void;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
//# sourceMappingURL=Alert.d.ts.map