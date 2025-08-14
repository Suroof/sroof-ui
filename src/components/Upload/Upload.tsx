import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './Upload.module.scss';

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
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void;
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
    onProgress: (event: { percent: number }) => void;
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }) => void;
  /** 子元素 */
  children?: React.ReactNode;
}

const Upload: React.FC<UploadProps> = ({
  fileList: controlledFileList,
  defaultFileList = [],
  action,
  data,
  headers,
  multiple = false,
  accept,
  disabled = false,
  listType = 'text',
  showUploadList = true,
  maxCount,
  drag = false,
  className,
  style,
  beforeUpload,
  onChange,
  onPreview,
  onRemove,
  onDownload,
  onDrop,
  customRequest,
  children,
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  
  const isControlled = controlledFileList !== undefined;
  const fileList = isControlled ? controlledFileList : internalFileList;
  
  // 生成唯一ID
  const generateUID = useCallback(() => {
    return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);
  
  // 更新文件列表
  const updateFileList = useCallback((newFileList: UploadFile[]) => {
    if (!isControlled) {
      setInternalFileList(newFileList);
    }
    onChange?.({ file: newFileList[newFileList.length - 1], fileList: newFileList });
  }, [isControlled, onChange]);
  
  // 处理文件选择
  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || disabled) return;
    
    const fileArray = Array.from(files);
    
    // 检查数量限制
    if (maxCount && fileList.length + fileArray.length > maxCount) {
      console.warn(`Cannot upload more than ${maxCount} files`);
      return;
    }
    
    for (const file of fileArray) {
      // 执行上传前检查
      if (beforeUpload) {
        try {
          const result = await beforeUpload(file, fileArray);
          if (!result) continue;
        } catch (error) {
          console.error('beforeUpload error:', error);
          continue;
        }
      }
      
      const uploadFile: UploadFile = {
        uid: generateUID(),
        name: file.name,
        status: 'uploading',
        percent: 0,
        originFileObj: file,
        size: file.size,
        type: file.type,
      };
      
      const newFileList = [...fileList, uploadFile];
      updateFileList(newFileList);
      
      // 开始上传
      if (customRequest) {
        customRequest({
          file,
          filename: file.name,
          data: typeof data === 'function' ? data(uploadFile) : data,
          headers,
          onProgress: ({ percent }) => {
            const updatedFile = { ...uploadFile, percent, status: 'uploading' as const };
            const updatedList = newFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
            updateFileList(updatedList);
          },
          onSuccess: (response) => {
            const updatedFile = { ...uploadFile, status: 'done' as const, response, percent: 100 };
            const updatedList = newFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
            updateFileList(updatedList);
          },
          onError: (error) => {
            const updatedFile = { ...uploadFile, status: 'error' as const, error };
            const updatedList = newFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
            updateFileList(updatedList);
          },
        });
      } else if (action) {
        // 默认上传实现
        uploadFileToServer(uploadFile, newFileList);
      }
    }
  }, [fileList, disabled, maxCount, beforeUpload, generateUID, updateFileList, customRequest, data, headers, action]);
  
  // 默认上传到服务器
  const uploadFileToServer = useCallback(async (uploadFile: UploadFile, currentFileList: UploadFile[]) => {
    if (!action || !uploadFile.originFileObj) return;
    
    const formData = new FormData();
    formData.append('file', uploadFile.originFileObj);
    
    // 添加额外数据
    if (data) {
      const uploadData = typeof data === 'function' ? data(uploadFile) : data;
      Object.keys(uploadData).forEach(key => {
        formData.append(key, uploadData[key]);
      });
    }
    
    try {
      const xhr = new XMLHttpRequest();
      
      // 设置请求头
      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      
      // 监听上传进度
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          const updatedFile = { ...uploadFile, percent };
          const updatedList = currentFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
          updateFileList(updatedList);
        }
      };
      
      // 监听上传完成
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch {
            response = xhr.responseText;
          }
          
          const updatedFile = { ...uploadFile, status: 'done' as const, response, percent: 100 };
          const updatedList = currentFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
          updateFileList(updatedList);
        } else {
          const updatedFile = { ...uploadFile, status: 'error' as const, error: new Error(`Upload failed: ${xhr.status}`) };
          const updatedList = currentFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
          updateFileList(updatedList);
        }
      };
      
      // 监听上传错误
      xhr.onerror = () => {
        const updatedFile = { ...uploadFile, status: 'error' as const, error: new Error('Upload failed') };
        const updatedList = currentFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
        updateFileList(updatedList);
      };
      
      xhr.open('POST', action);
      xhr.send(formData);
    } catch (error) {
      const updatedFile = { ...uploadFile, status: 'error' as const, error };
      const updatedList = currentFileList.map(f => f.uid === uploadFile.uid ? updatedFile : f);
      updateFileList(updatedList);
    }
  }, [action, data, headers, updateFileList]);
  
  // 处理文件移除
  const handleRemove = useCallback(async (file: UploadFile) => {
    if (onRemove) {
      try {
        const result = await onRemove(file);
        if (!result) return;
      } catch (error) {
        console.error('onRemove error:', error);
        return;
      }
    }
    
    const newFileList = fileList.filter(f => f.uid !== file.uid);
    updateFileList(newFileList);
  }, [fileList, onRemove, updateFileList]);
  
  // 处理拖拽
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  }, [disabled]);
  
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  }, []);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const files = event.dataTransfer.files;
    handleFileSelect(files);
    onDrop?.(event);
  }, [disabled, handleFileSelect, onDrop]);
  
  // 处理点击上传
  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);
  
  // 处理文件输入变化
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFileSelect(files);
    // 清空input值，允许重复选择同一文件
    if (event.target) {
      event.target.value = '';
    }
  }, [handleFileSelect]);
  
  // 渲染上传列表
  const renderUploadList = () => {
    if (!showUploadList || fileList.length === 0) return null;
    
    const showUploadListConfig = typeof showUploadList === 'object' ? showUploadList : {};
    const {
      showPreviewIcon = true,
      showRemoveIcon = true,
      showDownloadIcon = false,
    } = showUploadListConfig;
    
    return (
      <div className={styles.uploadList}>
        {fileList.map(file => (
          <div key={file.uid} className={`${styles.uploadListItem} ${styles[`uploadListItem${listType.charAt(0).toUpperCase() + listType.slice(1)}`]}`}>
            {listType === 'picture-card' ? (
              <div className={styles.uploadListItemInfo}>
                {file.thumbUrl || file.url ? (
                  <img src={file.thumbUrl || file.url} alt={file.name} className={styles.uploadListItemImage} />
                ) : (
                  <div className={styles.uploadListItemIcon}>
                    📄
                  </div>
                )}
                <div className={styles.uploadListItemActions}>
                  {showPreviewIcon && (file.thumbUrl || file.url) && (
                    <button
                      type="button"
                      className={styles.uploadListItemAction}
                      onClick={() => onPreview?.(file)}
                      title="预览"
                    >
                      👁️
                    </button>
                  )}
                  {showDownloadIcon && file.url && (
                    <button
                      type="button"
                      className={styles.uploadListItemAction}
                      onClick={() => onDownload?.(file)}
                      title="下载"
                    >
                      ⬇️
                    </button>
                  )}
                  {showRemoveIcon && (
                    <button
                      type="button"
                      className={styles.uploadListItemAction}
                      onClick={() => handleRemove(file)}
                      title="删除"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className={styles.uploadListItemName}>
                  <span className={styles.uploadListItemIcon}>
                    {file.status === 'uploading' ? '⏳' : file.status === 'error' ? '❌' : '📄'}
                  </span>
                  <span className={styles.uploadListItemText}>{file.name}</span>
                </div>
                <div className={styles.uploadListItemActions}>
                  {showPreviewIcon && (file.thumbUrl || file.url) && (
                    <button
                      type="button"
                      className={styles.uploadListItemAction}
                      onClick={() => onPreview?.(file)}
                      title="预览"
                    >
                      👁️
                    </button>
                  )}
                  {showDownloadIcon && file.url && (
                    <button
                      type="button"
                      className={styles.uploadListItemAction}
                      onClick={() => onDownload?.(file)}
                      title="下载"
                    >
                      ⬇️
                    </button>
                  )}
                  {showRemoveIcon && (
                    <button
                      type="button"
                      className={styles.uploadListItemAction}
                      onClick={() => handleRemove(file)}
                      title="删除"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </>
            )}
            
            {file.status === 'uploading' && file.percent !== undefined && (
              <div className={styles.uploadListItemProgress}>
                <div 
                  className={styles.uploadListItemProgressBar}
                  style={{ width: `${file.percent}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const uploadClasses = [
    styles.upload,
    drag ? styles.uploadDrag : '',
    dragOver ? styles.uploadDragOver : '',
    disabled ? styles.uploadDisabled : '',
    listType === 'picture-card' ? styles.uploadPictureCard : '',
    className || '',
  ].filter(Boolean).join(' ');
  
  const shouldShowUploadArea = !maxCount || fileList.length < maxCount;
  
  return (
    <div className={uploadClasses} style={style}>
      {shouldShowUploadArea && (
        <div
          ref={uploadRef}
          className={styles.uploadArea}
          onClick={drag ? undefined : handleClick}
          onDragOver={drag ? handleDragOver : undefined}
          onDragLeave={drag ? handleDragLeave : undefined}
          onDrop={drag ? handleDrop : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={handleInputChange}
            className={styles.uploadInput}
          />
          
          {children || (
            <div className={styles.uploadContent}>
              {listType === 'picture-card' ? (
                <div className={styles.uploadPictureCardContent}>
                  <div className={styles.uploadIcon}>📁</div>
                  <div className={styles.uploadText}>上传</div>
                </div>
              ) : (
                <>
                  <div className={styles.uploadIcon}>📁</div>
                  <div className={styles.uploadText}>
                    {drag ? '点击或拖拽文件到此区域上传' : '点击上传'}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
      
      {renderUploadList()}
    </div>
  );
};

export default Upload;