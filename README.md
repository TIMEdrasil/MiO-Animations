# MIO I ANIMATIONS

[![npm version](https://img.shields.io/npm/v/mio-ui.svg?style=flat-square)](https://www.npmjs.com/package/MiO-Animations)
[![license](https://img.shields.io/npm/l/mio-ui.svg?style=flat-square)](https://github.com/TIMEdrasil/MiO-Animations/blob/main/LICENSE)
[![github stars](https://img.shields.io/github/stars/TIMEdrasil/MiO-Animations?style=flat-square)](https://github.com/TIMEdrasil/MiO-Animations/stargazers)

**English** | [中文](./README_zh.md)

 A lightweight and high-performance animation library for the modern web, designed to create beautiful constellation effects.
---

## 🌟 Features

- **Lightweight**: Core library is only 22 KB gzipped.
- **Fluent API**: Use an elegant, chainable API for complex animations.
- **TypeScript Ready**: Written in TypeScript with full type definitions.
- **Zero Dependencies**: No external libraries required.

## 🎨 Showcase

We provide an interactive showcase page, built with Vue.js, to demonstrate the `Constellation` animation effect.

**[➡️ Visit the Live Demo](https://github.com/TIMEdrasil/MiO-Animations/showcase/constellation/index.html)** To run the showcase locally:
1.  Clone this repository: `git clone https://github.com/TIMEdrasil/MiO-Animations.git`
2.  Install dependencies: `pnpm install`
3.  Open the `showcase/constellation/index.html` file in your browser.

## 📦 Installation

Install MIO-ANIMATIONS using your favorite package manager.

```bash
# With pnpm
pnpm add @timedrasil/mio-animations

# With npm
npm install @timedrasil/mio-animations
```

## 🚀 Quick Start

You can import and use the library in various ways.

### 1. ES Modules (Vite, Webpack)

```javascript
import { Constellation } from 'mio-animations';

// Initialize the animation on a container element
const myAnimation = new Constellation('.my-container');
```

### 2. UMD via `<script>` Tag (Browser)

```html
<script src="path/to/mio-animations.umd.js"></script>

<script>
  // The library will be available as a global variable, e.g., MioAnimations
  const myAnimation = new MioAnimations.Constellation('.my-container');
</script>
```

### 3. CommonJS (Node.js)

```javascript
const { Constellation } = require('mio-animations');

const myAnimation = new Constellation('.my-container');
```

## 🤝 Contributing

This project is currently not accepting external contributions. However, you are welcome to report bugs or suggest features by creating an [Issues](https://github.com/TIMEdrasil/MiO-UI/issues). Thank you for your interest!

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---