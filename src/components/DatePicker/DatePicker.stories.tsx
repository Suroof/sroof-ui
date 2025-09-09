import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {DatePicker} from './DatePicker';
import type { DateValue, RangeValue } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '现代化的日期选择器组件，支持单日期选择、日期范围选择、日期禁用等功能。具有优雅的动画效果和响应式设计。',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['date', 'range'],
      description: '选择模式',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: '选择器尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    allowClear: {
      control: 'boolean',
      description: '是否显示清除按钮',
    },
    showToday: {
      control: 'boolean',
      description: '是否显示今天按钮',
    },
    placeholder: {
      control: 'text',
      description: '占位符文本',
    },
    format: {
      control: 'text',
      description: '日期格式',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// 基本用法
export const Default: Story = {
  args: {
    placeholder: '请选择日期',
    style: { width: 200 },
  },
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <DatePicker {...args} />
    </div>
  ),
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>小尺寸</h4>
        <DatePicker
          size="small"
          placeholder="小尺寸日期选择器"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>中等尺寸（默认）</h4>
        <DatePicker
          size="middle"
          placeholder="中等尺寸日期选择器"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>大尺寸</h4>
        <DatePicker
          size="large"
          placeholder="大尺寸日期选择器"
          style={{ width: 200 }}
        />
      </div>
    </div>
  ),
};

// 带默认值
export const WithDefaultValue: Story = {
  render: () => {
    const today = new Date();

    return (
      <div style={{ padding: '50px' }}>
        <DatePicker
          defaultValue={today}
          style={{ width: 200 }}
        />
      </div>
    );
  },
};

// 日期范围选择
export const DateRange: Story = {
  render: () => {
    const [value, setValue] = useState<RangeValue>([null, null]);

    return (
      <div style={{ padding: '50px' }}>
        <DatePicker
          mode="range"
          value={value}
          onChange={(date) => setValue(date as RangeValue)}
          placeholder={['开始日期', '结束日期']}
          style={{ width: 300 }}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          <p>选中的范围:</p>
          <p>开始: {value[0] ? value[0].toLocaleDateString() : '未选择'}</p>
          <p>结束: {value[1] ? value[1].toLocaleDateString() : '未选择'}</p>
        </div>
      </div>
    );
  },
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<DateValue>(null);
    const [rangeValue, setRangeValue] = useState<RangeValue>([null, null]);

    return (
      <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4>受控单日期选择</h4>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <DatePicker
              value={singleValue}
              onChange={(date) => setSingleValue(date as DateValue)}
              placeholder="受控单日期"
              style={{ width: 200 }}
            />
            <button onClick={() => setSingleValue(new Date())}>设置今天</button>
            <button onClick={() => setSingleValue(null)}>清空</button>
          </div>
          <p style={{ fontSize: '14px', color: '#666' }}>
            当前值: {singleValue ? singleValue.toLocaleDateString() : '未选择'}
          </p>
        </div>

        <div>
          <h4>受控范围选择</h4>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <DatePicker
              mode="range"
              value={rangeValue}
              onChange={(date) => setRangeValue(date as RangeValue)}
              placeholder={['开始日期', '结束日期']}
              style={{ width: 300 }}
            />
            <button onClick={() => {
              const today = new Date();
              const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              setRangeValue([today, nextWeek]);
            }}>
              设置本周
            </button>
            <button onClick={() => setRangeValue([null, null])}>清空</button>
          </div>
          <p style={{ fontSize: '14px', color: '#666' }}>
            当前范围: {rangeValue[0] ? rangeValue[0].toLocaleDateString() : '未选择'} ~ {rangeValue[1] ? rangeValue[1].toLocaleDateString() : '未选择'}
          </p>
        </div>
      </div>
    );
  },
};

// 禁用日期
export const DisabledDates: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    // 禁用过去的日期
    const disabledDate = (date: Date) => {
      return date < today;
    };

    return (
      <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4>禁用过去的日期</h4>
          <DatePicker
            disabledDate={disabledDate}
            placeholder="只能选择今天及以后"
            style={{ width: 200 }}
          />
        </div>

        <div>
          <h4>限制日期范围</h4>
          <DatePicker
            minDate={today}
            maxDate={nextWeek}
            placeholder="只能选择本周"
            style={{ width: 200 }}
          />
        </div>

        <div>
          <h4>禁用周末</h4>
          <DatePicker
            disabledDate={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6; // 禁用周日和周六
            }}
            placeholder="不能选择周末"
            style={{ width: 200 }}
          />
        </div>
      </div>
    );
  },
};

// 不同格式
export const DateFormats: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>默认格式 (YYYY-MM-DD)</h4>
        <DatePicker
          defaultValue={new Date()}
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>年月日格式 (YYYY年MM月DD日)</h4>
        <DatePicker
          format="YYYY年MM月DD日"
          defaultValue={new Date()}
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>短格式 (MM/DD)</h4>
        <DatePicker
          format="MM/DD"
          defaultValue={new Date()}
          style={{ width: 150 }}
        />
      </div>
    </div>
  ),
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>禁用的空选择器</h4>
        <DatePicker
          disabled
          placeholder="禁用状态"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>禁用的带值选择器</h4>
        <DatePicker
          disabled
          defaultValue={new Date()}
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>禁用的范围选择器</h4>
        <DatePicker
          mode="range"
          disabled
          defaultValue={[new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]}
          style={{ width: 300 }}
        />
      </div>
    </div>
  ),
};

// 无清除按钮
export const NoClear: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <DatePicker
        allowClear={false}
        defaultValue={new Date()}
        placeholder="无清除按钮"
        style={{ width: 200 }}
      />
    </div>
  ),
};

// 无今天按钮
export const NoToday: Story = {
  render: () => (
    <div style={{ padding: '50px' }}>
      <DatePicker
        showToday={false}
        placeholder="无今天按钮"
        style={{ width: 200 }}
      />
    </div>
  ),
};

// 自定义占位符
export const CustomPlaceholders: Story = {
  render: () => (
    <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>单日期自定义占位符</h4>
        <DatePicker
          placeholder="选择您的生日"
          style={{ width: 200 }}
        />
      </div>
      <div>
        <h4>范围选择自定义占位符</h4>
        <DatePicker
          mode="range"
          placeholder={['入住日期', '退房日期']}
          style={{ width: 300 }}
        />
      </div>
    </div>
  ),
};

// 回调事件
export const WithCallbacks: Story = {
  render: () => {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    return (
      <div style={{ padding: '50px' }}>
        <DatePicker
          placeholder="测试事件回调"
          style={{ width: 200 }}
          onChange={(date, dateString) => {
            addLog(`日期变化: ${dateString}`);
          }}
          onOpenChange={(open) => {
            addLog(`面板${open ? '打开' : '关闭'}`);
          }}
          onFocus={() => {
            addLog('获得焦点');
          }}
          onBlur={() => {
            addLog('失去焦点');
          }}
          onClear={() => {
            addLog('清除日期');
          }}
        />

        <div style={{ marginTop: '20px', padding: '12px', background: '#f5f5f5', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>事件日志:</h4>
          {logs.length === 0 ? (
            <p style={{ margin: 0, color: '#999' }}>暂无事件</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {logs.map((log, index) => (
                <li key={index} style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};

// 实际应用场景
export const RealWorldExamples: Story = {
  render: () => {
    const [checkIn, setCheckIn] = useState<DateValue>(null);
    const [checkOut, setCheckOut] = useState<DateValue>(null);
    const [birthday, setBirthday] = useState<DateValue>(null);
    const [projectRange, setProjectRange] = useState<RangeValue>([null, null]);

    const today = new Date();
    const maxBirthday = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

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
            <h4>酒店预订</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <DatePicker
                value={checkIn}
                onChange={(date) => setCheckIn(date as DateValue)}
                placeholder="入住日期"
                minDate={today}
                style={{ width: '100%' }}
              />
              <DatePicker
                value={checkOut}
                onChange={(date) => setCheckOut(date as DateValue)}
                placeholder="退房日期"
                minDate={checkIn || today}
                disabledDate={(date) => checkIn ? date <= checkIn : date < today}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <h4>生日选择</h4>
            <DatePicker
              value={birthday}
              onChange={(date) => setBirthday(date as DateValue)}
              placeholder="选择您的生日"
              maxDate={maxBirthday}
              format="YYYY年MM月DD日"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <h4>项目时间</h4>
            <DatePicker
              mode="range"
              value={projectRange}
              onChange={(range) => setProjectRange(range as RangeValue)}
              placeholder={['项目开始', '项目结束']}
              minDate={today}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
          <h4>选择结果:</h4>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p><strong>入住:</strong> {checkIn ? checkIn.toLocaleDateString() : '未选择'}</p>
            <p><strong>退房:</strong> {checkOut ? checkOut.toLocaleDateString() : '未选择'}</p>
            <p><strong>生日:</strong> {birthday ? birthday.toLocaleDateString() : '未选择'}</p>
            <p><strong>项目时间:</strong> {
              projectRange[0] && projectRange[1]
                ? `${projectRange[0].toLocaleDateString()} ~ ${projectRange[1].toLocaleDateString()}`
                : '未选择'
            }</p>
          </div>
        </div>
      </div>
    );
  },
};

// 响应式示例
export const Responsive: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h4>响应式日期选择器</h4>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
          在不同屏幕尺寸下自动调整大小
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <DatePicker
          placeholder="自适应宽度"
          style={{ width: '100%', maxWidth: '400px' }}
        />

        <DatePicker
          mode="range"
          placeholder={['开始日期', '结束日期']}
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </div>
    </div>
  ),
};

// 完整功能演示
export const FullFeatures: Story = {
  render: () => {
    const [configs, setConfigs] = useState({
      single: new Date(),
      range: [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)] as RangeValue,
      disabled: new Date(),
      limited: null as DateValue,
    });

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <div style={{ padding: '50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h4>基础单选</h4>
            <DatePicker
              value={configs.single}
              onChange={(date) => setConfigs(prev => ({ ...prev, single: date as DateValue }))}
              allowClear
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <h4>范围选择</h4>
            <DatePicker
              mode="range"
              value={configs.range}
              onChange={(range) => setConfigs(prev => ({ ...prev, range: range as RangeValue }))}
              allowClear
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <h4>禁用状态</h4>
            <DatePicker
              value={configs.disabled}
              disabled
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <h4>限制范围</h4>
            <DatePicker
              value={configs.limited}
              onChange={(date) => setConfigs(prev => ({ ...prev, limited: date as DateValue }))}
              minDate={today}
              maxDate={nextMonth}
              placeholder="只能选择下个月内"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h4>当前配置:</h4>
          <pre style={{
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify({
              single: configs.single?.toISOString(),
              range: configs.range.map(d => d?.toISOString()),
              disabled: configs.disabled?.toISOString(),
              limited: configs.limited?.toISOString(),
            }, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
