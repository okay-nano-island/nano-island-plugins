# Nano Island 示例时钟插件

一个完整的 Nano Island 插件示例，展示所有组件类型、生命周期管理和 TailwindCSS 4.x 的使用。

## 功能特性

- 🕐 **实时时钟** - 显示当前时间和日期
- 🎨 **多种视图** - 紧凑视图、展开视图、常驻卡片、设置弹窗、菜单
- 🎯 **完整示例** - 展示插件开发的最佳实践
- 💅 **TailwindCSS 4.x** - 使用最新版本的 TailwindCSS
- 📦 **完整生命周期** - onMount、onEnable、onDisable、onUninstall

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动开发服务器（监听文件变化）
pnpm dev

# 构建生产版本
pnpm build

# 类型检查
pnpm type-check
```

## 项目结构

```
.
├── manifest.json              # 插件清单配置
├── vite.config.ts           # Vite 构建配置
├── tsconfig.json             # TypeScript 配置
├── package.json              # 项目配置
├── src/
│   ├── main.ts              # 插件入口文件
│   ├── env.d.ts            # 类型声明
│   ├── styles.css          # TailwindCSS 入口
│   └── components/
│       ├── Regular.ce.vue      # 紧凑视图（灵动岛显示）
│       ├── Expanded.ce.vue     # 展开视图
│       ├── Resident.ce.vue     # 常驻卡片（Dashboard）
│       ├── Settings.ce.vue     # 设置弹窗
│       └── Menu.ce.vue        # 菜单面板
└── dist/                   # 构建产物
```

## manifest.json 详解

```json
{
  "id": "nano-island-example",
  "name": "示例时钟插件",
  "version": "1.0.0",
  "interfaces": {
    "regular": { "entry": "regular" },
    "expanded": { "entry": "expanded", "width": 400, "height": 500 },
    "resident": { "entry": "resident", "colspan": 2 },
    "settings": { "entry": "settings", "title": "时钟设置" },
    "menu": [{ "id": "timezone", "label": "时区设置", "icon": "🌍", "entry": "menu" }]
  }
}
```

## 开发指南

### 1. 插件入口 (main.ts)

```typescript
import { defineIslandPlugin, type PluginContext } from '@nano-island/sdk'
import Regular from './components/Regular.ce.vue'
import Expanded from './components/Expanded.ce.vue'
import Resident from './components/Resident.ce.vue'
import Settings from './components/Settings.ce.vue'
import Menu from './components/Menu.ce.vue'

export default defineIslandPlugin((ctx: PluginContext) => {
  // 注册所有组件
  ctx.registerRegular({ component: Regular })
  ctx.registerExpanded({ component: Expanded })
  ctx.registerResident({ component: Resident, colspan: 2 })
  ctx.registerSettings({ component: Settings })
  ctx.registerMenu('timezone', { component: Menu, label: '时区设置' })

  // 生命周期钩子
  ctx.onMount(() => {
    console.log('[Plugin] 已挂载')
  })

  ctx.onEnable(async () => {
    console.log('[Plugin] 已启用')
    await ctx.ui.requestRegularShow({ priority: 5 })
  })

  ctx.onDisable(() => {
    console.log('[Plugin] 已禁用')
  })

  ctx.onUninstall(() => {
    console.log('[Plugin] 已卸载')
  })
})
```

### 2. 组件类型

#### Regular（紧凑视图）
灵动岛胶囊模式下显示的组件：

```vue
<template>
  <div class="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
    <div class="text-2xl font-bold">{{ time }}</div>
  </div>
</template>
```

#### Expanded（展开视图）
点击展开时显示的完整视图：

```vue
<template>
  <div class="w-full h-full flex flex-col bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
    <div class="text-6xl font-bold">{{ time }}</div>
    <div class="text-xl mt-2">{{ date }}</div>
  </div>
</template>
```

#### Resident（常驻卡片）
Dashboard 上的常驻卡片组件：

```vue
<template>
  <div class="w-full h-full flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
    <div class="text-2xl font-bold">{{ greeting }}</div>
    <div class="flex-1 flex items-center justify-center text-6xl">🕐</div>
  </div>
</template>
```

#### Settings（设置弹窗）
插件设置界面：

```vue
<template>
  <div class="w-full h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg">
    <div class="px-6 py-4 border-b">
      <h2>⚙️ 设置</h2>
    </div>
    <div class="flex-1 p-6">
      <!-- 设置选项 -->
    </div>
  </div>
</template>
```

#### Menu（菜单面板）
侧边栏或下拉菜单中的面板：

```vue
<template>
  <div class="w-full h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg">
    <div class="px-4 py-3 border-b">
      <h3>🕐 时钟设置</h3>
    </div>
    <div class="flex-1 overflow-y-auto">
      <!-- 时区列表 -->
    </div>
  </div>
</template>
```

### 3. 使用 TailwindCSS 4.x

TailwindCSS 4.x 使用 CSS-first 配置方式：

```vue
<template>
  <div class="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
    <div class="text-2xl font-bold">Hello</div>
  </div>
</template>
```

在 `src/styles.css` 中配置主题：

```css
@import "tailwindcss";

@theme {
  --color-primary-50: #f5f3ff;
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
}
```

### 4. UI 控制

```typescript
// 显示紧凑视图
await ctx.ui.requestRegularShow({
  strategy: 'immediate',  // 'immediate' | 'queue' | 'replace'
  priority: 5,
  duration: 3000,
})

// 显示展开视图
await ctx.ui.requestExpandedShow({
  width: 400,
  height: 500,
})

// 显示设置弹窗
await ctx.ui.showSettings()

// 隐藏视图
await ctx.ui.hideRegular()
await ctx.ui.hideExpanded()
await ctx.ui.hideSettings()
```

### 5. 数据存储

```typescript
// 存储数据
await ctx.data.setSelf('key', 'value')
await ctx.data.setSelf('config', { theme: 'dark' })

// 读取数据
const value = await ctx.data.getSelf('key')
const config = await ctx.data.getSelf('config')

// 监听数据变化
ctx.data.watch('config', (newVal, oldVal) => {
  console.log('配置变化:', oldVal, '->', newVal)
})
```

### 6. 事件通信

```typescript
// 发送事件
ctx.events.emit('refresh-data', { timestamp: Date.now() })

// 监听事件
ctx.events.on('refresh-data', (data) => {
  console.log('收到刷新请求', data)
})

// 广播到所有插件
await ctx.events.broadcast('plugin:ready', { pluginId: ctx.pluginId })
```

## 发布流程

### 1. 构建插件

```bash
pnpm build
```

### 2. 验证构建产物

```
dist/
├── main.js              # 主入口
├── regular.js           # 紧凑视图
├── expanded.js         # 展开视图
├── resident.js         # 常驻卡片
├── settings.js        # 设置弹窗
├── menu.js             # 菜单面板
└── assets/            # 样式资源
```

### 3. 在主程序中加载

1. 打开 Nano Island 主程序
2. 进入"插件管理"页面
3. 输入插件路径或选择插件文件夹
4. 点击"加载"
5. 启用插件

## 在宿主中加载插件

### 开发模式

```typescript
import { PluginManager } from './managers/PluginManager'

const pluginManager = PluginManager.getInstance()

// 设置插件基础路径
pluginManager.setPluginBasePath('/path/to/plugins')

// 加载插件
await pluginManager.loadPluginFromPath('nano-island-example', '/path/to/nano-island-example')

// 启用插件
await pluginManager.enablePlugin('nano-island-example')
```

### 生产模式

1. 将插件目录复制到宿主插件目录
2. 重启宿主应用
3. 在插件管理界面启用插件

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 样式不生效 | 检查 TailwindCSS 类名是否正确，确认 `src/styles.css` 已正确引入 |
| 组件不更新 | 使用响应式数据，避免直接修改 props |
| 类型错误 | 运行 `pnpm type-check` 检查类型 |
| 构建失败 | 确保所有依赖已安装，检查 `vite.config.ts` |
| 插件无法加载 | 检查 `manifest.json` 配置，确认所有入口文件存在 |

## 技术栈

- **Vue 3.5** - 渐进式 JavaScript 框架
- **TypeScript 5.7** - 类型安全的 JavaScript 超集
- **Vite 6.x** - 下一代前端构建工具
- **TailwindCSS 4.x** - 实用优先的 CSS 框架
- **@nano-island/sdk** - 灵动岛插件 SDK

## API 参考

更多 API 和详细文档请参考：

- [插件开发指南](../../docs/PLUGIN_GUIDE.md)
- [@nano-island/sdk API](https://nano-island.xiaoxiaomo.cn/docs-sdk)

## License

MIT