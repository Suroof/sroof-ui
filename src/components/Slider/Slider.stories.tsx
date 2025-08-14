import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '滑动输入条，用于在数值区间内进行选择。'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: '设置当前取值'
    },
    defaultValue: {
      control: { type: 'number' },
      description: '设置初始取值'
    },
    min: {
      control: { type: 'number' },
      description: '最小值'
    },
    max: {
      control: { type: 'number' },
      description: '最大值'
    },
    step: {
      control: { type: 'number' },
      description: '步长，取值必须大于 0，并且可被 (max - min) 整除'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '值为 true 时，滑块为禁用状态'
    },
    range: {
      control: { type: 'boolean' },
      description: '双滑块模式'
    },
    vertical: {
      control: { type: 'boolean' },
      description: '值为 true 时，Slider 为垂直方向'
    },
    included: {
      control: { type: 'boolean' },
      description: 'marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列'
    },
    tooltip: {
      control: { type: 'select' },
      options: ['always', 'never', 'hover'],
      description: '设置 Tooltip 展示规则'
    },
    marks: {
      control: { type: 'object' },
      description: '刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内'
    },
    dots: {
      control: { type: 'boolean' },
      description: '是否只能拖拽到刻度上'
    },
    reverse: {
      control: { type: 'boolean' },
      description: '反向坐标轴'
    },
    onChange: {
      action: 'changed',
      description: '当 Slider 的值发生改变时，会触发 onChange 事件'
    },
    onAfterChange: {
      action: 'afterChanged',
      description: '与 onmouseup 触发时机一致，把当前值作为参数传入'
    },
    onChangeComplete: {
      action: 'changeComplete',
      description: '拖拽结束后触发'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Slider>;

// 基础用法
export const Default: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100
  }
};

// 带步长
export const WithStep: Story = {
  args: {
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 10
  }
};

// 禁用状态
export const Disabled: Story = {
  args: {
    defaultValue: 30,
    disabled: true
  }
};

// 范围选择
export const Range: Story = {
  args: {
    range: true,
    defaultValue: [20, 50],
    min: 0,
    max: 100
  }
};

// 垂直方向
export const Vertical: Story = {
  args: {
    vertical: true,
    defaultValue: 30,
    style: { height: 200 }
  },
  parameters: {
    layout: 'centered'
  }
};

// 垂直范围选择
export const VerticalRange: Story = {
  args: {
    vertical: true,
    range: true,
    defaultValue: [20, 50],
    style: { height: 200 }
  },
  parameters: {
    layout: 'centered'
  }
};

// 带刻度标记
export const WithMarks: Story = {
  args: {
    defaultValue: 37,
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

// 带刻度点
export const WithDots: Story = {
  args: {
    defaultValue: 30,
    dots: true,
    step: 10,
    marks: {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      60: '60',
      70: '70',
      80: '80',
      90: '90',
      100: '100'
    }
  }
};

// 工具提示
export const WithTooltip: Story = {
  args: {
    defaultValue: 30,
    tooltip: 'always'
  }
};

// 反向坐标轴
export const Reverse: Story = {
  args: {
    defaultValue: 30,
    reverse: true
  }
};

// 受控模式
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(30);
    
    return (
      <div style={{ width: 300 }}>
        <Slider
          {...args}
          value={value}
          onChange={(val) => setValue(val as number)}
        />
        <p>当前值: {value}</p>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100
  }
};

// 受控范围模式
export const ControlledRange: Story = {
  render: (args) => {
    const [value, setValue] = useState<[number, number]>([20, 50]);
    
    return (
      <div style={{ width: 300 }}>
        <Slider
          {...args}
          range
          value={value}
          onChange={(val) => setValue(val as [number, number])}
        />
        <p>当前值: [{value[0]}, {value[1]}]</p>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100
  }
};

// 自定义格式化
export const CustomFormatter: Story = {
  args: {
    defaultValue: 30,
    tooltip: 'always',
    tipFormatter: (value: number) => `${value}%`
  }
};

// 不同尺寸组合
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ width: 400, padding: 20 }}>
      <h4>默认尺寸</h4>
      <Slider defaultValue={30} style={{ marginBottom: 20 }} />
      
      <h4>自定义轨道高度</h4>
      <Slider 
        defaultValue={50} 
        style={{ 
          marginBottom: 20,
          '--slider-rail-height': '8px',
          '--slider-track-height': '8px'
        } as React.CSSProperties} 
      />
      
      <h4>大号手柄</h4>
      <Slider 
        defaultValue={70} 
        style={{
          '--slider-handle-size': '20px'
        } as React.CSSProperties}
      />
    </div>
  )
};

// 复杂示例
export const ComplexExample: Story = {
  render: () => {
    const [temperatureRange, setTemperatureRange] = useState<[number, number]>([16, 26]);
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(80);
    
    return (
      <div style={{ width: 400, padding: 20 }}>
        <h4>温度控制 ({temperatureRange[0]}°C - {temperatureRange[1]}°C)</h4>
        <Slider
          range
          value={temperatureRange}
          min={0}
          max={40}
          marks={{
            0: '0°C',
            10: '10°C',
            20: '20°C',
            30: '30°C',
            40: '40°C'
          }}
          onChange={(val) => setTemperatureRange(val as [number, number])}
          style={{ marginBottom: 30 }}
        />
        
        <h4>音量 ({volume}%)</h4>
        <Slider
          value={volume}
          min={0}
          max={100}
          step={5}
          tooltip="always"
          tipFormatter={(value) => `${value}%`}
          onChange={(val) => setVolume(val as number)}
          style={{ marginBottom: 30 }}
        />
        
        <h4>亮度 ({brightness}%)</h4>
        <Slider
          value={brightness}
          min={0}
          max={100}
          dots
          step={20}
          marks={{
            0: '🌑',
            20: '🌘',
            40: '🌗',
            60: '🌖',
            80: '🌕',
            100: '☀️'
          }}
          onChange={(val) => setBrightness(val as number)}
        />
      </div>
    );
  }
};

// 垂直布局示例
export const VerticalLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 300, gap: 40, padding: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4>音量</h4>
        <Slider
          vertical
          defaultValue={60}
          style={{ height: 200 }}
          tooltip="always"
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4>均衡器</h4>
        <Slider
          vertical
          range
          defaultValue={[20, 80]}
          style={{ height: 200 }}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4>温度</h4>
        <Slider
          vertical
          defaultValue={25}
          min={0}
          max={50}
          marks={{
            0: '0°',
            25: '25°',
            50: '50°'
          }}
          style={{ height: 200 }}
        />
      </div>
    </div>
  )
};

// 动态演示
export const DynamicDemo: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    const [disabled, setDisabled] = useState(false);
    const [reverse, setReverse] = useState(false);
    const [vertical, setVertical] = useState(false);
    
    return (
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            禁用
          </label>
          <label style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={reverse}
              onChange={(e) => setReverse(e.target.checked)}
            />
            反向
          </label>
          <label>
            <input
              type="checkbox"
              checked={vertical}
              onChange={(e) => setVertical(e.target.checked)}
            />
            垂直
          </label>
        </div>
        
        <div style={{ 
          width: vertical ? 'auto' : 300, 
          height: vertical ? 200 : 'auto',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Slider
            value={value}
            disabled={disabled}
            reverse={reverse}
            vertical={vertical}
            onChange={(val) => setValue(val as number)}
            style={vertical ? { height: 200 } : { width: 300 }}
          />
        </div>
        
        <p style={{ marginTop: 20 }}>当前值: {value}</p>
      </div>
    );
  }
};