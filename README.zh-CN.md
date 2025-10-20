# MIO I ANIMATIONS (中文简介)

[![npm version](https://img.shields.io/npm/v/mio-ui.svg?style=flat-square)](https://www.npmjs.com/package/MiO-Animations)
[![license](https://img.shields.io/npm/l/mio-ui.svg?style=flat-square)](https://github.com/TIMEdrasil/MiO-Animations/blob/main/LICENSE)
[![github stars](https://img.shields.io/github/stars/TIMEdrasil/MiO-Animations?style=flat-square)](https://github.com/TIMEdrasil/MiO-Animations/stargazers)

[English](#mio-animations) | **中文**

一个轻量级、高性能的 Web 动画库

---

## 🌟 功能特性

- **轻量级**: 核心库 Gzip 压缩后仅 22KB。
- **链式调用**: 提供优雅的链式调用 API，轻松构建复杂动画。
- **TypeScript 支持**: 基于 TypeScript 开发，提供完整的类型定义。
- **无依赖**: 不依赖任何第三方库。

## 🎨 Showcase (示例展示)

我们提供了一个交互式的 `showcase` 页面来展示库的各种动画效果和用法。

**[➡️ 点击这里访问在线 Demo](https://github.com/TIMEdrasil/MiO-Animations/showcase/constellation/index.html)** 你也可以在本地运行它：
1.  克隆本仓库: `git clone https://github.com/TIMEdrasil/MiO-Animations.git`
2.  安装依赖: `pnpm install`
3.  在浏览器中打开 `showcase/constellation/index.html` 文件或启动一个本地服务器来查看。

## 📦 安装

你可以通过 npm 或 pnpm 来安装 MiO Animations。

```bash
# 使用 pnpm
pnpm add @timedrasil/mio-animations

# 使用 npm
npm install @timedrasil/mio-animations
```

## 🚀 快速上手

你可以通过多种方式引入和使用本库。

### 1. 通过 ES Module 引入 (Vite, Webpack)

```javascript
import { Constellation } from 'mio-animations';

// Initialize the animation on a container element
const myAnimation = new Constellation('.my-container');
```

### 2. 通过 `<script>` 标签直接引入 (浏览器)

你可以直接使用 `build` 文件夹下的 UMD 文件。

```html
<script src="path/to/mio-animations.umd.js"></script>

<script>
  // The library will be available as a global variable, e.g., MioAnimations
  const myAnimation = new MioAnimations.Constellation('.my-container');
</script>
```

### 3. 使用 CommonJS (Node.js 环境)

```javascript
const { Constellation } = require('mio-animations');

const myAnimation = new Constellation('.my-container');
```

## 🤝 如何贡献

本项目目前不接受外部贡献 (Pull Request)。但是，我们非常欢迎你通过提交 [Issues](https://github.com/TIMEdrasil/MiO-UI/issues) 来报告Bug或提出功能建议，感谢你的关注！

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。