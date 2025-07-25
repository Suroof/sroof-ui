import type { Meta, StoryObj } from "@storybook/react";
import { Menu, MenuItem, SubMenu } from "./Menu";
import React from "react";

// 图标组件
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1l7 6v8H1V7l7-6zm0 2.5L3 8v6h10V8L8 3.5z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 002.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 001.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 00-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 00-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 00-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 001.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 003.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 002.692-1.115l.094-.319z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" />
    <path d="M5 3h6v1H5V3zm0 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z" />
  </svg>
);

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
    <path d="M5.255 5.786a.237.237 0 00.241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
  </svg>
);

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "一个功能丰富的菜单组件，支持水平、垂直和内联模式，以及多种主题样式。",
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["horizontal", "vertical", "inline"],
      description: "菜单显示模式",
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "glass"],
      description: "菜单主题",
    },
    defaultSelectedKey: {
      control: { type: "text" },
      description: "默认选中的菜单项",
    },
    onSelect: {
      action: "selected",
      description: "菜单项选中时的回调函数",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

// 默认故事
export const Default: Story = {
  args: {
    mode: "horizontal",
    theme: "light",
    defaultSelectedKey: "1",
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
        首页
      </MenuItem>
      <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
        用户管理
      </MenuItem>
      <SubMenu key="sub1" itemKey="sub1" title="设置" icon={<SettingsIcon />}>
        <MenuItem key="3" itemKey="3">
          基本设置
        </MenuItem>
        <MenuItem key="4" itemKey="4">
          高级设置
        </MenuItem>
        <MenuItem key="5" itemKey="5">
          安全设置
        </MenuItem>
      </SubMenu>
      <MenuItem key="6" itemKey="6" icon={<DocumentIcon />}>
        文档
      </MenuItem>
      <MenuItem key="7" itemKey="7" icon={<HelpIcon />}>
        帮助
      </MenuItem>
    </Menu>
  ),
};

// 垂直模式
export const Vertical: Story = {
  args: {
    mode: "vertical",
    theme: "light",
    defaultSelectedKey: "2",
  },
  render: (args) => (
    <div style={{ height: "400px", display: "flex" }}>
      <Menu {...args}>
        <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
          首页
        </MenuItem>
        <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
          用户管理
        </MenuItem>
        <SubMenu key="sub1" itemKey="sub1" title="设置" icon={<SettingsIcon />}>
          <MenuItem key="3" itemKey="3">
            基本设置
          </MenuItem>
          <MenuItem key="4" itemKey="4">
            高级设置
          </MenuItem>
          <MenuItem key="5" itemKey="5">
            安全设置
          </MenuItem>
        </SubMenu>
        <MenuItem key="6" itemKey="6" icon={<DocumentIcon />}>
          文档
        </MenuItem>
        <MenuItem key="7" itemKey="7" icon={<HelpIcon />}>
          帮助
        </MenuItem>
      </Menu>
    </div>
  ),
};

// 暗色主题
export const DarkTheme: Story = {
  args: {
    mode: "horizontal",
    theme: "dark",
    defaultSelectedKey: "3",
  },
  render: (args) => (
    <div style={{ background: "#1f1f1f", padding: "20px" }}>
      <Menu {...args}>
        <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
          首页
        </MenuItem>
        <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
          用户管理
        </MenuItem>
        <SubMenu key="sub1" itemKey="sub1" title="设置" icon={<SettingsIcon />}>
          <MenuItem key="3" itemKey="3">
            基本设置
          </MenuItem>
          <MenuItem key="4" itemKey="4">
            高级设置
          </MenuItem>
          <MenuItem key="5" itemKey="5">
            安全设置
          </MenuItem>
        </SubMenu>
        <MenuItem key="6" itemKey="6" icon={<DocumentIcon />}>
          文档
        </MenuItem>
        <MenuItem key="7" itemKey="7" icon={<HelpIcon />}>
          帮助
        </MenuItem>
      </Menu>
    </div>
  ),
};

// 玻璃主题
export const GlassTheme: Story = {
  args: {
    mode: "horizontal",
    theme: "glass",
    defaultSelectedKey: "1",
  },
  render: (args) => (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        minHeight: "200px",
      }}
    >
      <Menu {...args}>
        <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
          首页
        </MenuItem>
        <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
          用户管理
        </MenuItem>
        <SubMenu key="sub1" itemKey="sub1" title="设置" icon={<SettingsIcon />}>
          <MenuItem key="3" itemKey="3">
            基本设置
          </MenuItem>
          <MenuItem key="4" itemKey="4">
            高级设置
          </MenuItem>
          <MenuItem key="5" itemKey="5">
            安全设置
          </MenuItem>
        </SubMenu>
        <MenuItem key="6" itemKey="6" icon={<DocumentIcon />}>
          文档
        </MenuItem>
        <MenuItem key="7" itemKey="7" icon={<HelpIcon />}>
          帮助
        </MenuItem>
      </Menu>
    </div>
  ),
};

// 带危险项的菜单
export const WithDangerItems: Story = {
  args: {
    mode: "vertical",
    theme: "light",
    defaultSelectedKey: "1",
  },
  render: (args) => (
    <div style={{ height: "300px", display: "flex" }}>
      <Menu {...args}>
        <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
          首页
        </MenuItem>
        <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
          用户管理
        </MenuItem>
        <MenuItem key="3" itemKey="3" icon={<SettingsIcon />}>
          设置
        </MenuItem>
        <MenuItem key="4" itemKey="4" icon={<DocumentIcon />} disabled>
          禁用项
        </MenuItem>
        <MenuItem key="5" itemKey="5" danger>
          删除数据
        </MenuItem>
      </Menu>
    </div>
  ),
};

// 受控菜单
export const ControlledMenu: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = React.useState("1");

    return (
      <div>
        <p>当前选中: {selectedKey}</p>
        <Menu
          mode="horizontal"
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
        >
          <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
            首页
          </MenuItem>
          <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
            用户管理
          </MenuItem>
          <SubMenu
            key="sub1"
            itemKey="sub1"
            title="设置"
            icon={<SettingsIcon />}
          >
            <MenuItem key="3" itemKey="3">
              基本设置
            </MenuItem>
            <MenuItem key="4" itemKey="4">
              高级设置
            </MenuItem>
          </SubMenu>
          <MenuItem key="5" itemKey="5" icon={<DocumentIcon />}>
            文档
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// 内联模式
export const InlineMode: Story = {
  args: {
    mode: "inline",
    theme: "light",
    defaultSelectedKey: "2",
  },
  render: (args) => (
    <div style={{ width: "300px", padding: "20px", background: "#f5f5f5" }}>
      <Menu {...args}>
        <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
          首页
        </MenuItem>
        <MenuItem key="2" itemKey="2" icon={<UserIcon />}>
          用户管理
        </MenuItem>
        <SubMenu key="sub1" itemKey="sub1" title="设置" icon={<SettingsIcon />}>
          <MenuItem key="3" itemKey="3">
            基本设置
          </MenuItem>
          <MenuItem key="4" itemKey="4">
            高级设置
          </MenuItem>
          <MenuItem key="5" itemKey="5">
            安全设置
          </MenuItem>
        </SubMenu>
        <MenuItem key="6" itemKey="6" icon={<DocumentIcon />}>
          文档
        </MenuItem>
        <MenuItem key="7" itemKey="7" icon={<HelpIcon />}>
          帮助
        </MenuItem>
      </Menu>
    </div>
  ),
};

// 复杂嵌套菜单
export const ComplexMenu: Story = {
  args: {
    mode: "vertical",
    theme: "light",
    defaultSelectedKey: "1",
  },
  render: (args) => (
    <div style={{ height: "500px", display: "flex" }}>
      <Menu {...args}>
        <MenuItem key="1" itemKey="1" icon={<HomeIcon />}>
          仪表板
        </MenuItem>
        <SubMenu key="sub1"  itemKey="1" title="用户管理" icon={<UserIcon />}>
          <MenuItem key="2" itemKey="1">用户列表</MenuItem>
          <MenuItem key="3" itemKey="1">角色管理</MenuItem>
          <MenuItem key="4" itemKey="1">权限设置</MenuItem>
        </SubMenu>
        <SubMenu key="sub2" itemKey="1" title="系统设置" icon={<SettingsIcon />}>
          <MenuItem key="5" itemKey="1">基本配置</MenuItem>
          <MenuItem key="6" itemKey="1">安全设置</MenuItem>
          <MenuItem key="7" itemKey="1">日志管理</MenuItem>
        </SubMenu>
        <MenuItem key="8" itemKey="1" icon={<DocumentIcon />}>
          文档中心
        </MenuItem>
        <MenuItem key="9" itemKey="1" icon={<HelpIcon />}>
          帮助支持
        </MenuItem>
        <MenuItem key="10" itemKey="1" danger>
          系统重置
        </MenuItem>
      </Menu>
    </div>
  ),
};
