import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Slider from './Slider';
import type { SliderProps } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '一个功能完善的滑块组件，支持单值和范围选择，具有丰富的自定义选项和优秀的用户体验。'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '当前值（受控模式）',
      control: { type: 'number' }
    },
    defaultValue: {
      description: '默认值（非受控模式）',
      control: { type: 'number' }
    },
    min: {
      description: '最小值',
      control: { type: 'number' }
    },
    max: {
      description: '最大值',
      control: { type: 'number' }
    },
    step: {
      description: '步长',
      control: { type: 'number' }
    },
    range: {
      description: '是否为范围选择器',
      control: { type: 'boolean' }
    },
    disabled: {
      description: '是否禁用',
      control: { type: 'boolean' }
    },
    vertical: {
      description: '是否垂直方向',
      control: { type: 'boolean' }
    },
    reverse: {
      description: '是否反向',
      control: { type: 'boolean' }
    },
    dots: {
      description: '是否显示点',
      control: { type: 'boolean' }
    },
    tooltip: {
      description: '是否显示提示信息',
      control: { type: 'select' },
      options: [true, false, 'always']
    },
    autoFocus: {
      description: '是否自动聚焦',
      control: { type: 'boolean' }
    },
    onChange: {
      description: '值变化时的回调',
      action: 'onChange'
    },
    onAfterChange: {
      description: '拖拽结束后的回调',
      action: 'onAfterChange'
    },
    onChangeComplete: {
      description: '拖拽完成后的回调',
      action: 'onChangeComplete'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础示例
export const Default: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1
  }
};

// 范围选择器
export const Range: Story = {
  args: {
    range: true,
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    step: 1
  }
};

// 带标记的滑块
export const WithMarks: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 10,
    marks: {
      0: '0°C',
      26: '26°C',
      37: '37°C',
      100: {
        style: {
          color: '#f50'
        },
        label: <strong>100°C</strong>
      }
    }
  }
};

// 带点的滑块
export const WithDots: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 10,
    dots: true
  }
};

// 垂直滑块
export const Vertical: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    style: { height: 200 }
  }
};

// 垂直范围滑块
export const VerticalRange: Story = {
  args: {
    range: true,
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    step: 1,
    vertical: true,
    style: { height: 200 }
  }
};

// 反向滑块
export const Reverse: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    reverse: true
  }
};

// 禁用状态
export const Disabled: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    disabled: true
  }
};

// 始终显示提示
export const AlwaysTooltip: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    tooltip: 'always'
  }
};

// 自定义提示格式
export const CustomTooltip: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
    step: 1,
    tipFormatter: (value: number) => `${value}%`
  }
};

// 受控组件示例
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<number>(30);
    
    return (
      <div style={{ width: 300 }}>
        <Slider
          {...args}
          value={value}
          onChange={(val) => setValue(val as number)}
        />
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          当前值: {value}
        </div>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    step: 1
  }
};

// 受控范围组件示例
export const ControlledRange: Story = {
  render: (args) => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    
    return (
      <div style={{ width: 300 }}>
        <Slider
          {...args}
          range
          value={value}
          onChange={(val) => setValue(val as [number, number])}
        />
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          当前范围: [{value[0]}, {value[1]}]
        </div>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    step: 1
  }
};

// 复杂示例：音量控制
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState<number>(50);
    
    const getVolumeIcon = (vol: number) => {
      if (vol === 0) return '🔇';
      if (vol < 30) return '🔈';
      if (vol < 70) return '🔉';
      return '🔊';
    };
    
    return (
      <div style={{ width: 300, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>{getVolumeIcon(volume)}</span>
          <span style={{ fontWeight: 'bold' }}>音量控制</span>
        </div>
        <Slider
          value={volume}
          onChange={(val) => setVolume(val as number)}
          min={0}
          max={100}
          step={1}
          tipFormatter={(value) => `${value}%`}
          marks={{
            0: '静音',
            50: '50%',
            100: '最大'
          }}
        />
        <div style={{ marginTop: 12, textAlign: 'center', color: '#666' }}>
          当前音量: {volume}%
        </div>
      </div>
    );
  }
};

// 复杂示例：价格范围筛选
export const PriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);
    
    return (
      <div style={{ width: 400, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8 }}>价格筛选</h3>
          <div style={{ color: '#666' }}>
            选择价格范围: ¥{priceRange[0]} - ¥{priceRange[1]}
          </div>
        </div>
        <Slider
          range
          value={priceRange}
          onChange={(val) => setPriceRange(val as [number, number])}
          min={0}
          max={1000}
          step={10}
          tipFormatter={(value) => `¥${value}`}
          marks={{
            0: '¥0',
            200: '¥200',
            500: '¥500',
            800: '¥800',
            1000: '¥1000'
          }}
        />
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label>最低价格: </label>
            <input 
              type="number" 
              value={priceRange[0]} 
              onChange={(e) => {
                const newValue = Math.max(0, Math.min(Number(e.target.value), priceRange[1]));
                setPriceRange([newValue, priceRange[1]]);
              }}
              style={{ width: 80, padding: 4, border: '1px solid #ddd', borderRadius: 4 }}
            />
          </div>
          <div>
            <label>最高价格: </label>
            <input 
              type="number" 
              value={priceRange[1]} 
              onChange={(e) => {
                const newValue = Math.min(1000, Math.max(Number(e.target.value), priceRange[0]));
                setPriceRange([priceRange[0], newValue]);
              }}
              style={{ width: 80, padding: 4, border: '1px solid #ddd', borderRadius: 4 }}
            />
          </div>
        </div>
      </div>
    );
  }
};

// 复杂示例：时间范围选择
export const TimeRange: Story = {
  render: () => {
    const [timeRange, setTimeRange] = useState<[number, number]>([9, 17]);
    
    const formatTime = (hour: number) => {
      return `${hour.toString().padStart(2, '0')}:00`;
    };
    
    return (
      <div style={{ width: 350, padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8 }}>工作时间设置</h3>
          <div style={{ color: '#666' }}>
            工作时间: {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
          </div>
        </div>
        <Slider
          range
          value={timeRange}
          onChange={(val) => setTimeRange(val as [number, number])}
          min={0}
          max={24}
          step={1}
          tipFormatter={(value) => formatTime(value)}
          marks={{
            0: '00:00',
            6: '06:00',
            12: '12:00',
            18: '18:00',
            24: '24:00'
          }}
        />
        <div style={{ marginTop: 16, textAlign: 'center', padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
          总工作时长: {timeRange[1] - timeRange[0]} 小时
        </div>
      </div>
    );
  }
};