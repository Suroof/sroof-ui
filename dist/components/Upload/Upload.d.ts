import React from 'react';
export interface UploadFile {
    /** 文件唯一标识符 */
    uid: string;
    /** 文件名 */
    name: string;
    /** 文件状态 */
    status?: 'uploading' | 'done' | 'error' | 'removed';
    /** 服务端响应内容 */
    response?: any;
    /** 链接地址 */
    url?: string;
    /** 上传进度 */
    percent?: number;
    /** 原始文件对象 */
    originFileObj?: File;
    /** 错误信息 */
    error?: any;
    /** 缩略图地址 */
    thumbUrl?: string;
    /** 文件大小 */
    size?: number;
    /** 文件类型 */
    type?: string;
}
export interface UploadProps {
    /** 文件列表 */
    fileList?: UploadFile[];
    /** 默认已上传的文件列表 */
    defaultFileList?: UploadFile[];
    /** 上传的地址 */
    action?: string;
    /** 上传所需参数或返回上传参数的方法 */
    data?: Record<string, any> | ((file: UploadFile) => Record<string, any>);
    /** 设置上传的请求头部 */
    headers?: Record<string, string>;
    /** 是否支持多选文件 */
    multiple?: boolean;
    /** 接受上传的文件类型 */
    accept?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 上传列表的内建样式 */
    listType?: 'text' | 'picture' | 'picture-card';
    /** 是否显示上传列表 */
    showUploadList?: boolean | {
        showPreviewIcon?: boolean;
        showRemoveIcon?: boolean;
        showDownloadIcon?: boolean;
    };
    /** 限制上传数量 */
    maxCount?: number;
    /** 是否支持拖拽上传 */
    drag?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 上传文件之前的钩子 */
    beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
    /** 文件状态改变的回调 */
    onChange?: (info: {
        file: UploadFile;
        fileList: UploadFile[];
    }) => void;
    /** 点击文件链接或预览图标时的回调 */
    onPreview?: (file: UploadFile) => void;
    /** 点击移除文件时的回调 */
    onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
    /** 点击下载文件时的回调 */
    onDownload?: (file: UploadFile) => void;
    /** 拖拽文件进入上传区域时的回调 */
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    /** 自定义上传实现 */
    customRequest?: (options: {
        file: File;
        filename: string;
        data?: Record<string, any>;
        headers?: Record<string, string>;
        onProgress: (event: {
            percent: number;
        }) => void;
        onError: (error: Error) => void;
        onSuccess: (response: any) => void;
    }) => void;
    /** 子元素 */
    children?: React.ReactNode;
}
declare const Upload: React.FC<UploadProps>;
export default Upload;
//# sourceMappingURL=Upload.d.ts.map