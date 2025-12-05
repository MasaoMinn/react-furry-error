# React Furry Error

A cute and helpful error overlay for React development with furry-themed emotes!

## Features

- 🎭 Furry-themed error emotes for different error types
- 🌍 Multi-language support (Chinese, English, Japanese)
- 🎥 Video and image modes
- 🔧 Configurable error handling
- 📦 Easy to integrate with any React project

## Installation

```bash
npm install react-furry-error
```

## Usage

### Basic Usage

```typescript
import { initFurryDevOverlay } from 'react-furry-error';

// Initialize with default configuration
initFurryDevOverlay();
```

### With Custom Configuration

```typescript
import { initFurryDevOverlay } from 'react-furry-error';

// Initialize with custom configuration
initFurryDevOverlay({
  enabled: true,          // Enable/disable the overlay
  language: 'en',         // Language: 'zh', 'en', or 'ja'
  type: 'image'           // Media type: 'image' or 'video'
});
```

## Error Types Supported

- **Hook Error**: React Hook related errors
- **DOM Error**: React DOM/Node related errors
- **Promise Error**: Network/Promise related errors
- **Runtime Error**: General JavaScript runtime errors
- **Hydration Error**: SSR hydration mismatch errors
- **HMR Error**: Hot Module Replacement errors

## API

### `initFurryDevOverlay(config?: Partial<FurryDevOverlayConfig>)`

Initializes the error overlay with the provided configuration.

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable or disable the error overlay |
| `language` | `'zh' \| 'en' \| 'ja'` | `'zh'` | Display language |
| `type` | `'image' \| 'video'` | `'video'` | Media type for emotes |

### `showOverlay(message: DevOverlayMessage)`

Manually shows the error overlay with a custom message.

### `removeExistingOverlay()`

Manually removes the error overlay.

## License

MIT