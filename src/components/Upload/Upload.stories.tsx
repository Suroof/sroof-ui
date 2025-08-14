import type { Meta, StoryObj } from '@storybook/react';
import Upload from './Upload';
import type { UploadFile } from './Upload';
import React from 'react';

const meta: Meta<typeof Upload> = {
  title: 'Components/Upload',
  component: Upload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '文件选择上传和拖拽上传控件。',
      },
    },
  },
  argTypes: {
    action: {
      control: 'text',
      description: '上传的地址',
    },
    multiple: {
      control: 'boolean',
      description: '是否支持多选文件',
    },
    accept: {
      control: 'text',
      description: '接受上传的文件类型',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    listType: {
      control: 'select',
      options: ['text', 'picture', 'picture-card'],
      description: '上传列表的内建样式',
    },
    showUploadList: {
      control: 'boolean',
      description: '是否显示上传列表',
    },
    maxCount: {
      control: 'number',
      description: '限制上传数量',
    },
    drag: {
      control: 'boolean',
      description: '是否支持拖拽上传',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

// 基础用法
export const Basic: Story = {
  args: {
    action: '/upload',
    children: (
      <div>
        <p>点击上传文件</p>
      </div>
    ),
  },
};

// 拖拽上传
export const Drag: Story = {
  args: {
    action: '/upload',
    drag: true,
  },
};

// 多文件上传
export const Multiple: Story = {
  args: {
    action: '/upload',
    multiple: true,
    children: (
      <div>
        <p>支持多文件上传</p>
      </div>
    ),
  },
};

// 限制文件类型
export const AcceptTypes: Story = {
  args: {
    action: '/upload',
    accept: '.jpg,.jpeg,.png,.gif',
    children: (
      <div>
        <p>只能上传图片文件</p>
        <p>支持格式：JPG, JPEG, PNG, GIF</p>
      </div>
    ),
  },
};

// 限制上传数量
export const MaxCount: Story = {
  args: {
    action: '/upload',
    multiple: true,
    maxCount: 3,
    children: (
      <div>
        <p>最多上传3个文件</p>
      </div>
    ),
  },
};

// 禁用状态
export const Disabled: Story = {
  args: {
    action: '/upload',
    disabled: true,
    children: (
      <div>
        <p>禁用状态</p>
      </div>
    ),
  },
};

// 图片列表
export const PictureList: Story = {
  args: {
    action: '/upload',
    listType: 'picture',
    multiple: true,
    accept: 'image/*',
    children: (
      <div>
        <p>上传图片</p>
      </div>
    ),
  },
};

// 图片卡片
export const PictureCard: Story = {
  args: {
    action: '/upload',
    listType: 'picture-card',
    multiple: true,
    accept: 'image/*',
  },
};

// 自定义上传列表
export const CustomUploadList: Story = {
  args: {
    action: '/upload',
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: true,
    },
    children: (
      <div>
        <p>自定义上传列表</p>
      </div>
    ),
  },
};

// 不显示上传列表
export const NoUploadList: Story = {
  args: {
    action: '/upload',
    showUploadList: false,
    children: (
      <div>
        <p>不显示上传列表</p>
      </div>
    ),
  },
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([
      {
        uid: '1',
        name: 'example.txt',
        status: 'done',
        url: 'https://example.com/example.txt',
      },
    ]);
    
    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      setFileList(newFileList);
    };
    
    return (
      <div>
        <Upload
          action="/upload"
          fileList={fileList}
          onChange={handleChange}
        >
          <div>
            <p>受控模式</p>
          </div>
        </Upload>
        
        <div style={{ marginTop: '16px' }}>
          <h4>当前文件列表：</h4>
          <pre>{JSON.stringify(fileList, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

// 自定义上传实现
export const CustomRequest: Story = {
  render: () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    
    const customRequest = ({ file, onProgress, onSuccess, onError }: any) => {
      // 模拟上传过程
      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        onProgress({ percent: progress });
        
        if (progress >= 100) {
          clearInterval(timer);
          onSuccess({ url: 'https://example.com/uploaded-file' });
        }
      }, 200);
      
      // 模拟可能的错误
      if (Math.random() > 0.8) {
        setTimeout(() => {
          clearInterval(timer);
          onError(new Error('Upload failed'));
        }, 1000);
      }
    };
    
    return (
      <Upload
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        customRequest={customRequest}
      >
        <div>
          <p>自定义上传实现</p>
          <p>模拟上传进度和可能的错误</p>
        </div>
      </Upload>
    );
  },
};

// 上传前检查
export const BeforeUpload: Story = {
  render: () => {
    const beforeUpload = (file: File) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        alert('只能上传 JPG/PNG 格式的图片!');
        return false;
      }
      
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        alert('图片大小不能超过 2MB!');
        return false;
      }
      
      return true;
    };
    
    return (
      <Upload
        action="/upload"
        beforeUpload={beforeUpload}
        accept="image/*"
      >
        <div>
          <p>上传前检查</p>
          <p>只允许上传 JPG/PNG 格式，且小于 2MB 的图片</p>
        </div>
      </Upload>
    );
  },
};

// 手动上传
export const ManualUpload: Story = {
  render: () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [uploading, setUploading] = React.useState(false);
    
    const handleUpload = () => {
      setUploading(true);
      
      // 模拟上传过程
      setTimeout(() => {
        setFileList(fileList.map(file => ({
          ...file,
          status: 'done' as const,
          response: { url: 'https://example.com/uploaded' },
        })));
        setUploading(false);
        alert('上传成功!');
      }, 2000);
    };
    
    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      setFileList(newFileList.map(file => ({
        ...file,
        status: file.status === 'uploading' ? 'done' : file.status,
      })));
    };
    
    return (
      <div>
        <Upload
          fileList={fileList}
          onChange={handleChange}
          multiple
          beforeUpload={() => false} // 阻止自动上传
        >
          <div>
            <p>选择文件（不会自动上传）</p>
          </div>
        </Upload>
        
        <button
          type="button"
          onClick={handleUpload}
          disabled={fileList.length === 0 || uploading}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: fileList.length === 0 || uploading ? 'not-allowed' : 'pointer',
            opacity: fileList.length === 0 || uploading ? 0.6 : 1,
          }}
        >
          {uploading ? '上传中...' : '开始上传'}
        </button>
      </div>
    );
  },
};

// 不同样式组合
export const DifferentStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4>文本列表</h4>
        <Upload action="/upload" listType="text">
          <div>
            <p>点击上传</p>
          </div>
        </Upload>
      </div>
      
      <div>
        <h4>图片列表</h4>
        <Upload action="/upload" listType="picture" accept="image/*">
          <div>
            <p>上传图片</p>
          </div>
        </Upload>
      </div>
      
      <div>
        <h4>图片卡片</h4>
        <Upload action="/upload" listType="picture-card" accept="image/*" />
      </div>
      
      <div>
        <h4>拖拽上传</h4>
        <Upload action="/upload" drag>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>拖拽文件到此处或点击上传</p>
          </div>
        </Upload>
      </div>
    </div>
  ),
};

// 复杂示例
export const ComplexExample: Story = {
  render: () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [uploadConfig, setUploadConfig] = React.useState({
      multiple: true,
      maxCount: 5,
      listType: 'picture' as const,
      drag: false,
      disabled: false,
    });
    
    const handlePreview = (file: UploadFile) => {
      if (file.url || file.thumbUrl) {
        window.open(file.url || file.thumbUrl, '_blank');
      }
    };
    
    const handleDownload = (file: UploadFile) => {
      if (file.url) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
      }
    };
    
    const handleRemove = (file: UploadFile) => {
      return new Promise<boolean>((resolve) => {
        const confirmed = window.confirm(`确定要删除 ${file.name} 吗？`);
        resolve(confirmed);
      });
    };
    
    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h3>文件上传配置</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
            <label>
              <input
                type="checkbox"
                checked={uploadConfig.multiple}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, multiple: e.target.checked }))}
              />
              {' '}多文件上传
            </label>
            
            <label>
              <input
                type="checkbox"
                checked={uploadConfig.drag}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, drag: e.target.checked }))}
              />
              {' '}拖拽上传
            </label>
            
            <label>
              <input
                type="checkbox"
                checked={uploadConfig.disabled}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, disabled: e.target.checked }))}
              />
              {' '}禁用状态
            </label>
            
            <label>
              列表类型:
              <select
                value={uploadConfig.listType}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, listType: e.target.value as any }))}
                style={{ marginLeft: '8px' }}
              >
                <option value="text">文本</option>
                <option value="picture">图片</option>
                <option value="picture-card">图片卡片</option>
              </select>
            </label>
            
            <label>
              最大数量:
              <input
                type="number"
                min={1}
                max={10}
                value={uploadConfig.maxCount}
                onChange={(e) => setUploadConfig(prev => ({ ...prev, maxCount: Number(e.target.value) }))}
                style={{ marginLeft: '8px', width: '60px' }}
              />
            </label>
          </div>
        </div>
        
        <Upload
          action="/upload"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          onPreview={handlePreview}
          onDownload={handleDownload}
          onRemove={handleRemove}
          {...uploadConfig}
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: true,
          }}
        >
          {uploadConfig.listType === 'picture' ? null : (
            <div style={{ padding: uploadConfig.drag ? '40px 20px' : '20px', textAlign: 'center' }}>
              <p>{uploadConfig.drag ? '拖拽文件到此处或点击上传' : '点击上传文件'}</p>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                最多上传 {uploadConfig.maxCount} 个文件
              </p>
            </div>
          )}
        </Upload>
        
        <div style={{ marginTop: '24px' }}>
          <h4>文件列表状态：</h4>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p>总数：{fileList.length}</p>
            <p>上传中：{fileList.filter(f => f.status === 'uploading').length}</p>
            <p>已完成：{fileList.filter(f => f.status === 'done').length}</p>
            <p>失败：{fileList.filter(f => f.status === 'error').length}</p>
          </div>
        </div>
      </div>
    );
  },
};