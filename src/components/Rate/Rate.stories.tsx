import type { Meta, StoryObj } from '@storybook/react';
import Rate from './Rate';
import React from 'react';

const meta: Meta<typeof Rate> = {
  title: 'Components/Rate',
  component: Rate,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '评分组件，用于对事物进行评级操作。',
      },
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: '当前数，受控值',
    },
    defaultValue: {
      control: 'number',
      description: '默认值',
    },
    count: {
      control: 'number',
      description: 'star 总数',
    },
    allowHalf: {
      control: 'boolean',
      description: '是否允许半选',
    },
    allowClear: {
      control: 'boolean',
      description: '是否允许再次点击后清除',
    },
    disabled: {
      control: 'boolean',
      description: '只读，无法进行交互',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '组件大小',
    },
    autoFocus: {
      control: 'boolean',
      description: '是否自动获取焦点',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rate>;

// 基础用法
export const Basic: Story = {
  args: {
    defaultValue: 3,
  },
};

// 半星
export const AllowHalf: Story = {
  args: {
    allowHalf: true,
    defaultValue: 2.5,
  },
};

// 只读
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 3,
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4>Small</h4>
        <Rate size="small" defaultValue={3} />
      </div>
      <div>
        <h4>Default</h4>
        <Rate defaultValue={3} />
      </div>
      <div>
        <h4>Large</h4>
        <Rate size="large" defaultValue={3} />
      </div>
    </div>
  ),
};

// 清除功能
export const AllowClear: Story = {
  args: {
    allowClear: true,
    defaultValue: 3,
  },
};

// 不允许清除
export const DisallowClear: Story = {
  args: {
    allowClear: false,
    defaultValue: 3,
  },
};

// 自定义星星数量
export const CustomCount: Story = {
  args: {
    count: 10,
    defaultValue: 6,
  },
};

// 自定义字符
export const CustomCharacter: Story = {
  args: {
    character: '♥',
    defaultValue: 3,
    style: { color: '#ff4d4f' },
  },
};

// 自定义字符（函数）
export const CustomCharacterFunction: Story = {
  render: () => (
    <Rate
      character={({ index, value }) => {
        if (index < value) {
          return '😍';
        }
        return '😐';
      }}
      defaultValue={3}
    />
  ),
};

// 带提示信息
export const WithTooltips: Story = {
  args: {
    tooltips: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
    defaultValue: 3,
  },
};

// 受控模式
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    
    return (
      <div>
        <Rate value={value} onChange={setValue} />
        <div style={{ marginTop: '16px' }}>
          当前评分: {value}
        </div>
        <div style={{ marginTop: '8px' }}>
          <button onClick={() => setValue(0)}>清除</button>
          <button onClick={() => setValue(5)} style={{ marginLeft: '8px' }}>满分</button>
        </div>
      </div>
    );
  },
};

// 悬停回调
export const HoverCallback: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    
    return (
      <div>
        <Rate
          value={value}
          onChange={setValue}
          onHoverChange={setHoverValue}
        />
        <div style={{ marginTop: '16px' }}>
          {hoverValue !== null ? (
            <span>悬停: {desc[hoverValue - 1]}</span>
          ) : (
            <span>当前: {value ? desc[value - 1] : '未评分'}</span>
          )}
        </div>
      </div>
    );
  },
};

// 键盘操作演示
export const KeyboardNavigation: Story = {
  render: () => (
    <div>
      <Rate defaultValue={2} autoFocus />
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
        <p>键盘操作说明：</p>
        <ul>
          <li>← → 或 ↑ ↓：调整评分</li>
          <li>Home：跳到最低分</li>
          <li>End：跳到最高分</li>
          <li>Enter 或 Space：确认当前评分</li>
        </ul>
      </div>
    </div>
  ),
};

// 不同状态组合
export const DifferentStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4>正常状态</h4>
        <Rate defaultValue={3} />
      </div>
      
      <div>
        <h4>半星状态</h4>
        <Rate allowHalf defaultValue={3.5} />
      </div>
      
      <div>
        <h4>禁用状态</h4>
        <Rate disabled defaultValue={3} />
      </div>
      
      <div>
        <h4>自定义字符</h4>
        <Rate character="★" defaultValue={3} style={{ color: '#faad14' }} />
      </div>
      
      <div>
        <h4>表情字符</h4>
        <Rate character="😀" defaultValue={3} />
      </div>
      
      <div>
        <h4>图标字符</h4>
        <Rate
          character={
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          }
          defaultValue={3}
          style={{ color: '#ff4d4f' }}
        />
      </div>
    </div>
  ),
};

// 动态演示
export const DynamicDemo: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    const [allowHalf, setAllowHalf] = React.useState(false);
    const [allowClear, setAllowClear] = React.useState(true);
    const [disabled, setDisabled] = React.useState(false);
    const [count, setCount] = React.useState(5);
    
    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <Rate
            value={value}
            onChange={setValue}
            allowHalf={allowHalf}
            allowClear={allowClear}
            disabled={disabled}
            count={count}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label>
            <input
              type="checkbox"
              checked={allowHalf}
              onChange={(e) => setAllowHalf(e.target.checked)}
            />
            {' '}允许半选
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={allowClear}
              onChange={(e) => setAllowClear(e.target.checked)}
            />
            {' '}允许清除
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            {' '}禁用状态
          </label>
          
          <label>
            星星数量: 
            <input
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              style={{ marginLeft: '8px', width: '60px' }}
            />
          </label>
          
          <div>
            当前评分: {value}
          </div>
        </div>
      </div>
    );
  },
};

// 复杂示例
export const ComplexExample: Story = {
  render: () => {
    const [ratings, setRatings] = React.useState({
      overall: 4,
      quality: 3.5,
      service: 4.5,
      value: 3,
    });
    
    const updateRating = (key: string, value: number) => {
      setRatings(prev => ({ ...prev, [key]: value }));
    };
    
    const average = Object.values(ratings).reduce((sum, val) => sum + val, 0) / Object.values(ratings).length;
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <h3>产品评价</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>总体评价:</span>
            <Rate
              value={ratings.overall}
              onChange={(value) => updateRating('overall', value)}
              allowHalf
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>产品质量:</span>
            <Rate
              value={ratings.quality}
              onChange={(value) => updateRating('quality', value)}
              allowHalf
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>服务态度:</span>
            <Rate
              value={ratings.service}
              onChange={(value) => updateRating('service', value)}
              allowHalf
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>性价比:</span>
            <Rate
              value={ratings.value}
              onChange={(value) => updateRating('value', value)}
              allowHalf
            />
          </div>
          
          <hr />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
            <span>平均评分:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rate value={average} disabled allowHalf />
              <span>({average.toFixed(1)})</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};