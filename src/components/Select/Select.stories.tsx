import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {Select} from './Select';
import type { SelectOption, SelectOptGroup } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '现代化的选择器组件，支持单选、多选、搜索、分组等功能。具有优雅的动画效果和响应式设计。',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: '选择器尺寸',
    },
    mode: {
      control: 'select',
      options: [undefined, 'multiple', 'tags'],
      description: '选择模式',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    allowClear: {
      control: 'boolean',
      description: '是否显示清除按钮',
    },
    showSearch: {
      control: 'boolean',
      description: '是否可搜索',
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
];

const cityOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' },
  { label: '武汉', value: 'wuhan' },
  { label: '西安', value: 'xian' },
];

const groupedOptions: (SelectOption | SelectOptGroup)[] = [
  {
    label: '水果',
    options: [
      { label: '苹果', value: 'apple' },
      { label: '香蕉', value: 'banana' },
      { label: '橙子', value: 'orange' },
    ],
  },
  {
    label: '蔬菜',
    options: [
      { label: '胡萝卜', value: 'carrot' },
      { label: '西兰花', value: 'broccoli' },
      { label: '菠菜', value: 'spinach' },
    ],
  },
  {
    label: '肉类',
    options: [
      { label: '牛肉', value: 'beef' },
      { label: '猪肉', value: 'pork' },
      { label: '鸡肉', value: 'chicken' },
    ],
  },
];

// 基本用法
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: '请选择水果',
    style: { width: 200 },
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Select {...args} />
    </div>
  ),
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>小尺寸</h4>
        <Select
          options={basicOptions}
          size="small"
          placeholder="小尺寸选择器"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>中等尺寸（默认）</h4>
        <Select
          options={basicOptions}
          size="middle"
          placeholder="中等尺寸选择器"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>大尺寸</h4>
        <Select
          options={basicOptions}
          size="large"
          placeholder="大尺寸选择器"
          style={{ width: 200 }}
        />
      </div>
    </div>
  ),
};

// 带清除功能
export const WithClear: Story = {
  render: () => {
    const [value, setValue] = useState<string>('apple');

    return (
      <div style={{ padding: '50px' }}>
        <Select
          options={basicOptions}
          value={value}
          onChange={(val) => setValue(val as string)}
          allowClear
          placeholder="选择后可清除"
          style={{ width: 200 }}
        />
      </div>
    );
  },
};

// 搜索功能
export const Searchable: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Select
        options={cityOptions}
        showSearch
        placeholder="搜索城市"
        style={{ width: 200 }}
        filterOption={(input, option) => {
          return (option?.label as string)?.toLowerCase().includes(input.toLowerCase());
        }}
      />
    </div>
  ),
};

// 多选模式
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['apple', 'banana']);

    return (
      <div style={{ padding: '50px' }}>
        <Select
          options={basicOptions}
          mode="multiple"
          value={value}
          onChange={(val) => setValue(val as string[])}
          placeholder="多选水果"
          style={{ width: 300 }}
          allowClear
        />
      </div>
    );
  },
};

// 限制显示标签数量
export const MaxTagCount: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['apple', 'banana', 'cherry', 'date']);

    return (
      <div style={{ padding: '50px' }}>
        <Select
          options={basicOptions}
          mode="multiple"
          value={value}
          onChange={(val) => setValue(val as string[])}
          placeholder="最多显示2个标签"
          style={{ width: 300 }}
          maxTagCount={2}
          maxTagPlaceholder={(omittedValues) => `还有 ${omittedValues.length} 个...`}
        />
      </div>
    );
  },
};

// 分组选项
export const Grouped: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Select
        options={groupedOptions}
        placeholder="选择食物类别"
        style={{ width: 200 }}
        showSearch
      />
    </div>
  ),
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>禁用选择器</h4>
        <Select
          options={basicOptions}
          disabled
          placeholder="禁用状态"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>带默认值的禁用</h4>
        <Select
          options={basicOptions}
          disabled
          defaultValue="apple"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>禁用特定选项</h4>
        <Select
          options={[
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana', disabled: true },
            { label: 'Cherry', value: 'cherry' },
            { label: 'Date', value: 'date', disabled: true },
          ]}
          placeholder="部分选项禁用"
          style={{ width: 200 }}
        />
      </div>
    </div>
  ),
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>('');
    const [multipleValue, setMultipleValue] = useState<string[]>([]);

    return (
      <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4>受控单选</h4>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <Select
              options={basicOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="受控单选"
              style={{ width: 200 }}
            />
            <button onClick={() => setSingleValue('cherry')}>选择 Cherry</button>
            <button onClick={() => setSingleValue('')}>清空</button>
          </div>
          <p>当前值: {singleValue || '无'}</p>
        </div>

        <div>
          <h4>受控多选</h4>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <Select
              options={basicOptions}
              mode="multiple"
              value={multipleValue}
              onChange={(val) => setMultipleValue(val as string[])}
              placeholder="受控多选"
              style={{ width: 300 }}
            />
            <button onClick={() => setMultipleValue(['apple', 'banana'])}>
              选择 Apple & Banana
            </button>
            <button onClick={() => setMultipleValue([])}>清空</button>
          </div>
          <p>当前值: {multipleValue.join(', ') || '无'}</p>
        </div>
      </div>
    );
  },
};

// 自定义渲染
export const CustomRender: Story = {
  render: () => {
    const customOptions: SelectOption[] = [
      { label: '🍎 Apple', value: 'apple' },
      { label: '🍌 Banana', value: 'banana' },
      { label: '🍒 Cherry', value: 'cherry' },
      { label: '📅 Date', value: 'date' },
    ];

    const userOptions: SelectOption[] = [
      { label: 'John Doe', value: 'john' },
      { label: 'Jane Smith', value: 'jane' },
      { label: 'Bob Johnson', value: 'bob' },
    ];

    return (
      <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4>带图标的选项</h4>
          <Select
            options={customOptions}
            placeholder="选择水果"
            style={{ width: 200 }}
          />
        </div>

        <div>
          <h4>自定义选项渲染</h4>
          <Select
            options={userOptions}
            placeholder="选择用户"
            style={{ width: 250 }}
            optionRender={(option) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {(option.label as string).charAt(0)}
                </div>
                {option.label}
              </div>
            )}
          />
        </div>

        <div>
          <h4>自定义标签渲染</h4>
          <Select
            options={customOptions}
            mode="multiple"
            placeholder="多选水果"
            style={{ width: 300 }}
            tagRender={({ label, value, onClose }) => (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  margin: '2px',
                }}
              >
                {label}
                <span
                  onClick={onClose}
                  style={{
                    marginLeft: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ×
                </span>
              </span>
            )}
          />
        </div>
      </div>
    );
  },
};

// 大量数据
export const LargeData: Story = {
  render: () => {
    const largeOptions: SelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
      label: `选项 ${i + 1}`,
      value: `option-${i + 1}`,
    }));

    return (
      <div style={{ padding: '50px' }}>
        <Select
          options={largeOptions}
          showSearch
          placeholder="搜索1000个选项"
          style={{ width: 200 }}
          listHeight={200}
        />
      </div>
    );
  },
};

// 异步加载
export const AsyncLoad: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<SelectOption[]>([]);

    const handleSearch = (value: string) => {
      if (value) {
        setLoading(true);
        // 模拟异步搜索
        setTimeout(() => {
          const filteredOptions = cityOptions.filter((option) =>
            (option.label as string).includes(value)
          );
          setOptions(filteredOptions);
          setLoading(false);
        }, 800);
      } else {
        setOptions([]);
      }
    };

    return (
      <div style={{ padding: '50px' }}>
        <Select
          options={options}
          showSearch
          placeholder="输入城市名称搜索"
          style={{ width: 200 }}
          onSearch={handleSearch}
          notFoundContent={loading ? '搜索中...' : '暂无数据'}
          filterOption={false} // 禁用前端过滤
        />
      </div>
    );
  },
};

// 自定义下拉内容
export const CustomDropdown: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <Select
        options={basicOptions}
        placeholder="自定义下拉内容"
        style={{ width: 200 }}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <div
              style={{
                padding: '8px',
                borderTop: '1px solid #e5e7eb',
                background: '#f9fafb',
                textAlign: 'center',
                fontSize: '12px',
                color: '#6b7280',
              }}
            >
              自定义底部内容
            </div>
          </div>
        )}
      />
    </div>
  ),
};

// 复杂示例
export const Complex: Story = {
  render: () => {
    const [values, setValues] = useState({
      single: 'apple',
      multiple: ['beijing', 'shanghai'],
      searchable: '',
    });

    return (
      <div style={{ padding: '50px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
          }}
        >
          <div>
            <h4>基础选择</h4>
            <Select
              options={basicOptions}
              value={values.single}
              onChange={(val) => setValues({ ...values, single: val as string })}
              allowClear
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <h4>多选城市</h4>
            <Select
              options={cityOptions}
              mode="multiple"
              value={values.multiple}
              onChange={(val) => setValues({ ...values, multiple: val as string[] })}
              showSearch
              allowClear
              maxTagCount={2}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <h4>分组搜索</h4>
            <Select
              options={groupedOptions}
              value={values.searchable}
              onChange={(val) => setValues({ ...values, searchable: val as string })}
              showSearch
              allowClear
              placeholder="搜索食物"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
          <h4>当前选择:</h4>
          <pre style={{ fontSize: '12px', margin: 0 }}>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
