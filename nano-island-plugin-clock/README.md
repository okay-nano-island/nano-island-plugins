# Nano Island 插件 - 时钟插件

时钟插件，显示当前时间，支持数字时钟、指针时钟等多种样式。

## 插件ID

`nano-island-plugin-clock`

## 功能特性

- ✅ 实时显示当前时间
- ✅ 数字时钟和指针时钟样式切换
- ✅ 24小时制/12小时制切换
- ✅ 灵动岛胶囊模式
- ✅ 展开模式详细显示
- ✅ 常驻卡片模式
- ✅ 可配置设置

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 类型检查
pnpm type-check
```

## 项目结构

```
.
├── manifest.json              # 插件清单
├── vite.config.ts            # Vite配置
├── tsconfig.json             # TypeScript配置
├── package.json              # 项目配置
├── src/
│   ├── main.ts               # 插件入口
│   ├── regular/
│   │   └── Regular.vue       # 胶囊模式（时间显示）
│   ├── expanded/
│   │   └── Expanded.vue     # 展开模式（数字+指针时钟）
│   ├── card/
│   │   └── Card.vue         # 常驻卡片
│   ├── settings/
│   │   └── Settings.vue     # 设置页面
│   └── menu/
│       └── MainMenu.vue      # 菜单
└── dist/                   # 构建产物
```

## 功能介绍

### 1. 胶囊模式

- 简洁的时间显示
- 点击触发展开
- 支持圆角胶囊样式

### 2. 展开模式

- 数字时钟显示（时:分:秒）
- 模拟指针时钟
- 显示日期和星期
- 深色渐变背景

### 3. 常驻卡片

- 在状态栏中常驻显示
- 实时更新时间
- 毛玻璃效果

### 4. 设置

- 切换显示格式（24小时/12小时）
- 切换时钟样式（数字/指针）
- 查看关于信息

## 配置说明

### manifest.json

```json
{
  "id": "nano-island-plugin-clock",
  "name": "时钟",
  "version": "1.0.0",
  "description": "显示当前时间的灵动岛插件",
  "author": "小莫唐尼",
  "icon": "🕐",
  "interfaces": {
    "regular": {
      "type": "vue",
      "entry": "regular.js",
      "defaultSize": { "width": 120, "height": 36 }
    },
    "expanded": {
      "type": "vue",
      "entry": "expanded.js",
      "defaultSize": { "width": 300, "height": 350 }
    },
    "card": {
      "type": "vue",
      "entry": "card.js",
      "gridSize": { "w": 2, "h": 1 }
    },
    "settings": {
      "type": "vue",
      "entry": "settings.js",
      "title": "时钟设置"
    },
    "menu": [
      {
        "id": "main",
        "label": "时钟",
        "icon": "🕐"
      }
    ]
  }
}
```

## 使用说明

1. **构建插件**

```bash
pnpm build
```

2. **在灵动岛主程序中加载**
   - 打开灵动岛主程序
   - 进入设置 → 开发者模式
   - 开启"允许加载本地插件"
   - 选择插件文件夹或输入路径

3. **使用时钟**
   - 在灵动岛中查看时间
   - 点击胶囊展开查看详细信息
   - 在设置中切换显示格式

## 技术栈

- **Vue 3** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS 4.0** - 样式方案
- **@nano-island/sdk** - 灵动岛 SDK
