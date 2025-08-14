import React from 'react';
export interface ModalProps {
    /** 是否显示模态框 */
    open: boolean;
    /** 关闭模态框的回调 */
    onClose: () => void;
    /** 模态框标题 */
    title?: string;
    /** 模态框内容 */
    children: React.ReactNode;
    /** 模态框宽度 */
    width?: string | number;
    /** 是否显示关闭按钮 */
    closable?: boolean;
    /** 是否点击遮罩层关闭 */
    maskClosable?: boolean;
    /** 是否显示遮罩层 */
    mask?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 底部操作区域 */
    footer?: React.ReactNode;
    /** 是否居中显示 */
    centered?: boolean;
    /** 层级 */
    zIndex?: number;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map