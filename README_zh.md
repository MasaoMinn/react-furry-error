# React Furry Error

**语言**
- 🇨🇳 简体中文（当前）
- 🇺🇸 [English](./README.md)
- 🇯🇵 [日本語](./README_jp.md)

一个可爱且实用的React开发错误覆盖层，带有毛茸茸主题的表情！

## 什么是React Furry Error

`react-furry-error`是一个专门为React应用程序设计的轻量级、用户友好的错误处理库。它拦截React项目中的各种运行时错误，并显示一个视觉吸引力强的"毛茸茸主题"错误覆盖层，使开发人员更容易检测和调试错误。

## 核心功能

- **全面的错误捕获**：检测运行时JavaScript错误、React渲染错误、钩子误用、Promise/fetch失败、水合不匹配以及HMR运行时崩溃。

- **易于集成**：只需简单的导入和函数调用即可启用错误覆盖层，配置最少。

- **环境控制**：允许开发人员切换覆盖层的激活状态（例如，仅在开发环境中启用），以避免影响生产用户。

- **直观的显示**：在可爱的覆盖层上以清晰可读的格式呈现错误详细信息，简化调试过程。

### 限制

它无法拦截编译时语法错误（例如，无效的JSX），因为此类错误会阻止应用程序启动和覆盖层挂载。

## 安装

```bash
npm install react-furry-error --save-dev
```

## 使用

### 基本用法

```typescript
import { initFurryDevOverlay } from 'react-furry-error';

if (process.env.NODE_ENV === "development") {
  initFurryDevOverlay();
}
```

### Next.js（App Router）

请在客户端组件（`"use client"`）中调用，例如放到 `useEffect` 里：

```tsx
"use client";

import { useEffect } from "react";
import { initFurryDevOverlay } from "react-furry-error";

export function DevOverlayBootstrap() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      initFurryDevOverlay();
    }
  }, []);

  return null;
}
```

### 关于 `--save-dev`

`react-furry-error` 仅用于开发环境，推荐使用 `--save-dev` 安装。

如果你的构建环境会跳过 `devDependencies`（例如 `npm ci --omit=dev`），请不要在该构建流程中导入本包，或确保构建阶段会安装 `devDependencies`。

## 支持的错误类型

- **Hook错误**：React Hook相关错误
- **DOM错误**：React DOM/Node相关错误
- **Promise错误**：网络/Promise相关错误
- **运行时错误**：一般JavaScript运行时错误
- **水合错误**：SSR水合不匹配错误
- **HMR错误**：热模块替换错误

## API

### `initFurryDevOverlay()`

使用提供的配置初始化错误覆盖层。

### `ErrorTest`

一个简单的组件，用于测试是否正常工作。

```javascript
import { initFurryDevOverlay, ErrorTest } from "react-furry-error";

if (import.meta.env.MODE === "development") {
  initFurryDevOverlay();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorTest />
  </StrictMode>
)
```

## 许可证

MIT

## 获取更多信息

[react-furry-error](https://masaominn.github.io/react-furry-error/introduction "react-furry-error")
