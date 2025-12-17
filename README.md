# React Furry Error

**Languages**
- 🇺🇸 English (current)
- 🇨🇳 [简体中文](./README_zh.md)
- 🇯🇵 [日本語](./README_jp.md)
A cute and helpful error overlay for React development with furry-themed emotes!

## What Am I

`react-furry-error` is a lightweight and user-friendly error handling library designed specifically for React applications. It intercepts various runtime errors in React projects and displays a visually appealing, "furry-themed" error overlay, making error detection and debugging more intuitive for developers.

## Core Features

- **Comprehensive Error Catching**: Detects runtime JavaScript errors, React render errors, hook misuse, Promise/fetch failures, hydration mismatches, and HMR runtime crashes.

- **Easy Integration**: Requires only a simple import and function call to enable the error overlay, with minimal configuration.
Environment Control: Allows developers to toggle the overlay's activation status (e.g., enable only in development) to avoid affecting production users.

- **Intuitive Display**: Presents error details in a clear, readable format on a cute overlay, simplifying the debugging process.

### Limitation

It cannot intercept compile-time syntax errors (e.g., invalid JSX), as such errors prevent the app from starting and the overlay from mounting.


## Installation

```bash
npm install react-furry-error --save-dev
```

## Usage

### Basic Usage

```typescript
import { initFurryDevOverlay } from 'react-furry-error';

initFurryDevOverlay();
```

## Error Types Supported

- **Hook Error**: React Hook related errors
- **DOM Error**: React DOM/Node related errors
- **Promise Error**: Network/Promise related errors
- **Runtime Error**: General JavaScript runtime errors
- **Hydration Error**: SSR hydration mismatch errors
- **HMR Error**: Hot Module Replacement errors

## API

### `initFurryDevOverlay()`

Initializes the error overlay with the provided configuration.


### `TestError`

A simple component to test if it works well.

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
## License

MIT

## Get More

[react-furry-error](https://masaominn.github.io/react-furry-error/introduction "react-furry-error")