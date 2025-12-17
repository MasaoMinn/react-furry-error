# React Furry Error

**言語**
- 🇯🇵 日本語（現在）
- 🇺🇸 [English](./README.md)
- 🇨🇳 [简体中文](./README_zh.md)

ファーリーテーマのエモートでReact開発用の可愛くて便利なエラーオーバーレイ！

## これは何ですか

`react-furry-error`はReactアプリケーション専用に設計された軽量で使いやすいエラー処理ライブラリです。Reactプロジェクトのさまざまなランタイムエラーをインターセプトし、視覚的に魅力的な「ファーリーテーマ」のエラーオーバーレイを表示し、開発者のエラー検出とデバッグをより直感的にします。

## 主な機能

- **包括的なエラーキャッチ**：ランタイムJavaScriptエラー、Reactレンダーエラー、フックの誤用、Promise/fetchの失敗、ハイドレーションの不一致、HMRランタイムクラッシュを検出します。

- **簡単な統合**：エラーオーバーレイを有効にするには、単純なインポートと関数呼び出しだけが必要で、最小限の設定で済みます。

- **環境制御**：開発者はオーバーレイのアクティブ化状態を切り替えることができ（例：開発時のみ有効化）、本番ユーザーに影響を与えないようにすることができます。

- **直感的な表示**：可愛いオーバーレイにエラーの詳細を明確で読みやすい形式で表示し、デバッグプロセスを簡素化します。

### 制限

コンパイル時の構文エラー（例：無効なJSX）をインターセプトすることはできません。このようなエラーはアプリケーションの起動を妨げ、オーバーレイのマウントも妨げるためです。

## インストール

```bash
npm install react-furry-error --save-dev
```

## 使用方法

### 基本的な使用方法

```typescript
import { initFurryDevOverlay } from 'react-furry-error';

initFurryDevOverlay();
```

## サポートされているエラータイプ

- **Hookエラー**：React Hook関連のエラー
- **DOMエラー**：React DOM/Node関連のエラー
- **Promiseエラー**：ネットワーク/Promise関連のエラー
- **ランタイムエラー**：一般的なJavaScriptランタイムエラー
- **ハイドレーションエラー**：SSRハイドレーションの不一致エラー
- **HMRエラー**：ホットモジュールリプレースメントエラー

## API

### `initFurryDevOverlay()`

提供された設定でエラーオーバーレイを初期化します。

### `ErrorTest`

正常に動作するかどうかをテストするためのシンプルなコンポーネント。

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

## ライセンス

MIT

## 詳細情報

[react-furry-error](https://masaominn.github.io/react-furry-error/introduction "react-furry-error")